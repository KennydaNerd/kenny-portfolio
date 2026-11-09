export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { obsidian: '#090206', velvet: '#800020', crimson: '#ef4444', rose: { DEFAULT: '#ec4899', 50: '#fff1f2', 100: '#ffe4e6' } },
    fontFamily: { display: ['Sora', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
    backgroundImage: { prism: 'linear-gradient(135deg,#ef4444,#ec4899,#8b5cf6,#3b82f6)' },
  } },
}
