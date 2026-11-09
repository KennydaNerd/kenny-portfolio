import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Mail, Phone, Github, Linkedin, Download, X, ExternalLink, Code2, MapPin, Send, Eye, Award } from 'lucide-react'
import { Boot, Badge, Toasts, Stars, GhRepos, toast } from './extras.jsx'

/* ---------- DATA ---------- */
const ME = { name: 'Kgothatso Kenny Manyaka', email: 'manyakakgothatso7@gmail.com', phone: '+27 66 055 3889',
  gh: 'https://github.com/KennydaNerd', li: 'https://linkedin.com/in/kgothatso-manyaka-00036627b', loc: 'Pretoria / Johannesburg, South Africa' }
const ABOUT = [
  'I build web applications and I test them, because working software means proving that it works. As a Junior Software Developer and QA tester, I work in React, JavaScript and Python, with FastAPI, SQLite and Pytest behind the projects on this site.',
  'I completed Full Stack Developer training through FNB App Academy / IT Varsity (NQF Level 5), alongside WeThinkCode_ and CAPACITI programmes, Google AI Essentials and Oracle Cloud Infrastructure Foundations. I have applied that training to real projects: a full-stack salon platform with JWT authentication and an automated Pytest suite, a support ticket tracker and an interactive IT troubleshooter.',
  'Before moving into technology, I worked in administration and legal administration. It trained me in clear communication, precision, organisation and taking responsibility for detail. Those habits now show up in how I write code, document it and report issues.',
  'I am looking for a junior role in software development, QA or IT support where I can contribute from day one and keep learning from experienced engineers.',
]
const ROLES = ['Full-Stack Developer', 'QA & Test Engineer', 'Creative Web Designer', 'Problem Solver', 'WeThinkCode_ Alumni']
const SKILLS = {
  Frontend: [['React.js', 90], ['JavaScript ES6+', 85], ['Tailwind CSS', 88], ['HTML5 / CSS3', 92], ['Vite', 80]],
  'Backend & Database': [['Python', 85], ['FastAPI', 82], ['REST APIs', 85], ['Pydantic', 78], ['SQL / SQLite', 76]],
  'QA & Testing': [['Pytest', 84], ['FastAPI TestClient', 80], ['Manual API Testing', 86], ['Browser DevTools', 88], ['Swagger UI', 82]],
  'Cloud & DevOps': [['Git / GitHub', 88], ['Vercel', 85], ['Render', 78], ['JWT / PBKDF2', 76], ['LocalStorage API', 85]],
}
const PROJECTS = [
  { t: 'Full-Stack Salon & Hair Retail Platform', d: 'Booking and retail platform with JWT auth, a FastAPI backend and a React storefront.', s: ['React', 'FastAPI', 'Pytest', 'JWT', 'SQLite', 'Vercel', 'Render'], note: 'Automated API test suite: 9 Pytest cases', case: ['JWT login with PBKDF2-hashed passwords', 'FastAPI REST endpoints backed by SQLite', '9 Pytest cases run through FastAPI TestClient', 'React frontend on Vercel, API on Render'], live: 'https://frontend-inky-three-34.vercel.app', src: 'https://github.com/KennydaNerd/hair-by-neo' },
  { t: 'Support Ticket Tracker', d: 'Create, filter and close support tickets. Data persists in the browser.', s: ['React', 'Vite', 'LocalStorage', 'Vercel'], live: 'https://support-ticket-tracker-vert.vercel.app', src: 'https://github.com/KennydaNerd/support-ticket-tracker' },
  { t: 'Interactive IT Troubleshooter', d: 'A decision tree that walks users through common IT faults to a fix.', s: ['Vanilla JS', 'DOM'], live: 'https://it-troubleshooter.vercel.app', src: ME.gh },
]
const TIMELINE = [
  ['Oracle OCI Foundations', '2023', 'Cloud fundamentals certification'],
  ['Google AI Essentials', '2024', 'Certification'],
  ['WeThinkCode_', 'Bootcamp', 'Software Engineer programme'],
  ['FNB App Academy', 'Academy', 'Full Stack Academy'],
  ['CAPACITI', 'Accelerator', 'AI Skills Accelerator'],
  ['Future Interns', 'Offer', 'Full Stack Web Development Intern'],
]
const CERTS = [
  { n: 'Google AI Essentials', by: 'Google', y: '2024', url: '' },
  { n: 'OCI Foundations', by: 'Oracle Cloud Infrastructure', y: '2023', url: '' },
  { n: 'Software Engineer Bootcamp', by: 'WeThinkCode_', y: '', url: '' },
  { n: 'Full Stack Academy', by: 'FNB App Academy', y: '', url: '' },
  { n: 'AI Skills Accelerator', by: 'CAPACITI', y: '', url: '' },
]
const RESUMES = {
  'Software Developer': { file: '/resumes/Kenny-Manyaka-Software-Developer.pdf', pts: ['React, JavaScript, Tailwind, Vite', 'Python, FastAPI, REST, SQLite', 'Full-stack salon platform with JWT auth', 'WeThinkCode_, FNB App Academy, CAPACITI'] },
  'IT Support & QA': { file: '/resumes/Kenny-Manyaka-IT-Support-QA.pdf', pts: ['Pytest and FastAPI TestClient automation', 'Manual API testing, Swagger UI, DevTools', 'Interactive IT troubleshooter tool', 'Google AI Essentials, Oracle OCI Foundations'] },
}

/* ---------- THREE.JS COSMOS ---------- */
function Cosmos() {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 100); cam.position.z = 6
    const r = new THREE.WebGLRenderer({ alpha: true, antialias: true }); r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.setSize(innerWidth, innerHeight); el.appendChild(r.domElement)
    const N = matchMedia('(max-width: 768px)').matches ? 900 : 2500, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), pal = ['#ec4899', '#ef4444', '#800020', '#8b5cf6', '#ffffff'].map(c => new THREE.Color(c))
    for (let i = 0; i < N; i++) { const rad = Math.random() * 14, a = rad * 0.9 + Math.random() * 0.6, y = (Math.random() - .5) * 6
      pos.set([Math.cos(a) * rad, y * (1 - rad / 18), Math.sin(a) * rad - 4], i * 3); const c = pal[Math.floor(Math.random() * pal.length)]; col.set([c.r, c.g, c.b], i * 3) }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: .85, depthWrite: false })); scene.add(pts)
    const shape = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 1), new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true, transparent: true, opacity: .18 })); shape.position.set(4, 1.5, -2); scene.add(shape)
    let mx = 0, my = 0, raf; const mm = e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5 }; addEventListener('mousemove', mm)
    const rs = () => { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); r.setSize(innerWidth, innerHeight) }; addEventListener('resize', rs)
    const loop = () => { if (!reduce && !document.body.classList.contains('lite')) { pts.rotation.y += 0.0005; shape.rotation.x += 0.003; shape.rotation.y += 0.004 }
      cam.position.x += (mx * 1.2 - cam.position.x) * 0.04; cam.position.y += (-my * 0.8 - cam.position.y) * 0.04; cam.position.z += (6 - Math.min(scrollY / Math.max(document.body.scrollHeight - innerHeight, 1), 1) * 4 - cam.position.z) * 0.05; cam.lookAt(0, 0, 0); r.render(scene, cam); raf = requestAnimationFrame(loop) }
    loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', mm); removeEventListener('resize', rs); r.dispose(); g.dispose(); el.removeChild(r.domElement) }
  }, [])
  return <div ref={ref} className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at 30% 20%,#2a0614,#090206 70%)' }} aria-hidden />
}

/* ---------- TYPIST ---------- */
function Typist() {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false)
  useEffect(() => {
    const w = ROLES[i]; const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1); else if (!del) setDel(true); else if (n > 0) setN(n - 1); else { setDel(false); setI((i + 1) % ROLES.length) }
    }, !del && n === w.length ? 1400 : del ? 35 : 75); return () => clearTimeout(t)
  }, [n, del, i])
  return <p className="text-xl md:text-2xl text-rose-100/80 h-9" aria-label={`I am a ${ROLES[i]}`}>I am a <span className="text-rose font-semibold">[ {ROLES[i].slice(0, n)}<span className="animate-pulse">|</span> ]</span></p>
}

/* ---------- CLI ---------- */
function CLI({ open, setOpen }) {
  const [log, setLog] = useState([{ c: 'info', t: "Type 'help' to list commands." }]), [v, setV] = useState(''), end = useRef(), inp = useRef(), hist = useRef([]), idx = useRef(0)
  useEffect(() => { end.current?.scrollIntoView(); if (open) inp.current?.focus() }, [log, open])
  const run = cmd => { if (cmd.trim()) { hist.current.push(cmd); idx.current = hist.current.length }
    const k = cmd.trim().toLowerCase(), skills = Object.entries(SKILLS).map(([g, a]) => `${g}: ${a.map(s => s[0]).join(', ')}`)
    const out = {
      help: ['help, whoami, skills, projects, resumes, contact, hire, clear'],
      whoami: [ME.name, 'Junior Software Developer, QA Tester and IT Support', 'React, JavaScript, Python, FastAPI, Pytest', 'FNB App Academy / IT Varsity (NQF 5), Google AI Essentials, Oracle OCI', 'Background in administration and legal administration: communication, precision, ownership.', 'Open to junior dev, QA and IT support roles.', ME.loc],
      skills, projects: PROJECTS.map(p => `${p.t} [${p.s.join(', ')}]`),
      resumes: Object.entries(RESUMES).map(([n, r]) => `${n}: ${r.file}`),
      contact: [ME.email, ME.phone, ME.gh, ME.li],
      matrix: ['Wake up, recruiter...', 'Follow the white rabbit: github.com/KennydaNerd'], 'sudo hire kenny': ['Permission granted.', 'Drafting offer letter... just kidding. Email me.'], ls: ['projects/  skills/  resumes/  secrets.txt'], 'cat secrets.txt': ['I debug with console.log and I am not sorry.'],
      hire: ['Available for full-stack and IT roles.', `Email ${ME.email} or use the form below.`],
    }[k]
    if (k === 'clear') return setLog([])
    if (['matrix', 'sudo hire kenny', 'ls', 'cat secrets.txt'].includes(k)) toast('Found a secret command')
    if (k === 'hire') setTimeout(() => { setOpen(false); document.getElementById('contact')?.scrollIntoView() }, 900)
    setLog(l => [...l, { c: 'cmd', t: `$ ${cmd}` }, ...(out ? out.map(t => ({ c: 'out', t })) : k ? [{ c: 'err', t: `command not found: ${k}. Try 'help'.` }] : [])])
  }
  const CMDS = ['help', 'whoami', 'skills', 'projects', 'resumes', 'contact', 'hire', 'clear', 'ls', 'matrix']
  const kd = e => { if (e.key === 'ArrowUp') { e.preventDefault(); idx.current = Math.max(0, idx.current - 1); setV(hist.current[idx.current] || '') } else if (e.key === 'ArrowDown') { e.preventDefault(); idx.current = Math.min(hist.current.length, idx.current + 1); setV(hist.current[idx.current] || '') } else if (e.key === 'Tab') { e.preventDefault(); const m = CMDS.filter(c => c.startsWith(v.toLowerCase())); if (m.length === 1) setV(m[0]) } }
  return <AnimatePresence>{open && (
    <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} role="dialog" aria-label="CLI shell"
      className="fixed bottom-24 right-4 left-4 md:left-auto md:w-[34rem] z-50 glass !bg-black/80 font-mono text-sm overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 border-b border-rose/20"><span className="text-rose">kenny@portfolio ~</span><button onClick={() => setOpen(false)} aria-label="Close terminal"><X size={16} /></button></div>
      <div className="h-64 overflow-y-auto p-4 space-y-1" onClick={() => inp.current?.focus()}>
        {log.map((l, i) => <p key={i} className={{ cmd: 'text-rose', err: 'text-crimson', info: 'text-zinc-400', out: 'text-rose-50' }[l.c]}>{l.t}</p>)}
        <form onSubmit={e => { e.preventDefault(); run(v); setV('') }} className="flex gap-2"><span className="text-rose">$</span>
          <input ref={inp} value={v} onKeyDown={kd} onChange={e => setV(e.target.value)} className="flex-1 bg-transparent outline-none" aria-label="Command" autoComplete="off" spellCheck="false" /></form>
        <div ref={end} />
      </div>
    </motion.div>)}</AnimatePresence>
}

/* ---------- SECTIONS ---------- */
const Section = ({ id, title, children }) => <section id={id} className="max-w-6xl mx-auto px-5 py-16 md:py-24"><h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center md:text-left">{title}</h2>{children}</section>

function About() {
  return <Section id="about" title="About me">
    <div className="glass p-6 md:p-10 space-y-5 text-rose-100/80 leading-relaxed max-w-3xl mx-auto md:mx-0">{ABOUT.map(p => <p key={p}>{p}</p>)}</div>
  </Section>
}

function Skills() {
  const [tab, setTab] = useState(Object.keys(SKILLS)[0])
  return <Section id="skills" title="Skills">
    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6" role="tablist">{Object.keys(SKILLS).map(k => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
      className={`px-4 py-2 rounded-full text-sm border transition ${tab === k ? 'bg-rose text-black border-rose font-semibold' : 'border-rose/30 hover:bg-rose/10'}`}>{k}</button>)}</div>
    <div className="glass p-8 flex flex-wrap justify-center md:justify-start gap-3">{SKILLS[tab].map(([n]) => <span key={n} className="px-4 py-2 rounded-full border border-rose/30 bg-rose/10 text-sm shadow-[0_0_14px_-6px_#ec4899]">{n}</span>)}</div>
  </Section>
}

function Projects() {
  const [sel, setSel] = useState(null)
  return <Section id="projects" title="Projects">
    <div className="grid md:grid-cols-3 gap-6">{PROJECTS.map(p => <article key={p.t} className="glass p-6 flex flex-col gap-4 transition">
      <Code2 className="text-rose" /><h3 className="text-lg font-bold">{p.t}</h3><p className="text-sm text-rose-100/70">{p.d}</p>
      {p.note && <p className="text-xs rounded-xl bg-emerald-500/10 border border-emerald-400/30 p-2">{p.note}</p>}
      <div className="flex flex-wrap gap-1.5">{p.s.map(s => <span key={s} className="text-xs font-mono px-2 py-1 rounded-md bg-rose/10 text-rose">{s}</span>)}</div>
      <div className="mt-auto flex gap-3 text-sm pt-2">
        <button onClick={() => setSel(p)} className="flex items-center gap-1 hover:text-rose"><Eye size={16} />Inspect</button>
        <a href={p.src} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-rose"><Github size={16} />Source</a>
        {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-rose"><ExternalLink size={16} />Live</a>}</div></article>)}</div>
    <AnimatePresence>{sel && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-5" onClick={() => setSel(null)}>
      <div className="glass !bg-obsidian p-8 max-w-lg w-full" onClick={e => e.stopPropagation()} role="dialog" aria-label={sel.t}>
        <div className="flex justify-between mb-4"><h3 className="text-xl font-bold">{sel.t}</h3><button onClick={() => setSel(null)} aria-label="Close"><X /></button></div>
        <p className="text-rose-100/80 mb-4">{sel.d}</p><p className="font-mono text-sm text-rose">{sel.s.join(' / ')}</p>{sel.note && <p className="mt-3 text-sm">{sel.note}</p>}{sel.case && <ul className="mt-4 space-y-1 text-sm text-rose-100/80">{sel.case.map(c => <li key={c}>• {c}</li>)}</ul>}</div></motion.div>}</AnimatePresence>
  </Section>
}

function Resumes() {
  const [tab, setTab] = useState('Software Developer'), [modal, setModal] = useState(false), r = RESUMES[tab]
  return <Section id="resumes" title="Resumes">
    <div className="glass p-8"><div className="flex gap-2 mb-6">{Object.keys(RESUMES).map(k => <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 rounded-full text-sm border ${tab === k ? 'bg-rose text-black border-rose font-semibold' : 'border-rose/30'}`}>{k}</button>)}</div>
      <ul className="space-y-2 mb-6 text-rose-100/80">{r.pts.map(p => <li key={p}>• {p}</li>)}</ul>
      <div className="flex gap-3"><button onClick={() => setModal(true)} className="px-5 py-2.5 rounded-full border border-rose/40 hover:bg-rose/10 flex items-center gap-2"><Eye size={16} />Quick view</button>
        <a href={r.file} download className="px-5 py-2.5 rounded-full bg-gradient-to-r from-velvet to-rose font-semibold flex items-center gap-2"><Download size={16} />Download PDF</a></div></div>
    {modal && <div className="fixed inset-0 z-50 bg-black/80 p-4 flex flex-col" onClick={() => setModal(false)}><button className="self-end mb-2" aria-label="Close"><X /></button>
      <iframe src={r.file} title={`${tab} resume`} className="flex-1 w-full rounded-2xl bg-white" onClick={e => e.stopPropagation()} /></div>}
  </Section>
}

function Certs() {
  return <Section id="certificates" title="Certificates">
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">{CERTS.map(c => <article key={c.n} className="glass p-6 flex flex-col gap-2">
      <Award className="text-rose" /><h3 className="font-bold">{c.n}</h3><p className="text-sm text-rose-100/70">{c.by}{c.y && ` · ${c.y}`}</p>
      {c.url && <a href={c.url} target="_blank" rel="noreferrer" className="mt-2 text-sm flex items-center gap-1 hover:text-rose"><ExternalLink size={16} />View credential</a>}</article>)}</div>
  </Section>
}

function Timeline() {
  return <Section id="journey" title="Career skill tree">
    <div className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose via-crimson to-velvet hidden md:block" />
      <ol className="space-y-8">{TIMELINE.map(([t, d, s], i) => <li key={t} className={`md:w-1/2 relative ${i % 2 ? 'md:ml-auto md:pl-10' : 'md:pr-10 md:text-right'}`}>
        <span className={`hidden md:block absolute top-6 w-10 h-0.5 bg-rose/50 ${i % 2 ? 'left-0' : 'right-0'}`} />
        <span className={`hidden md:block absolute top-[1.15rem] w-4 h-4 rounded-full bg-rose shadow-[0_0_16px_#ec4899] ${i % 2 ? '-left-2' : '-right-2'}`} />
        <div className="glass p-5"><p className="font-mono text-xs text-rose">Tier {i + 1} · {d}</p><p className="font-bold mt-1">{t}</p><p className="text-sm text-rose-100/70">{s}</p></div></li>)}</ol></div>
  </Section>
}

function Contact() {
  const [f, setF] = useState({ name: '', email: '', msg: '' }), [err, setErr] = useState({}), [sent, setSent] = useState(false)
  const submit = e => { e.preventDefault(); const x = {}
    if (f.name.trim().length < 2) x.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email address.'
    if (f.msg.trim().length < 10) x.msg = 'Write at least 10 characters.'
    setErr(x); if (Object.keys(x).length) return
    location.href = `mailto:${ME.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + f.name)}&body=${encodeURIComponent(f.msg + '\n\n' + f.name + ' (' + f.email + ')')}`; setSent(true) }
  const cls = 'w-full bg-white/5 border border-rose/20 rounded-2xl px-4 py-3 outline-none focus:border-rose'
  return <Section id="contact" title="Hire me">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <form onSubmit={submit} noValidate className="glass p-6 md:p-8 space-y-4 min-w-0">
        {[['name', 'Your name'], ['email', 'Your email']].map(([k, p]) => <div key={k}><input aria-label={p} placeholder={p} value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} className={cls} />{err[k] && <p className="text-crimson text-xs mt-1">{err[k]}</p>}</div>)}
        <div><textarea aria-label="Message" rows="4" placeholder="Tell me about the role" value={f.msg} onChange={e => setF({ ...f, msg: e.target.value })} className={cls} />{err.msg && <p className="text-crimson text-xs mt-1">{err.msg}</p>}</div>
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-velvet to-rose font-semibold flex items-center gap-2"><Send size={16} />Send message</button>
        {sent && <p className="text-sm text-emerald-300">Your email app should open with the message ready to send.</p>}</form>
      <div className="glass p-6 md:p-8 space-y-4 min-w-0">{[[Mail, ME.email, `mailto:${ME.email}`], [Phone, ME.phone, `tel:${ME.phone.replace(/\s/g, '')}`], [Github, 'github.com/KennydaNerd', ME.gh], [Linkedin, 'LinkedIn profile', ME.li]].map(([I, t, h]) =>
        <a key={t} href={h} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-2xl border border-rose/20 hover:bg-rose/10 transition"><I className="text-rose shrink-0" size={20} /><span className="min-w-0 break-all">{t}</span></a>)}
        <p className="flex items-center gap-2 text-sm text-rose-100/60 pt-2"><MapPin size={16} />{ME.loc}</p></div></div>
  </Section>
}

/* ---------- APP ---------- */
export default function App() {
  const [cli, setCli] = useState(false), [lite, setLite] = useState(() => matchMedia('(max-width: 768px), (pointer: coarse)').matches), [boot, setBoot] = useState(false)
  const finish = () => { try { sessionStorage.setItem('booted', '1') } catch {} setBoot(false) }
  useEffect(() => { document.body.classList.toggle('lite', lite) }, [lite])
  useEffect(() => { if (cli) toast('Terminal opened') }, [cli])
  useEffect(() => { const k = e => { if (e.ctrlKey && (e.key === '`' || e.key === '~')) { e.preventDefault(); setCli(o => !o) } else if (e.key === 'Escape') setCli(false) }; addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  return <>
    <AnimatePresence>{boot && <Boot done={finish} />}</AnimatePresence><Toasts /><Stars /><Cosmos />
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-obsidian/50 border-b border-rose/10"><nav className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between text-sm">
      <a href="#top" className="font-bold">KM</a><div className="hidden sm:flex gap-6">{['about', 'skills', 'projects', 'resumes', 'certificates', 'journey', 'contact'].map(s => <a key={s} href={`#${s}`} className="hover:text-rose capitalize">{s}</a>)}</div></nav></header>
    <main id="top">
      <section className="min-h-screen max-w-6xl mx-auto px-5 pt-20 grid md:grid-cols-2 items-center gap-10">
        <div className="order-2 md:order-1 space-y-5 text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">Hi, I'm <span className="bg-gradient-to-r from-crimson via-rose to-violet-400 bg-clip-text text-transparent">Kgothatso Kenny Manyaka</span></h1>
          <Typist />
          <p className="text-rose-100/70 max-w-md">Junior Software Developer (React & Python) and Junior IT Support / QA Tester based in Pretoria and Johannesburg.</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2"><a href="/resumes/Kenny-Manyaka-Software-Developer.pdf" download className="px-6 py-3 rounded-full bg-gradient-to-r from-velvet to-rose font-semibold">Download CV</a>
            <a href="#projects" className="px-6 py-3 rounded-full border border-rose/40 hover:bg-rose/10">View projects</a></div>
        </div>
        <div className="order-1 md:order-2 flex justify-center"><Badge loc={ME.loc} /></div>
      </section>
      <About /><Skills /><Projects /><GhRepos /><Resumes /><Certs /><Timeline /><Contact />
    </main>
    <footer className="text-center text-xs text-rose-100/40 py-10">© 2026 {ME.name}</footer>
    <button onClick={() => setCli(o => !o)} aria-label="Toggle CLI shell (Ctrl + ~)" className="fixed bottom-6 right-4 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-velvet to-rose font-mono text-sm shadow-[0_0_30px_#ec489988]"><Terminal size={18} />CLI Shell</button>
    <button onClick={() => setLite(l => !l)} aria-pressed={lite} className="fixed bottom-6 left-4 z-50 px-4 py-2 rounded-full glass !rounded-full text-xs font-mono">Effects: {lite ? 'off' : 'on'}</button>
    <CLI open={cli} setOpen={setCli} />
  </>
}