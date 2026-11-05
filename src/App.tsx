import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import { baht, weekStart, isoDate, weekLabel } from './lib/money'

// Starter shell. The full UI spec is in design/README.md; the working prototype is design/Stockly App.dc.html.
// Port each screen from the prototype's template + logic class into components under src/screens/.
export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [left, setLeft] = useState<number | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])
  useEffect(() => {
    if (!session) return
    supabase.from('list_items').select('qty_needed,qty_bought').eq('week_start', isoDate(weekStart()))
      .then(({ data }) => setLeft((data ?? []).filter(i => i.qty_bought < i.qty_needed).length))
  }, [session])
  if (!session) return <SignIn />
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '16px 20px 130px', fontFamily: "Manrope,'Noto Sans Thai',sans-serif", color: '#26243D' }}>
      <div style={{ font: '700 11px Manrope', letterSpacing: '.12em', color: '#504E76' }}>WEEK OF {weekLabel(weekStart())}</div>
      <h1 style={{ font: '800 28px Figtree', letterSpacing: '-0.03em', margin: '2px 0 16px' }}>This week's list</h1>
      <div style={{ background: '#FFFDF6', borderRadius: 20, padding: 18, font: '500 14px Manrope' }}>
        {left === null ? 'Loading…' : left + ' things left to grab'} · {baht(0)} spent
      </div>
      <button onClick={() => supabase.auth.signOut()} style={{ marginTop: 16, border: 0, background: 'none', color: '#504E76', font: '700 14px Manrope' }}>Sign out</button>
    </main>
  )
}

function SignIn() {
  const [email, setEmail] = useState(''); const [pass, setPass] = useState(''); const [name, setName] = useState(''); const [mode, setMode] = useState<'in'|'up'>('in'); const [err, setErr] = useState('')
  const submit = async () => {
    setErr('')
    const r = mode === 'in' ? await supabase.auth.signInWithPassword({ email, password: pass }) : await supabase.auth.signUp({ email, password: pass, options: { data: { name } } })
    if (r.error) setErr(r.error.message)
  }
  const input: React.CSSProperties = { width: '100%', boxSizing: 'border-box', height: 48, borderRadius: 14, border: '1.5px solid #E9E0BF', background: '#FFFDF6', padding: '0 14px', font: '500 15px Manrope' }
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'Manrope,sans-serif', color: '#26243D' }}>
      <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ font: '800 34px Figtree', letterSpacing: '-0.04em' }}>stockly</div>
        {mode === 'up' && <input style={input} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />}
        <input style={input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={input} type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
        {err && <div style={{ color: '#C4471A', font: '500 13px Manrope' }}>{err}</div>}
        <button onClick={submit} style={{ height: 56, borderRadius: 999, border: 0, background: '#504E76', color: '#FFFDF6', font: '700 16px Manrope' }}>{mode === 'in' ? 'Sign in' : 'Create account'}</button>
        <button onClick={() => setMode(mode === 'in' ? 'up' : 'in')} style={{ border: 0, background: 'none', color: '#504E76', font: '700 14px Manrope' }}>{mode === 'in' ? 'Create an account' : 'I already have an account'}</button>
      </div>
    </main>
  )
}
