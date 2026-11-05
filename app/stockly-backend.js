// Stockly ↔ Supabase adapter. Loaded by index.html. Maps the app's in-memory data model to Supabase tables,
// diff-syncs every change, and reloads on realtime events from housemates. If config.js has no keys, the app
// stays in local demo mode and this file does nothing.
(function () {
  const B = { ready: false };
  window.StocklyBackend = B;
  let sb = null, me = null, hid = null, last = null, channel = null, channelHid = null;
  let catKeyToId = {}, catIdToKey = {}, bcKeyToId = {}, bcIdToKey = {}, queue = Promise.resolve(), pending = 0, saves = 0, dirty = false, reloadTimer = null;
  const listeners = [];
  const DAY = 864e5;
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isUuid = v => typeof v === 'string' && UUID.test(v);
  const uOrNull = v => (isUuid(v) ? v : null);
  const pad = n => String(n).padStart(2, '0');
  const toDate = ms => { const d = new Date(Number(ms)); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  const fromDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d).getTime(); };
  const msOf = t => (t ? new Date(t).getTime() : null);
  const iso = m => (m ? new Date(m).toISOString() : null);
  const clone = o => JSON.parse(JSON.stringify(o));
  const byId = a => { const m = {}; (a || []).forEach(x => (m[x.id] = x)); return m; };
  const changed = (a, b) => JSON.stringify(a) !== JSON.stringify(b);
  const chk = r => { if (r && r.error) throw r.error; return r; };
  const weekStart = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x.getTime(); };
  const kindOf = t => /\bbought\b/i.test(t) ? 'bought' : /recap/i.test(t) ? 'recap' : /invited/i.test(t) ? 'invite'
    : /menu|planned|off this week|edited/i.test(t) ? 'menu' : /rolled over|joined|renamed/i.test(t) ? 'system' : 'added';

  function cfg() { return window.STOCKLY_CONFIG || {}; }
  function client() {
    if (!sb) {
      const C = cfg();
      sb = window.supabase.createClient(C.supabaseUrl, C.supabaseAnonKey, { auth: { persistSession: true, autoRefreshToken: true } });
    }
    return sb;
  }
  B.waitReady = async () => { client(); B.ready = true; };

  // ---------- auth ----------
  B.getSession = async () => { const { data } = await client().auth.getSession(); return data.session ? data.session.user.id : null; };
  B.signIn = async (email, password) => {
    const r = await client().auth.signInWithPassword({ email, password });
    return { error: r.error, userId: r.data && r.data.session ? r.data.user.id : null };
  };
  B.signUp = async (email, password, name) => {
    const r = await client().auth.signUp({ email, password, options: { data: { name }, emailRedirectTo: location.href.split('#')[0] } });
    return { error: r.error, userId: r.data && r.data.session ? r.data.user.id : null };
  };
  B.signOut = async () => { teardown(); last = null; me = null; hid = null; await client().auth.signOut(); };

  // ---------- households ----------
  B.createHousehold = async (name, starterMenus) => {
    const r = chk(await client().rpc('create_household', { p_name: name }));
    const id = r.data;
    if (starterMenus && starterMenus.length) await seedMenus(id, starterMenus);
    return id;
  };
  B.acceptInvite = async householdId => chk(await client().rpc('accept_invite', { p_household: householdId }));
  B.declineInvite = async householdId => chk(await client().rpc('decline_invite', { p_household: householdId }));

  async function seedMenus(houseId, menus) {
    const s = client();
    const { data: cats } = await s.from('categories').select('id,key').eq('household_id', houseId);
    const map = {}; (cats || []).forEach(c => { if (c.key) map[c.key] = c.id; });
    const rows = [], ings = [];
    menus.forEach(m => {
      const id = crypto.randomUUID();
      rows.push({ id, household_id: houseId, name: m.name, name_th: m.nameTh || null, portions: m.portions, created_by: me ? me.id : null });
      m.ingredients.forEach((i, k) => ings.push({ menu_id: id, name: i.name, qty: i.qty, unit: i.unit, category_id: map[i.categoryId] || null, staple: !!i.staple, sort: k }));
    });
    chk(await s.from('menus').insert(rows));
    if (ings.length) chk(await s.from('menu_ingredients').insert(ings));
  }

  // ---------- load ----------
  async function fetchAll(uid) {
    const s = client();
    const { data: prof } = await s.from('profiles').select('*').eq('id', uid).maybeSingle();
    me = prof || { id: uid, name: 'You', email: '', tone: 'lavender' };
    const { data: mem } = await s.from('household_members').select('household_id').eq('user_id', uid).maybeSingle();
    hid = mem ? mem.household_id : null;
    const users = {};
    const addU = p => { if (p) users[p.id] = { id: p.id, name: p.name, email: (p.email || '').toLowerCase(), tone: p.tone, photo: p.avatar_url || null }; };
    addU(me);
    const households = [];
    const { data: inv } = await s.rpc('my_invites');
    (inv || []).forEach(r => {
      if (r.household_id === hid) return;
      const by = 'inv-' + r.household_id;
      users[by] = { id: by, name: r.invited_by_name || 'Someone', email: '', tone: 'apricot' };
      households.push({ id: r.household_id, name: r.household_name, budgetMonthly: 0, _stub: true, categories: [],
        members: Array.from({ length: Math.max(1, r.member_count || 1) }, (_, i) => 'stub-' + i),
        invites: [{ email: (me.email || '').toLowerCase(), by, at: Date.now(), status: 'pending' }] });
    });
    const data = { users: [], households, menus: [], items: [], stock: [], weekPlans: {}, notifs: [], expenses: [], hauls: [], _backend: true };
    if (hid) {
      const ws = weekStart(Date.now());
      await s.rpc('rollover_week', { p_household: hid, p_week: toDate(ws) });
      const now = new Date();
      const cutoff = Math.min(new Date(now.getFullYear(), now.getMonth(), 1).getTime() - 7 * DAY, ws - 14 * DAY);
      const ecut = Math.min(new Date(now.getFullYear(), now.getMonth() - 6, 1).getTime(), Date.now() - 100 * DAY); // 6 past months + current
      const [h, members, invites, cats, menus, plans, items, stock, notifs, reads, bcats, pcards, exps, hauls] = await Promise.all([
        s.from('households').select('*').eq('id', hid).single(),
        s.from('household_members').select('user_id, profiles(id,name,email,tone,avatar_url)').eq('household_id', hid),
        s.from('household_invites').select('*').eq('household_id', hid),
        s.from('categories').select('*').eq('household_id', hid).order('sort'),
        s.from('menus').select('*, menu_ingredients(*)').eq('household_id', hid).order('created_at', { ascending: false }),
        s.from('week_plans').select('*').eq('household_id', hid).gte('week_start', toDate(ws - 21 * DAY)),
        s.from('list_items').select('*').eq('household_id', hid).gte('week_start', toDate(cutoff)),
        s.from('stock_items').select('*').eq('household_id', hid).order('created_at', { ascending: false }).limit(200),
        s.from('notifications').select('*').eq('household_id', hid).order('created_at', { ascending: false }).limit(60),
        s.from('notification_reads').select('notification_id').eq('user_id', uid),
        s.from('budget_categories').select('*').eq('household_id', hid).order('sort'),
        s.from('payment_cards').select('*').eq('household_id', hid).order('created_at'),
        s.from('expenses').select('*').eq('household_id', hid).gte('spent_at', iso(ecut)),
        s.from('hauls').select('*').eq('household_id', hid).gte('at', iso(ecut))
      ]);
      [h, members, invites, cats, menus, plans, items, stock, notifs, reads, bcats, pcards, exps, hauls].forEach(chk);
      bcKeyToId = {}; bcIdToKey = {};
      const budgetCats = (bcats.data || []).map(c => { const pid = c.key || c.id; bcKeyToId[pid] = c.id; bcIdToKey[c.id] = pid; return { id: pid, name: c.name, icon: c.icon, tone: c.tone, period: c.period, budget: c.budget }; });
      const bcid = id => (id ? bcIdToKey[id] || id : null);
      catKeyToId = {}; catIdToKey = {};
      const categories = (cats.data || []).map(c => { const pid = c.key || c.id; catKeyToId[pid] = c.id; catIdToKey[c.id] = pid; return { id: pid, name: c.name, icon: c.icon, tone: c.tone, budgetCatId: bcid(c.budget_category_id) || (c.key === 'house' ? 'household' : 'groceries') }; });
      const cid = id => (id ? catIdToKey[id] || id : 'pantry');
      households.unshift({ id: hid, name: h.data.name, budgetMonthly: h.data.budget_monthly, categories, budgetCats,
        cards: (pcards.data || []).map(c => ({ id: c.id, name: c.name, dueDay: c.due_day, statementDay: c.statement_day, tone: c.tone })),
        members: (members.data || []).map(m => { addU(m.profiles); return m.user_id; }),
        invites: (invites.data || []).map(i => ({ email: i.email, by: i.invited_by, at: msOf(i.created_at), status: i.status })) });
      data.menus = (menus.data || []).map(m => ({ id: m.id, name: m.name, nameTh: m.name_th || '', portions: m.portions, photo: m.photo_path || null, createdBy: m.created_by, createdAt: msOf(m.created_at),
        ingredients: (m.menu_ingredients || []).sort((a, b) => a.sort - b.sort).map(i => ({ name: i.name, qty: i.qty == null ? null : Number(i.qty), unit: i.unit, categoryId: cid(i.category_id), staple: !!i.staple })) }));
      (plans.data || []).forEach(p => { const k = fromDate(p.week_start); (data.weekPlans[k] = data.weekPlans[k] || []).push({ menuId: p.menu_id, portions: p.portions }); });
      data.items = (items.data || []).map(i => ({ id: i.id, name: i.name, categoryId: cid(i.category_id), qtyNeeded: Number(i.qty_needed), qtyBought: Number(i.qty_bought), unit: i.unit,
        price: i.price, qtyHauled: Number(i.qty_hauled || 0), source: i.source, menuId: i.menu_id, addedBy: i.added_by, boughtBy: i.bought_by, boughtAt: msOf(i.bought_at), weekStart: fromDate(i.week_start), rolled: !!i.rolled_over, createdAt: msOf(i.created_at) }));
      data.stock = (stock.data || []).map(x => ({ id: x.id, name: x.name, categoryId: cid(x.category_id), qty: Number(x.qty), unit: x.unit, addedBy: x.added_by, listItemId: x.list_item_id, createdAt: msOf(x.created_at) }));
      data.expenses = (exps.data || []).map(e => ({ id: e.id, amount: Number(e.amount), budgetCatId: bcid(e.budget_category_id), method: e.method, cardId: e.card_id, place: e.place || '', note: e.note || '',
        by: e.spent_by, at: msOf(e.spent_at), haulId: e.haul_id, createdAt: msOf(e.created_at) }));
      data.hauls = (hauls.data || []).map(x => ({ id: x.id, place: x.place || '', method: x.method, cardId: x.card_id, by: x.by_user, at: msOf(x.at), lines: x.lines || [] }));
      const readSet = new Set((reads.data || []).map(r => r.notification_id));
      data.notifs = (notifs.data || []).map(n => ({ id: n.id, who: n.actor_id, text: n.text, at: msOf(n.created_at), kind: n.kind, read: readSet.has(n.id) || n.actor_id === uid }));
    }
    data.users = Object.values(users);
    return data;
  }
  B.load = async uid => { const d = await fetchAll(uid); last = clone(d); subscribe(); return d; };
  B.onRemoteChange = cb => listeners.push(cb);

  // ---------- realtime ----------
  function teardown() { if (channel) { try { client().removeChannel(channel); } catch (e) {} } channel = null; channelHid = null; }
  function subscribe() {
    if (!hid) { teardown(); return; }
    if (channel && channelHid === hid) return;
    teardown(); channelHid = hid;
    channel = client().channel('stockly-' + hid);
    ['list_items', 'stock_items', 'week_plans', 'menus', 'menu_ingredients', 'notifications', 'household_invites', 'households', 'household_members', 'categories', 'budget_categories', 'payment_cards', 'expenses', 'hauls']
      .forEach(t => channel.on('postgres_changes', { event: '*', schema: 'public', table: t }, () => scheduleReload()));
    channel.subscribe();
  }
  function scheduleReload() {
    if (pending > 0) { dirty = true; return; }
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(async () => {
      if (!me) return;
      const before = saves;
      try {
        const d = await fetchAll(me.id);
        if (saves !== before || pending > 0) { dirty = true; return; }
        last = clone(d); subscribe();
        listeners.forEach(f => f(d));
      } catch (e) { console.warn('[stockly] reload failed', e); }
    }, 500);
  }

  // ---------- save (diff → upserts/deletes) ----------
  B.save = next => {
    if (!last || !hid || !next || !next._backend) return;
    const prev = last; const snap = clone(next); last = snap; saves++; pending++;
    queue = queue.then(() => write(prev, snap)).catch(e => { console.error('[stockly] save failed', e); alert('Could not save that change: ' + (e.message || e)); dirty = true; })
      .finally(() => { pending--; if (pending === 0 && dirty) { dirty = false; scheduleReload(); } });
  };

  async function uploadPhoto(menuId, dataUrl) {
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const path = hid + '/' + menuId + '-' + Date.now() + '.jpg';
      const r = await client().storage.from('menu-photos').upload(path, blob, { contentType: 'image/jpeg', upsert: true });
      if (r.error) { console.warn('[stockly] photo upload failed', r.error); return undefined; }
      return client().storage.from('menu-photos').getPublicUrl(path).data.publicUrl;
    } catch (e) { console.warn(e); return undefined; }
  }

  async function write(prev, next) {
    const s = client(), H = hid;
    const catU = k => (k ? catKeyToId[k] || null : null);
    const ph = (prev.households || []).find(h => h.id === H), nh = (next.households || []).find(h => h.id === H);
    const dels = [];
    if (ph && nh) {
      if (nh.name !== ph.name || nh.budgetMonthly !== ph.budgetMonthly)
        chk(await s.from('households').update({ name: nh.name, budget_monthly: Math.round(Number(nh.budgetMonthly) || 0) }).eq('id', H));
      const bcU0 = k => (k ? bcKeyToId[k] || null : null);
      (nh.budgetCats || []).forEach(c => { if (!bcKeyToId[c.id] && isUuid(c.id)) { bcKeyToId[c.id] = c.id; bcIdToKey[c.id] = c.id; } });
      const pb = byId(ph.budgetCats), nb = byId(nh.budgetCats);
      const upB = (nh.budgetCats || []).map((c, k) => ({ c, k })).filter(({ c }) => (!pb[c.id] || changed(pb[c.id], c)) && bcKeyToId[c.id])
        .map(({ c, k }) => ({ id: bcKeyToId[c.id], household_id: H, name: c.name, icon: c.icon, tone: c.tone, period: c.period, budget: Math.round(Number(c.budget) || 0), sort: k + 1 }));
      if (upB.length) chk(await s.from('budget_categories').upsert(upB));
      const delB = (ph.budgetCats || []).filter(c => !nb[c.id]).map(c => bcKeyToId[c.id]).filter(Boolean);
      if (delB.length) dels.push(async () => { chk(await s.from('budget_categories').delete().in('id', delB)); });
      const pk = byId(ph.cards), nk = byId(nh.cards);
      const upK = (nh.cards || []).filter(c => isUuid(c.id) && (!pk[c.id] || changed(pk[c.id], c)))
        .map(c => ({ id: c.id, household_id: H, name: c.name, due_day: c.dueDay, statement_day: c.statementDay || c.dueDay, tone: c.tone || 'lavender' }));
      if (upK.length) chk(await s.from('payment_cards').upsert(upK));
      const delK = (ph.cards || []).filter(c => !nk[c.id] && isUuid(c.id)).map(c => c.id);
      if (delK.length) dels.push(async () => { chk(await s.from('payment_cards').delete().in('id', delK)); });
      nh.categories.forEach(c => { if (!catKeyToId[c.id] && isUuid(c.id)) { catKeyToId[c.id] = c.id; catIdToKey[c.id] = c.id; } });
      const pc = byId(ph.categories), nc = byId(nh.categories);
      const upC = nh.categories.filter(c => (!pc[c.id] || changed(pc[c.id], c)) && catKeyToId[c.id])
        .map(c => ({ id: catKeyToId[c.id], household_id: H, name: c.name, icon: c.icon, tone: c.tone, budget_category_id: bcU0(c.budgetCatId) }));
      if (upC.length) chk(await s.from('categories').upsert(upC));
      const delC = ph.categories.filter(c => !nc[c.id]).map(c => catKeyToId[c.id]).filter(Boolean);
      if (delC.length) dels.push(async () => { chk(await s.from('categories').delete().in('id', delC)); });
      const pi = {}, ni = {}; (ph.invites || []).forEach(i => (pi[i.email] = i)); (nh.invites || []).forEach(i => (ni[i.email] = i));
      const upI = (nh.invites || []).filter(i => !pi[i.email] || changed(pi[i.email], i))
        .map(i => ({ household_id: H, email: i.email, invited_by: uOrNull(i.by), status: i.status, created_at: iso(i.at) || new Date().toISOString() }));
      if (upI.length) chk(await s.from('household_invites').upsert(upI, { onConflict: 'household_id,email' }));
      const delI = (ph.invites || []).filter(i => !ni[i.email]).map(i => i.email);
      if (delI.length) dels.push(async () => { chk(await s.from('household_invites').delete().eq('household_id', H).in('email', delI)); });
    }
    // menus
    const pm = byId(prev.menus), nm = byId(next.menus);
    const head = x => ({ name: x.name, nameTh: x.nameTh, portions: x.portions, photo: x.photo, createdBy: x.createdBy });
    for (const m of next.menus || []) {
      if (!isUuid(m.id)) continue;
      const o = pm[m.id];
      if (!o || changed(head(o), head(m))) {
        const row = { id: m.id, household_id: H, name: m.name, name_th: m.nameTh || null, portions: m.portions, created_by: uOrNull(m.createdBy), updated_at: new Date().toISOString() };
        if (!m.photo) row.photo_path = null;
        else if (m.photo.startsWith('data:')) { if (!o || o.photo !== m.photo) { const url = await uploadPhoto(m.id, m.photo); if (url !== undefined) row.photo_path = url; } }
        else row.photo_path = m.photo;
        chk(await s.from('menus').upsert(row));
      }
      if (!o || changed(o.ingredients, m.ingredients)) {
        if (o) chk(await s.from('menu_ingredients').delete().eq('menu_id', m.id));
        const rows = (m.ingredients || []).map((i, k) => ({ menu_id: m.id, name: i.name, qty: i.qty == null || i.qty === '' ? null : Number(i.qty), unit: i.unit, category_id: catU(i.categoryId), staple: !!i.staple, sort: k }));
        if (rows.length) chk(await s.from('menu_ingredients').insert(rows));
      }
    }
    const delM = (prev.menus || []).filter(m => !nm[m.id] && isUuid(m.id)).map(m => m.id);
    // week plans
    const flat = wp => { const o = {}; Object.keys(wp || {}).forEach(k => (wp[k] || []).forEach(p => { o[k + '|' + p.menuId] = { week_start: toDate(k), menu_id: p.menuId, portions: p.portions }; })); return o; };
    const pp = flat(prev.weekPlans), np = flat(next.weekPlans);
    const upP = Object.keys(np).filter(k => (!pp[k] || pp[k].portions !== np[k].portions) && nm[np[k].menu_id]).map(k => Object.assign({ household_id: H, added_by: me.id }, np[k]));
    if (upP.length) chk(await s.from('week_plans').upsert(upP, { onConflict: 'household_id,week_start,menu_id' }));
    const delP = Object.keys(pp).filter(k => !np[k]).map(k => pp[k]);
    // items
    const pI = byId(prev.items), nI = byId(next.items);
    const itemRow = i => ({ id: i.id, household_id: H, week_start: toDate(i.weekStart), name: i.name, category_id: catU(i.categoryId), qty_needed: Number(i.qtyNeeded), qty_bought: Number(i.qtyBought) || 0,
      unit: i.unit, qty_hauled: Number(i.qtyHauled) || 0, price: i.price == null || i.price === '' ? null : Math.round(Number(i.price)), source: i.source || 'manual', menu_id: i.menuId && nm[i.menuId] ? i.menuId : null,
      added_by: uOrNull(i.addedBy), bought_by: uOrNull(i.boughtBy), bought_at: iso(i.boughtAt), rolled_over: !!i.rolled, created_at: iso(i.createdAt) || new Date().toISOString() });
    const upIt = (next.items || []).filter(i => isUuid(i.id) && (!pI[i.id] || changed(pI[i.id], i))).map(itemRow);
    if (upIt.length) chk(await s.from('list_items').upsert(upIt));
    const delIt = (prev.items || []).filter(i => !nI[i.id] && isUuid(i.id)).map(i => i.id);
    // stock
    const pS = byId(prev.stock), nS = byId(next.stock);
    const upS = (next.stock || []).filter(x => isUuid(x.id) && (!pS[x.id] || changed(pS[x.id], x))).map(x => ({ id: x.id, household_id: H, name: x.name, category_id: catU(x.categoryId), qty: Number(x.qty) || 1, unit: x.unit,
      added_by: uOrNull(x.addedBy), list_item_id: x.listItemId && nI[x.listItemId] ? x.listItemId : null, created_at: iso(x.createdAt) || new Date().toISOString() }));
    if (upS.length) chk(await s.from('stock_items').upsert(upS));
    const delS = (prev.stock || []).filter(x => !nS[x.id] && isUuid(x.id)).map(x => x.id);
    // hauls + expenses
    const bcU = k => (k ? bcKeyToId[k] || (isUuid(k) ? k : null) : null);
    const pH = byId(prev.hauls), nH = byId(next.hauls);
    const upH = (next.hauls || []).filter(x => isUuid(x.id) && (!pH[x.id] || changed(pH[x.id], x))).map(x => ({ id: x.id, household_id: H, place: x.place || null, method: x.method,
      card_id: uOrNull(x.cardId), by_user: uOrNull(x.by), at: iso(x.at) || new Date().toISOString(), lines: x.lines || [] }));
    if (upH.length) chk(await s.from('hauls').upsert(upH));
    const pE = byId(prev.expenses), nE = byId(next.expenses);
    const upE = (next.expenses || []).filter(e => isUuid(e.id) && (!pE[e.id] || changed(pE[e.id], e))).map(e => ({ id: e.id, household_id: H, amount: Math.round(Number(e.amount) || 0),
      budget_category_id: bcU(e.budgetCatId), method: e.method, card_id: uOrNull(e.cardId), place: e.place || null, note: e.note || null, haul_id: uOrNull(e.haulId),
      spent_by: uOrNull(e.by), spent_at: iso(e.at) || new Date().toISOString(), created_at: iso(e.createdAt) || new Date().toISOString() }));
    if (upE.length) chk(await s.from('expenses').upsert(upE));
    const delE = (prev.expenses || []).filter(e => !nE[e.id] && isUuid(e.id)).map(e => e.id);
    const delH = (prev.hauls || []).filter(x => !nH[x.id] && isUuid(x.id)).map(x => x.id);
    // notifications + reads
    const pN = byId(prev.notifs);
    const newN = (next.notifs || []).filter(n => !pN[n.id] && isUuid(n.id)).reverse()
      .map(n => ({ id: n.id, household_id: H, actor_id: uOrNull(n.who), kind: n.kind || kindOf(n.text), text: n.text, created_at: iso(n.at) || new Date().toISOString() }));
    if (newN.length) chk(await s.from('notifications').insert(newN));
    const readNow = (next.notifs || []).filter(n => n.read && pN[n.id] && !pN[n.id].read && isUuid(n.id)).map(n => ({ notification_id: n.id, user_id: me.id }));
    if (readNow.length) chk(await s.from('notification_reads').upsert(readNow, { onConflict: 'notification_id,user_id', ignoreDuplicates: true }));
    // deletes, children first
    if (delE.length) chk(await s.from('expenses').delete().in('id', delE));
    if (delH.length) chk(await s.from('hauls').delete().in('id', delH));
    if (delS.length) chk(await s.from('stock_items').delete().in('id', delS));
    if (delIt.length) chk(await s.from('list_items').delete().in('id', delIt));
    for (const p of delP) chk(await s.from('week_plans').delete().eq('household_id', H).eq('week_start', p.week_start).eq('menu_id', p.menu_id));
    if (delM.length) chk(await s.from('menus').delete().in('id', delM));
    for (const f of dels) await f();
  }

  // ---------- push ----------
  const b64 = s => { const p = '='.repeat((4 - (s.length % 4)) % 4); const r = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from([...r].map(c => c.charCodeAt(0))); };
  B.subscribePush = async prefs => {
    const C = cfg();
    if (!C.vapidPublicKey || !('serviceWorker' in navigator) || !me) return false;
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(C.vapidPublicKey) });
    const j = sub.toJSON();
    chk(await client().from('push_subscriptions').upsert({ user_id: me.id, endpoint: sub.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth,
      notify_added: !!prefs.added, notify_bought: !!prefs.bought, notify_recap: !!prefs.recap, notify_due: prefs.due !== false }, { onConflict: 'endpoint' }));
    return true;
  };
  B.updatePushPrefs = async prefs => {
    if (!('serviceWorker' in navigator) || !me) return;
    const reg = await navigator.serviceWorker.ready; const sub = await reg.pushManager.getSubscription();
    if (sub) await client().from('push_subscriptions').update({ notify_added: !!prefs.added, notify_bought: !!prefs.bought, notify_recap: !!prefs.recap, notify_due: prefs.due !== false }).eq('endpoint', sub.endpoint);
  };
  B.setAvatar = async dataUrl => {
    if (!me) return null;
    const blob = await (await fetch(dataUrl)).blob();
    const path = 'avatars/' + me.id + '-' + Date.now() + '.jpg';
    const r = await client().storage.from('menu-photos').upload(path, blob, { contentType: 'image/jpeg', upsert: true });
    if (r.error) throw r.error;
    const url = client().storage.from('menu-photos').getPublicUrl(path).data.publicUrl;
    chk(await client().from('profiles').update({ avatar_url: url }).eq('id', me.id));
    me.avatar_url = url;
    if (last) { const u = (last.users || []).find(x => x.id === me.id); if (u) u.photo = url; }
    return url;
  };
  B.hasServerPush = () => !!cfg().vapidPublicKey;
})();
