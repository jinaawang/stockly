// Supabase Edge Function: send-push
// Triggered by a database webhook on INSERT into public.notifications.
// Sends a Web Push to every subscribed device in the household except the actor's own.
// Secrets: VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT (mailto:), SUPABASE_SERVICE_ROLE_KEY.
// The app's sw.js already handles the `push` event and shows the banner.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "https://esm.sh/web-push@3.6.7";

webpush.setVapidDetails(Deno.env.get("VAPID_SUBJECT")!, Deno.env.get("VAPID_PUBLIC_KEY")!, Deno.env.get("VAPID_PRIVATE_KEY")!);
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

Deno.serve(async (req) => {
  const { record } = await req.json();             // the inserted notifications row
  const prefCol = { added: "notify_added", bought: "notify_bought", recap: "notify_recap" }[record.kind as string] ?? "notify_added";

  const { data: members } = await db.from("household_members").select("user_id").eq("household_id", record.household_id);
  const userIds = (members ?? []).map((m) => m.user_id).filter((id) => id !== record.actor_id);
  if (!userIds.length) return new Response("no recipients");

  const { data: subs } = await db.from("push_subscriptions").select("*").in("user_id", userIds).eq(prefCol, true);
  const payload = JSON.stringify({ title: "Stockly", body: record.text, tag: record.kind });

  await Promise.all((subs ?? []).map(async (s) => {
    try { await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload); }
    catch (e) { if ((e as any).statusCode === 410) await db.from("push_subscriptions").delete().eq("id", s.id); }
  }));
  return new Response("ok");
});
