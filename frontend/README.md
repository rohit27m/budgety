<div align="center">
	<h1>💰 Budget Tracker</h1>
	<p>A lightweight personal expense tracker with a modern Tailwind CSS interface, dark mode styling, and basic analytics.</p>
	<img src="https://img.shields.io/badge/React-18+-61dafb?logo=react&logoColor=white" />
	<img src="https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?logo=tailwindcss&logoColor=white" />
	<img src="https://img.shields.io/badge/Build-CRA%205-blue" />
</div>

---

## ✨ Features

- 🔐 Local (browser) storage of expenses (no backend required)
- 🌓 Dark-mode ready utility classes (toggle can be added easily)
- 💸 Quick add expense form with category list
- 📜 History view with categorized listing
- 📊 Analytics (Pie / Bar / Line charts via Recharts)
- 🎨 Modern UI: glass morphism cards, gradient backgrounds, animated headings
- ⚡ Fast iteration: Tailwind utility-first workflow

## 🗂 Project Structure (frontend)

```
frontend/
	public/
	src/
		components/ (LandingPage, Home, History, Analytics)
		index.js
		App.js
		index.css (Tailwind layers + custom utility classes)
	tailwind.config.js
	postcss.config.js
```

## 🚀 Getting Started

Install dependencies (first time):

```powershell
cd "D:\Budget tracker\budgety\frontend"
npm install
```

Run development server:

```powershell
npm start
```
Open: http://localhost:3000

Create production build:

```powershell
npm run build
```

## 🎨 Tailwind Setup Summary

- Config: `tailwind.config.js` with extended colors, fonts, animations
- Directives & layered utilities in `src/index.css`
- Custom utility classes:
	- `.btn-primary`, `.btn-secondary`
	- `.card` (glass effect + hover aura)
	- `.input` (blur + focus ring)
	- `.badge`, `.gradient-text`, `.fade-in`, `.glass`

To add dark mode toggle quickly:
```js
// In any component or index.js
const toggle = () => document.documentElement.classList.toggle('dark');
```

## 📊 Charts
Recharts is used in `Analytics.js` for Pie, Bar, and Line charts. Data is aggregated from `localStorage` each render.

## 🛠 Tech Stack
| Layer | Tool |
|-------|------|
| UI | React + Tailwind CSS |
| Build | Create React App (react-scripts 5) |
| State | Local component state + localStorage |
| Charts | Recharts |

## 🔧 Environment Notes
React 19 APIs are not used; current code is compatible with React 18+ under CRA 5. Tailwind 3.x chosen for stable CRA integration.

## 🧪 Testing (Optional)
You can add tests via `npm test` (default CRA testing libs installed), though no custom tests are currently defined.

## 🗺 Future Enhancements
- Persistent dark mode preference
- Category color badges + icons
- Editable / deletable expenses from history
- Export / import data (JSON)
- Basic authentication + backend API

## 📄 License
Currently unlicensed (private use). Add a LICENSE file if distributing.

---

Made with focus on clarity and speed of iteration. Feel free to extend! ✌️
