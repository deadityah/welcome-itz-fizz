# Welcome ItzFizz — Technical Assessment Showcase

A cinematic, high-performance landing hero built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **GSAP ScrollTrigger**. 

The experience features a scroll-driven, multi-car aerodynamic bullet train traveling across an illuminated nocturnal alpine landscape, synchronizing interactive metric reveals with real-time scroll progress at a locked 60fps.

---

## 🌟 Key Features & Implementation Highlights

### 1. Scroll-Driven Physics Scrub (GSAP ScrollTrigger)
* **Pinned Hero Viewport:** Pins the 100svh hero section across a calibrated 150vh scroll distance.
* **Bi-Directional Momentum:** Uses `scrub: 1` interpolation to tie train motion directly to user scroll position without time-based autoplay, reversing seamlessly when scrolling backward.
* **Precision Train Travel:** Starts with the nose at `20vw` (cars trailing off-screen to the left behind an edge fade) and smoothly traverses past all metrics before exiting gracefully.

### 2. Arrival-Synchronized Stat Reveals
* **Zero Premature Movement:** Metrics remain clean and hidden until the train physically approaches.
* **Point-of-Arrival Reveal:** Each card and its technical off-white connector line reach **100% visibility precisely when the train's nose reaches their horizontal track position**.
* **Interactivity Lock:** Pointer events and hover capabilities unlock strictly after a card reaches 100% opacity.

### 3. Interactive Metric Cards with Typewriter Effect
* **Three-Layer Card Architecture:** Separates GSAP intro transforms, scroll opacity reveal, and CSS hover lift across distinct DOM layers to prevent CSS/GSAP transform collisions.
* **Zero Layout Shift:** Cards expand smoothly (`grid-template-rows: 0fr -> 1fr`) on hover/focus. An invisible sizer copy of the text preserves the container height so the real-time typewriter effect never causes layout jitter.
* **Accessible:** Full `aria-expanded`, screen-reader text, and keyboard focus-visible support.

### 4. Custom Scalable Vector Nightscape
* **Curved Mountain Glaciers:** Realistic Bézier-curved snowpack following mountain ridge contours, bounded by an SVG `clipPath` barrier to guarantee zero sky overflow.
* **Atmospheric Nocturnal Horizon:** Single radiant moon with multi-stop halo glow, delicate shimmering stars, misty valley layers, and a winding alpine river with reflective water ripples.
* **Firmly Grounded Flora:** Four distinct scattered tree species (Alpine Fir, Mature Broad Pine, Mountain Pine, Deciduous Birch) and lush bushes rooted directly into the terrain contours.

### 5. High-Speed Slab Track Bed
* **Polished Steel Rail:** Precision-aligned running rail with specular highlights resting directly under the train wheels at 20% opacity.
* **Structural Sleepers:** Evenly spaced concrete slab cross-ties and ballast shadow grounding the rail into the landscape.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | Framework with Turbopack and static export (`output: 'export'`) |
| **React 19** | Component architecture, lifecycle hooks (`useRef`, `useCallback`, `useState`) |
| **TypeScript** | Strict type safety for data models, props, and coordinate geometry |
| **GSAP 3 + ScrollTrigger** | High-performance animation timelines and scrub-based scroll orchestration |
| **@gsap/react** | React integration via `useGSAP` for safe lifecycle management and garbage collection |
| **Tailwind CSS v4** | Modern atomic utility styling with pure CSS design tokens |
| **Google Fonts via Next** | `Syncopate` (Headline), `Space Grotesk` (Copy), and `JetBrains Mono` (Data/Labels) |

---

## ⚡ Performance & Engineering Standards

* **GPU-Accelerated Properties Only:** Scroll scrub strictly modifies hardware-accelerated transforms (`transform: translate3d`) and opacity.
* **Zero Reflows During Scroll:** All coordinate readings (`offsetLeft`, `offsetTop`, dimensions) are computed **strictly once** on initial load and during `refreshInit` on window resize. Zero layout recalculations run on active scroll ticks.
* **Motion Accessibility:** Automatically respects `prefers-reduced-motion: reduce` by bypassing animations and instantly applying settled resting layouts.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v20.x` or higher recommended
* **Package Manager**: `npm`

### Installation
```bash
# 1. Clone the repository
git clone <your-repo-url>
cd WelcomeItzFizz

# 2. Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Static Export
```bash
npm run build
```
Generates a static HTML/CSS/JS export in `./out` ready for deployment on GitHub Pages or any static CDN.

---

## 🌐 Deployment

### GitHub Pages (Automated via GitHub Actions)
This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
1. Push this repository to GitHub.
2. Go to **Settings** $\to$ **Pages** $\to$ **Build and deployment**.
3. Under **Source**, select **GitHub Actions**.
4. The site will automatically build and deploy to:
   $$\text{https://<your-username>.github.io/<your-repo-name>/}$$

### Vercel Deployment (1-Click)
Import the repository on [Vercel](https://vercel.com/new) and click **Deploy**. Next.js will detect the configuration automatically.
"# welcome-itz-fizz" 
"# welcome-itz-fizz" 
"# welcome-itz-fizz" 
