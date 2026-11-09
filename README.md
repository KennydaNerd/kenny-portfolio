# Kgothatso Kenny Manyaka | Portfolio

Interactive developer portfolio for a Junior Software Developer and QA Tester, built with React, Vite, Tailwind CSS and Three.js.

**Live site:** https://kenny-portfolio-swart.vercel.app

## Features

- **3D flip badge:** a draggable, swinging neck-tag ID with a holographic foil effect that follows the mouse or phone tilt. Tap or press Enter to flip it.
- **Cosmos background:** a Three.js particle galaxy that reacts to the mouse and flies forward as you scroll.
- **CLI terminal:** open it with the floating button or `Ctrl + ~`. Commands: `help`, `whoami`, `skills`, `projects`, `resumes`, `contact`, `hire`, `clear`. Up/down arrows give history and Tab autocompletes.
- **Resume viewer:** switch between the Software Developer and IT Support & QA versions, with quick view and PDF download.
- **Projects:** live demos, source links, inspect panels and a live feed of public GitHub repos.
- **Certificates and career timeline:** a skill-tree style timeline of training and credentials.
- **Contact form:** validated inputs that open the visitor's email app with the message ready to send.
- **Performance controls:** an "Effects" toggle, lighter particle counts on phones and `prefers-reduced-motion` support.

## Tech stack

React 18, Vite, Tailwind CSS, Three.js, Framer Motion, Lucide React. Deployed on Vercel.

## Run locally

```bash
git clone https://github.com/KennydaNerd/kenny-portfolio.git
cd kenny-portfolio
npm install
npm run dev
```

Open the local address Vite prints (usually http://localhost:5173). To test on your phone, run `npm run dev -- --host` and open the Network address.

## Project structure

```
public/
  portrait.png            # photo shown on the badge
  og.png                  # social share preview image
  resumes/                # downloadable CV PDFs
src/
  App.jsx                 # data, sections, terminal, layout
  extras.jsx              # badge physics, toasts, GitHub repos feed
  index.css               # Tailwind layers and custom effects
```

## Customising

- Edit the `ME`, `ABOUT`, `SKILLS`, `PROJECTS`, `CERTS` and `TIMELINE` constants at the top of `src/App.jsx`.
- Replace the files in `public/` to update the photo, CVs or share image. Keep the file names the same.

## Deployment

Push to GitHub and import the repository on Vercel. Vite is detected automatically (build command `npm run build`, output directory `dist`).

## Contact

Kgothatso Kenny Manyaka
Pretoria / Johannesburg, South Africa
[Email](mailto:manyakakgothatso7@gmail.com) · [LinkedIn](https://linkedin.com/in/kgothatso-manyaka-00036627b) · [GitHub](https://github.com/KennydaNerd)
