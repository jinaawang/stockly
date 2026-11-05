import { supabase } from './supabase'
// Call after the user taps "Turn on notifications" (Household tab). iOS: only works when installed to Home Screen (16.4+).
export async function enablePush(prefs = { added: true, bought: true, recap: true }) {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return 'unsupported'
  const perm = await Notification.requestPermission()
  if (perm !== 'granted') return perm
  const reg = await navigator.serviceWorker.ready
  const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY })
  const j = sub.toJSON()
  const { data: { user } } = await supabase.auth.getUser()
  await supabase.from('push_subscriptions').upsert({ user_id: user!.id, endpoint: sub.endpoint, p256dh: j.keys!.p256dh, auth: j.keys!.auth, notify_added: prefs.added, notify_bought: prefs.bought, notify_recap: prefs.recap }, { onConflict: 'endpoint' })
  return 'granted'
}
