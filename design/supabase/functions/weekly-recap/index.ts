// Supabase Edge Function: weekly-recap
// Schedule with pg_cron (Sunday 20:00 Asia/Bangkok = 13:00 UTC):
//   select cron.schedule('stockly-recap', '0 13 * * 0', $$ select net.http_post(url := '<FUNCTION_URL>', headers := '{"Authorization":"Bearer <ANON_KEY>"}'::jsonb) $$);
// For every household: total spent this week, per-category totals, what rolls over → one `recap` notification (push follows via send-push).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const baht = (n: number) => "฿" + Math.round(n).toLocaleString("en-US");

function weekStart(d = new Date()) { const x = new Date(d); x.setUTCHours(0, 0, 0, 0); const dow = (x.getUTCDay() + 6) % 7; x.setUTCDate(x.getUTCDate() - dow); return x.toISOString().slice(0, 10); }

Deno.serve(async () => {
  const ws = weekStart();
  const { data: houses } = await db.from("households").select("id,name,budget_monthly");
  for (const h of houses ?? []) {
    const { data: items } = await db.from("list_items").select("name,price,qty_needed,qty_bought,category_id,categories(name)").eq("household_id", h.id).eq("week_start", ws);
    const bought = (items ?? []).filter((i) => i.qty_bought > 0);
    const left = (items ?? []).filter((i) => i.qty_bought < i.qty_needed);
    const total = bought.reduce((a, i) => a + (i.price ?? 0), 0);
    const weekBudget = Math.round((h.budget_monthly * 12) / 52);
    const byCat: Record<string, number> = {};
    for (const i of bought) { const k = (i as any).categories?.name ?? "Other"; byCat[k] = (byCat[k] ?? 0) + (i.price ?? 0); }
    const cats = Object.entries(byCat).map(([k, v]) => `${k} ${baht(v)}`).join(", ");
    const status = total > weekBudget ? `${baht(total - weekBudget)} over — no stress, it happens.` : `${baht(weekBudget - total)} under budget. Nice work, team.`;
    const text = `Weekly recap: ${bought.length} things bought, ${baht(total)} spent (${cats || "no prices yet"}). ${status} ${left.length} rolling over to next week.`;
    await db.from("notifications").insert({ household_id: h.id, actor_id: null, kind: "recap", text });
  }
  return new Response("ok");
});
