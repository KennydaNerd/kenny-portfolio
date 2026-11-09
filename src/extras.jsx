import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github } from 'lucide-react'

/* ---------- ACHIEVEMENT TOASTS ---------- */
const seen = new Set(); let push = null
export const toast = t => { if (!push || seen.has(t)) return; seen.add(t); push(t) }
export function Toasts() {
  const [list, setList] = useState([])
  useEffect(() => { push = t => { const id = Math.random(); setList(l => [...l, { id, t }]); setTimeout(() => setList(l => l.filter(x => x.id !== id)), 3200) }; return () => { push = null } }, [])
  return <div className="fixed top-16 right-4 z-[60] space-y-2" aria-live="polite"><AnimatePresence>{list.map(x =>
    <motion.div key={x.id} initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }} className="glass !bg-black/70 px-4 py-2 text-sm font-mono">
      <span className="text-rose">Achievement unlocked</span><br />{x.t}</motion.div>)}</AnimatePresence></div>
}

/* ---------- BOOT INTRO ---------- */
const LINES = ['> initialising kenny.portfolio', '> loading cosmos ........ ok', '> mounting badge ......... ok', '> compiling skills ....... ok', '> status: available for hire']
export function Boot({ done }) {
  const [n, setN] = useState(0)
  useEffect(() => { const t = setTimeout(n >= LINES.length ? done : () => setN(n + 1), n >= LINES.length ? 500 : 380); return () => clearTimeout(t) }, [n])
  return <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-obsidian grid place-items-center p-6 font-mono text-sm text-rose">
    <div className="w-full max-w-md space-y-1">{LINES.slice(0, n).map(l => <p key={l}>{l}</p>)}<span className="animate-pulse">█</span></div>
    <button onClick={done} className="absolute bottom-8 right-6 text-xs text-rose-100/60 hover:text-rose underline">Skip</button></motion.div>
}

/* ---------- NEBULA + SHOOTING STARS ---------- */
export function Stars() {
  return <div className="stars fixed inset-0 -z-[5] pointer-events-none overflow-hidden" aria-hidden>
    <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle,#800020,transparent 70%)' }} />
    <div className="absolute -bottom-40 -right-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(circle,#8b5cf6,transparent 70%)' }} />
    {[0, 1, 2].map(i => <span key={i} className="shoot" style={{ top: `${10 + i * 22}%`, left: `${30 + i * 25}%`, animationDelay: `${i * 4.5}s` }} />)}</div>
}

/* ---------- CURSOR TRAIL ---------- */
export function Trail() {
  const c = useRef()
  useEffect(() => {
    if (!matchMedia('(hover:hover)').matches) return
    const cv = c.current, x = cv.getContext('2d'); let pts = [], raf
    const rs = () => { cv.width = innerWidth; cv.height = innerHeight }; rs(); addEventListener('resize', rs)
    const mm = e => pts.push({ x: e.clientX, y: e.clientY, l: 1 }); addEventListener('mousemove', mm)
    const loop = () => { x.clearRect(0, 0, cv.width, cv.height)
      if (document.body.classList.contains('lite')) pts = []
      else { pts = pts.filter(p => p.l > 0.03); pts.forEach(p => { p.l *= 0.92; x.beginPath(); x.fillStyle = `rgba(236,72,153,${p.l * 0.6})`; x.arc(p.x, p.y, 4 * p.l, 0, 7); x.fill() }) }
      raf = requestAnimationFrame(loop) }
    loop(); return () => { cancelAnimationFrame(raf); removeEventListener('resize', rs); removeEventListener('mousemove', mm) }
  }, [])
  return <canvas ref={c} className="fixed inset-0 z-[45] pointer-events-none" aria-hidden />
}

/* ---------- PHYSICS BADGE + HOLO FOIL (mouse + phone tilt) ---------- */
const Stat = ({ l, v }) => <div><p className="text-xs text-rose-100/50">{l}</p><p className="text-sm font-medium">{v}</p></div>
const Barcode = () => <div className="flex items-end gap-[2px] h-8" aria-hidden>{Array.from({ length: 38 }, (_, i) => <span key={i} className="bg-rose-100/90 h-full" style={{ width: 1 + ((i * 7 + 3) % 4) }} />)}</div>
export function Badge({ loc }) {
  const [on, setOn] = useState(false), [img, setImg] = useState(true), root = useRef(), card = useRef()
  const s = useRef({ a: 0, w: 0, drag: false, x0: 0, a0: 0, moved: false })
  const holo = (x, y) => { card.current?.style.setProperty('--hx', `${x}%`); card.current?.style.setProperty('--hy', `${y}%`) }
  useEffect(() => { let raf; const k = s.current, lite = () => document.body.classList.contains('lite')
    const loop = () => { if (!k.drag) { k.w += -0.008 * k.a + (lite() ? 0 : Math.sin(Date.now() / 1800) * 0.002); k.w *= 0.985; k.a += k.w }
      k.a = Math.max(-60, Math.min(60, k.a)); if (root.current) root.current.style.transform = `rotate(${k.a}deg)`; raf = requestAnimationFrame(loop) }
    const tilt = e => { if (e.gamma != null) holo(50 + e.gamma * 1.2, 50 + (e.beta - 45) * 1.2) }
    addEventListener('deviceorientation', tilt); loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('deviceorientation', tilt) } }, [])
  const flip = () => { setOn(o => !o); toast('Badge flipped') }
  const k = s.current
  const down = e => { try { window.DeviceOrientationEvent?.requestPermission?.() } catch {} k.drag = true; k.x0 = e.clientX; k.a0 = k.a; k.moved = false; e.currentTarget.setPointerCapture?.(e.pointerId) }
  const move = e => { const r = card.current?.getBoundingClientRect(); if (r && e.pointerType === 'mouse') holo(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100)
    if (!k.drag) return; const dx = e.clientX - k.x0; if (Math.abs(dx) > 6) k.moved = true; const na = Math.max(-60, Math.min(60, k.a0 + dx * 0.25)); k.w = na - k.a; k.a = na }
  const up = cancel => () => { k.drag = false; if (!cancel && !k.moved) flip(); else if (k.moved) toast('Swung the badge') }
  return (
    <div className="flex flex-col items-center">
      <div ref={root} style={{ transformOrigin: 'top center', touchAction: 'pan-y' }} className="flex flex-col items-center select-none cursor-grab active:cursor-grabbing"
        onPointerDown={down} onPointerMove={move} onPointerUp={up(false)} onPointerCancel={up(true)}>
        <div className="w-5 h-28 bg-prism rounded-b-md shadow-[0_0_24px_#ec489988]" />
        <div className="w-10 h-3 -mt-1 rounded bg-gradient-to-b from-zinc-300 to-zinc-500" />
        <div ref={card} role="button" tabIndex={0} aria-label="Flip badge" onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && flip()} className="flip w-72 h-[28rem] -mt-1 text-left">
          <div className={`flip-inner relative w-full h-full ${on ? 'on' : ''}`}>
            <div className="face prism-border absolute inset-0 rounded-3xl p-5 flex flex-col shadow-[0_0_60px_-10px_#ec4899]">
              <div className="mx-auto w-14 h-2 rounded-full bg-black/60 mb-4" />
              <div className="flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-velvet to-obsidian grid place-items-center border border-rose/30">
                {img ? <img src="/portrait.png" alt="Portrait of Kgothatso Kenny Manyaka" draggable="false" className="w-full h-full object-cover" onError={() => setImg(false)} /> : <span className="text-6xl font-extrabold text-rose">KM</span>}
              </div>
              <h2 className="mt-4 font-extrabold tracking-wide leading-tight">KGOTHATSO KENNY MANYAKA</h2>
              <p className="text-xs text-rose tracking-widest mt-1">JUNIOR DEVELOPER & QA TESTER</p>
              <p className="mt-3 text-[11px] rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 w-fit">🟢 AVAILABLE FOR FULL-STACK & IT ROLES</p>
              <div className="mt-3"><Barcode /><p className="font-mono text-[10px] mt-1 text-rose-100/60">DEV-ZA-2026-WETHINKCODE</p></div>
              <div className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-color-dodge opacity-30" style={{ background: 'linear-gradient(115deg,transparent 20%,#ef4444aa,#ec4899aa,#8b5cf6aa,#3b82f6aa,transparent 80%)', backgroundSize: '220% 220%', backgroundPosition: 'var(--hx,50%) var(--hy,50%)' }} />
            </div>
            <div className="face back prism-border absolute inset-0 rounded-3xl p-6 flex flex-col gap-4 shadow-[0_0_60px_-10px_#8b5cf6]">
              <h3 className="font-bold text-rose">Character stats</h3>
              <Stat l="Primary stack" v="React · Python · FastAPI · Pytest" />
              <Stat l="Bootcamps" v="WeThinkCode_ · FNB App Academy · CAPACITI" />
              <Stat l="Certified" v="Google AI Essentials · Oracle OCI" />
              <Stat l="Location" v={loc} />
              <p className="mt-auto text-xs text-rose-100/50">Tap to flip back. Drag to swing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- LIVE GITHUB REPOS ---------- */
export function GhRepos() {
  const [r, setR] = useState([])
  useEffect(() => { fetch('https://api.github.com/users/KennydaNerd/repos?sort=updated&per_page=6').then(x => (x.ok ? x.json() : [])).then(d => Array.isArray(d) && setR(d.filter(x => !x.fork))).catch(() => {}) }, [])
  if (!r.length) return null
  return <section className="max-w-6xl mx-auto px-5 pb-16"><h3 className="text-xl font-bold mb-4">Latest on GitHub</h3>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">{r.map(x => <a key={x.id} href={x.html_url} target="_blank" rel="noreferrer" className="glass p-5 block">
      <p className="font-semibold flex items-center gap-2"><Github size={16} className="text-rose" />{x.name}</p>
      <p className="text-sm text-rose-100/70 mt-2">{x.description || 'No description yet'}</p><p className="font-mono text-xs text-rose mt-3">{x.language || 'Mixed'}</p></a>)}</div></section>
}
