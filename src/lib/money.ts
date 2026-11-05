export const baht = (n: number | null | undefined) => '฿' + Math.round(n ?? 0).toLocaleString('en-US')
export const weekStart = (d = new Date()) => { const x = new Date(d); x.setHours(0,0,0,0); const dow = (x.getDay()+6)%7; x.setDate(x.getDate()-dow); return x }
export const isoDate = (d: Date) => d.toISOString().slice(0,10)
export const weekLabel = (d: Date) => d.toLocaleDateString('en-US',{month:'short',day:'numeric'}).toUpperCase()
export const weeklyBudget = (monthly: number) => Math.round(monthly*12/52)
