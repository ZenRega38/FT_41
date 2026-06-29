# AGENTS.MD — Yudisium Ke-41 Fakultas Teknik UBT Website

> **Instruction file for AI coding agents** working on a premium website profile for **Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan**.
>
> Think of this as the project’s operating manual: design direction, verified facts, data rules, architecture, coding conventions, QA gates, and safety constraints.

---

## 0. Agent Operating Rules

### Priority order
1. Follow the user’s latest explicit request.
2. Follow this `AGENTS.MD`.
3. Follow existing repository conventions if they do not conflict with this file.
4. Prefer minimal, reversible changes over broad rewrites.

### Non-negotiables
- **Never fabricate official data.** Participant names, NIM, GPA/IPK, predicate, thesis title, advisors, event date, venue, awards, and social links must come from approved panitia/fakultas data.
- **Do not publish sensitive academic data by default.** NIM, IPK, thesis title, advisor, predicate, and social media are opt-in fields.
- **Do not copy Apple branding, assets, wording, icons, or layout directly.** Use Apple-like principles only: clarity, restraint, premium spacing, visual hierarchy, and subtle motion.
- **Do not use placeholder text in production.** Replace `TBD`, dummy graduates, lorem ipsum, sample images, and template copy before release.
- **Do not change the visual identity arbitrarily.** The required direction is deep black with elegant gold accents.
- **Always preserve accessibility, performance, and mobile quality.** The site is photo-heavy and must remain fast and readable.

### When unsure
- Check existing data files first.
- Search official or panitia-provided sources if available.
- If the data is not available, render a graceful “Data akan diperbarui” state rather than inventing.

---

## 1. Project Summary

Build a cinematic, premium, Apple-inspired website profile for:

**Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan**

Concept name:

**The 41st Chapter — Faculty of Engineering UBT**

Primary tagline:

**71 Engineers. One Legacy. From Tarakan to the Future.**

Core idea:

This is not a generic university event page. It should feel like a luxury product launch page where the “product” is the academic journey and identity of **71 yudisium participants**. The experience must be formal enough for a faculty event, emotional enough for students and families, and polished enough to impress visitors.

Tone:

- Elegant
- Proud
- Academic
- Cinematic
- Minimal
- Respectful
- Modern
- Not cheesy
- Not overdecorated

---

## 2. Verified Context and Source Registry

Use these as the current public reference points. Official event-specific data may still need to come from panitia/SK yudisium.

### Verified facts
- Universitas Borneo Tarakan’s vision is to become an **Entrepreneurship University** unggul di bidang **sumber daya pesisir laut tropis** dan **pengembangan wilayah perbatasan**.
- Fakultas Teknik UBT lists four S1 programs: **Teknik Elektro**, **Teknik Mesin**, **Teknik Sipil**, and **Teknik Komputer**.
- UBT’s official address is **Jalan Amal Lama No. 1, Kota Tarakan, Kalimantan Utara, Indonesia 77115**.
- The current public FT homepage shows a playlist item titled **“Yudisium Fakultas Teknik Ke XL”**. Public evidence for **Yudisium Fakultas Teknik Ke XLI / Ke-41** and the exact **71 participants** has not been found in the public web snapshot used for this brief.

### Official sources to re-check before launch
- UBT Visi & Misi: `https://www.ubt.ac.id/tentang-ubt/visi-misi/`
- UBT Fakultas Teknik profile: `https://www.ubt.ac.id/fakultas/fakultas-teknik/`
- Fakultas Teknik UBT website: `https://ft.ubt.ac.id/`
- UBT main site and visual identity/download assets: `https://www.ubt.ac.id/`

### Design, web, and agent references
- AGENTS.md convention: `https://agents.md/`
- OpenAI Codex AGENTS.md guide: `https://developers.openai.com/codex/guides/agents-md`
- Apple Human Interface Guidelines — Typography: `https://developer.apple.com/design/human-interface-guidelines/typography`
- Apple Human Interface Guidelines — Color: `https://developer.apple.com/design/human-interface-guidelines/color`
- Next.js image optimization: `https://nextjs.org/docs/app/getting-started/images`
- W3C WCAG 2.2 contrast guidance: `https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum`

### Important correction from earlier brief
The FT homepage currently contains template-like or incomplete values such as “Jonathan Doe — Headmaster” and multiple counters showing `0`. Treat those as **not authoritative**. For official institutional data, prefer UBT’s main faculty page, official SK, panitia data, or direct confirmation from faculty staff.

---

## 3. Data Truth Rules

### Source priority for event data
1. SK Yudisium / official faculty document.
2. Panitia yudisium spreadsheet or database.
3. Faculty academic office confirmation.
4. Official faculty/university announcement.
5. Participant-submitted form, only for personal quote/socials and only when approved.

### Required data before production
Minimum viable production data:

| Field | Required | Notes |
|---|---:|---|
| `id` | Yes | Stable numeric/string ID. |
| `name` | Yes | Official spelling. |
| `program` | Yes | One of the approved FT programs. |
| `photo` | Yes | Formal photo path. |
| `photoAlt` | Yes | Meaningful alt text. |
| `displayConsent` | Yes | Must be `true` before public display. |

Optional fields:

| Field | Default | Rule |
|---|---|---|
| `nim` | Hidden | Show only if approved. |
| `gpa` / `ipk` | Hidden | Show only if approved. |
| `predicate` | Hidden | Show only if approved. |
| `thesisTitle` | Hidden | Show only if approved. |
| `advisor` | Hidden | Show only if approved. |
| `quote` | Empty | Participant-submitted or panitia-approved. |
| `instagram` / `linkedin` | Empty | Explicit consent only. |
| `awardTags` | Empty | Must be verified. |

### Privacy-first rendering
- If a field is absent, do not render its label.
- If data is pending, show “Data akan diperbarui” only in development/preview sections.
- Do not expose raw JSON containing hidden private fields in public client bundles unless approved for display.
- Avoid searchable metadata for private fields.

---

## 4. Recommended Tech Stack

Preferred stack:

- **Next.js App Router**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion / Motion for React** for subtle animation
- **next/image** for optimized formal portraits and gallery images
- Local JSON data for the first version
- Optional CMS later: Sanity, Contentful, Supabase, or Notion-backed internal pipeline

Package manager preference:

1. `pnpm`
2. `npm` if the repo already uses npm
3. Do not introduce `yarn` unless existing project uses it

Suggested setup commands:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

If scripts do not exist, add them in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## 5. Repository Structure

Preferred structure:

```txt
.
├── AGENTS.MD
├── README.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   └── sitemap.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── OpeningStory.tsx
│   │   ├── Stats.tsx
│   │   ├── Programs.tsx
│   │   ├── GraduateWall.tsx
│   │   ├── FeaturedGraduates.tsx
│   │   ├── Timeline.tsx
│   │   ├── Gallery.tsx
│   │   ├── Messages.tsx
│   │   └── Closing.tsx
│   ├── graduates/
│   │   ├── GraduateCard.tsx
│   │   ├── GraduateModal.tsx
│   │   ├── GraduateFilters.tsx
│   │   └── GraduateSearch.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Container.tsx
│       ├── SectionLabel.tsx
│       ├── StatCard.tsx
│       └── MotionReveal.tsx
├── data/
│   ├── participants.json
│   ├── programs.json
│   ├── messages.json
│   ├── gallery.json
│   └── site.ts
├── lib/
│   ├── constants.ts
│   ├── data.ts
│   ├── seo.ts
│   ├── slug.ts
│   └── validation.ts
├── public/
│   ├── logos/
│   ├── graduates/
│   ├── gallery/
│   └── og/
└── types/
    └── site.ts
```

Rules:

- Keep sections small and composable.
- Do not put large data arrays inside React components.
- Put reusable design tokens in Tailwind config and/or CSS variables.
- Put official copy and config in `data/site.ts`.

---

## 6. Data Models

### TypeScript types

```ts
export type ProgramCode = 'TE' | 'TM' | 'TS' | 'TK'

export type ProgramName =
  | 'Teknik Elektro'
  | 'Teknik Mesin'
  | 'Teknik Sipil'
  | 'Teknik Komputer'

export interface Participant {
  id: number | string
  slug: string
  name: string
  program: ProgramName
  programCode: ProgramCode
  photo: string
  photoAlt: string
  displayConsent: boolean
  nim?: string
  gpa?: string
  predicate?: string
  thesisTitle?: string
  advisor?: string
  quote?: string
  awardTags?: string[]
  social?: {
    instagram?: string
    linkedin?: string
  }
}

export interface Program {
  code: ProgramCode
  name: ProgramName
  shortName: string
  description: string
  icon: 'circuit' | 'gear' | 'bridge' | 'chip'
}

export interface Message {
  id: number | string
  author: string
  role: string
  body: string
  photo?: string
  isOfficial: boolean
}

export interface GalleryItem {
  id: number | string
  src: string
  alt: string
  caption?: string
  category: 'prosesi' | 'pimpinan' | 'peserta' | 'keluarga' | 'behind-the-scene'
}
```

### Sample participant JSON

Use only as development placeholder. Do not ship dummy data.

```json
[
  {
    "id": 1,
    "slug": "nama-peserta-satu",
    "name": "Nama Peserta Satu",
    "program": "Teknik Komputer",
    "programCode": "TK",
    "photo": "/graduates/nama-peserta-satu.webp",
    "photoAlt": "Foto formal Nama Peserta Satu, peserta Yudisium Ke-41 Fakultas Teknik UBT",
    "displayConsent": true,
    "quote": "Data quote akan diperbarui."
  }
]
```

### CSV import template

```csv
id,slug,name,program,programCode,photo,photoAlt,displayConsent,nim,gpa,predicate,thesisTitle,advisor,quote,instagram,linkedin,awardTags
1,nama-peserta-satu,Nama Peserta Satu,Teknik Komputer,TK,/graduates/nama-peserta-satu.webp,"Foto formal Nama Peserta Satu",TRUE,,,,,,,,
```

### Slug rules

- Lowercase.
- Replace spaces with hyphens.
- Remove academic titles from participant slug.
- Remove punctuation except hyphen.
- Keep slugs stable after deployment.

Example:

```txt
Nama Lengkap Peserta -> nama-lengkap-peserta
```

---

## 7. Visual Direction

### Design keyword

**Black-tie engineering ceremony.**

The site should look like a premium academic archive with product-launch energy.

### Color tokens

```css
:root {
  --black-primary: #050505;
  --black-soft: #0b0b0d;
  --charcoal: #141416;
  --gold: #d4af37;
  --gold-muted: #b8962e;
  --champagne: #f5e6b8;
  --text-primary: #f7f7f2;
  --text-muted: #a7a7a7;
  --border-gold: rgba(212, 175, 55, 0.22);
  --glass: rgba(255, 255, 255, 0.06);
}
```

Usage rules:

- Use black as the main environment.
- Use gold for accents, rules, badges, glows, icons, and selected headline gradients.
- Do not use bright yellow.
- Avoid applying gold to all text. Overuse makes the design cheap.
- Use champagne for softer secondary highlights.

### Typography

Preferred fonts:

- Heading: `Instrument Serif`, `Playfair Display`, `Cormorant Garamond`, or similar editorial serif.
- Body: `Inter`, `Plus Jakarta Sans`, or system sans.
- Numbers/stats: `Inter Tight` or a clean geometric sans.

Rules:

- Use large hero typography with `clamp()`.
- Keep body copy readable on mobile.
- Use a maximum of two font families.
- Typography must create hierarchy, not decoration.

Suggested sizes:

```css
.hero-title { font-size: clamp(3.5rem, 10vw, 10rem); }
.section-title { font-size: clamp(2.5rem, 6vw, 6rem); }
.body-lg { font-size: clamp(1.05rem, 1.5vw, 1.35rem); }
```

### Motion

Motion should feel expensive and calm:

- Slow opacity + y reveal
- Subtle scale on cards
- Soft spotlight movement
- Smooth modal transition
- Count-up stats
- No fast spinning, bouncing, or noisy effects

Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Page Sections

### 8.1 Navbar

Required:

- Logo area for UBT / Fakultas Teknik.
- Navigation: Home, Tentang, Prodi, Peserta, Galeri, Pesan.
- Transparent black background with blur.
- Gold hover underline.
- Mobile hamburger with accessible dialog/menu.

Do:

- Use `aria-label`.
- Keep nav height compact.
- Ensure the active section state is not required for MVP.

Do not:

- Overload nav with too many items.
- Use sticky nav that covers anchor targets without scroll margin.

### 8.2 Hero

Required copy:

```txt
Yudisium Ke-41
Fakultas Teknik
Universitas Borneo Tarakan
```

Subtitle:

```txt
71 Engineers. One Legacy. From Tarakan to the Future.
```

Visual:

- Full viewport.
- Giant “41” as subtle gold outline, gradient, or background figure.
- Soft spotlight from top-center.
- Optional tiny particles/noise/grid, very subtle.
- CTA: “Lihat Profil Peserta” and “Tentang Yudisium”.

### 8.3 Opening Story

Recommended Indonesian copy:

```txt
Setelah melewati ruang kelas, laboratorium, penelitian, revisi, dan perjuangan panjang, hari ini menjadi penanda babak baru. Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan merayakan 71 calon lulusan yang siap membawa ilmu, integritas, dan karya ke masa depan.
```

Rules:

- Keep copy proud but not excessive.
- Mention border/coastal identity only in a respectful academic way.

### 8.4 Statistics

Cards:

- 71 Peserta Yudisium
- 4 Program Studi
- 1 Fakultas Teknik
- 41st Chapter

Implementation:

- Use count-up only once when visible.
- Use black glass cards with subtle gold border.
- Ensure numbers still render without JS animation.

### 8.5 Program Studi

Programs:

- Teknik Elektro
- Teknik Mesin
- Teknik Sipil
- Teknik Komputer

Card treatment:

- Abstract engineering line-art.
- Short description.
- CTA/filter interaction: “Lihat Peserta”.
- Hover tilt must be subtle.

Do not add unverified programs.

### 8.6 Graduate Wall

This is the flagship section.

Required features:

- Render all approved participant photos.
- Search by name.
- Filter by program.
- Sort alphabetically.
- Program badge.
- Card hover: slight zoom, gold border, name reveal.
- Click opens modal/detail panel.

Modal fields:

- Photo
- Full name
- Program
- NIM, only if approved
- Predicate/IPK, only if approved
- Thesis title, only if approved
- Advisor, only if approved
- Quote, if provided
- Social links, if approved

Performance rules:

- Use `next/image`.
- Provide width/height to avoid layout shift.
- Use WebP/AVIF when possible.
- Lazy-load below-the-fold images.
- Use modal lazy import if it increases initial bundle quality.

Empty states:

- Search no result: “Tidak ada peserta yang sesuai dengan pencarian.”
- Missing optional detail: hide the field.
- Missing photo in development: use a clearly marked placeholder.

### 8.7 Featured Graduates

Render only if verified data exists.

Possible categories:

- Lulusan Terbaik
- Cumlaude / Dengan Pujian
- Perwakilan Prodi
- Penghargaan Akademik

Never invent rankings or awards.

### 8.8 Timeline

Suggested items:

1. Awal Perjalanan
2. Ruang Kelas & Laboratorium
3. PKL / KKN / Riset
4. Skripsi & Sidang
5. Yudisium Ke-41
6. Menuju Wisuda & Dunia Profesional

Use gold line animation, vertical on mobile and optional horizontal on desktop.

### 8.9 Gallery

Use a masonry or bento grid.

Categories:

- Prosesi
- Dosen & Pimpinan
- Peserta
- Keluarga
- Behind the Scene

Rules:

- All images need alt text.
- Do not use unapproved faces/photos.
- Use compressed images.
- Captions should be short and formal.

### 8.10 Messages

Cards for:

- Dekan Fakultas Teknik
- Wakil Dekan
- Koordinator Program Studi
- Dosen
- Panitia
- Orang tua / teman

Rules:

- Official messages must be approved.
- Quote styling may use gold quotation marks but avoid visual clutter.

### 8.11 Closing

Required copy:

```txt
Yudisium bukan akhir perjalanan.
Ia adalah peluncuran.
```

Subcopy:

```txt
Selamat kepada 71 peserta Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan.
```

CTA:

```txt
Kembali ke Atas
```

### 8.12 Footer

Include:

- Universitas Borneo Tarakan
- Fakultas Teknik
- Jalan Amal Lama No. 1, Kota Tarakan, Kalimantan Utara, Indonesia 77115
- Website credit
- Data source note: “Data peserta berdasarkan dokumen resmi panitia yudisium.”
- Links/contact only if verified

---

## 9. Copywriting Rules

Tone:

- Formal but warm.
- Proud but not arrogant.
- Emotional but not melodramatic.
- Modern but not slangy.

Avoid:

- “Masa depan cerah menanti” style clichés.
- Excessive exclamation marks.
- Overpromising impact.
- Calling participants “engineers” in a legally/professionally misleading way if context requires “calon lulusan teknik”. It is acceptable in tagline style, but formal sections should use “peserta yudisium”, “calon lulusan”, or “lulusan Fakultas Teknik” after official status is clear.

Preferred vocabulary:

- Babak baru
- Karya
- Integritas
- Ketekunan
- Ilmu
- Perjalanan akademik
- Wilayah perbatasan
- Pesisir laut tropis
- Almamater
- Kontribusi

---

## 10. Accessibility Requirements

Minimum target: WCAG 2.2 AA spirit.

Rules:

- Normal text contrast should meet at least **4.5:1**.
- Large text contrast should meet at least **3:1**.
- Every image must have meaningful `alt` text or empty `alt=""` if decorative.
- Interactive elements need visible focus states.
- Modal must trap focus, close with `Esc`, and return focus to trigger.
- Search input and filters must be keyboard usable.
- Do not communicate meaning by color alone.
- Support `prefers-reduced-motion`.

---

## 11. Performance Requirements

Budget mindset:

- The site contains 71 formal portraits plus gallery assets, so image discipline matters more than micro-animations.

Rules:

- Use `next/image` for local images.
- Store formal portraits as optimized `.webp` or `.avif` where possible.
- Keep original high-res source outside `public` if not needed by production.
- Use fixed aspect-ratio containers for cards.
- Avoid layout shift.
- Do not load all gallery/modal assets eagerly.
- Avoid heavy animation libraries beyond Motion/Framer Motion unless already installed.
- Do not add new production dependencies without a clear reason.

Suggested portrait sizes:

- Source: 1200px height or higher for archive.
- Web card: 480–720px height.
- Modal: 900–1200px height.
- Use consistent crop ratio, preferably `4:5` or `3:4`.

---

## 12. SEO and Sharing

Metadata:

- Title: `Yudisium Ke-41 Fakultas Teknik UBT`
- Description: `Website profil Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan — 71 peserta, 4 program studi, satu babak baru.`
- Open Graph image: create a premium black-gold image with “41”, UBT/FT name, and tagline.

Rules:

- Do not expose private participant info in metadata.
- Use semantic headings: one `h1`, logical `h2` for sections.
- Add sitemap only when routes are stable.

---

## 13. Coding Conventions

TypeScript:

- Use strict types.
- Avoid `any` unless there is a documented reason.
- Prefer named exports for components unless the framework requires default export.
- Keep data validation in `lib/validation.ts`.

React:

- Prefer server components by default in Next.js App Router.
- Use client components only for interactive parts: search/filter, modal, animated controls.
- Keep `use client` files small.
- Do not put data fetching logic in deeply nested UI components.

Styling:

- Use Tailwind utility classes or CSS variables consistently.
- Avoid one-off magic colors outside tokens.
- Use `cn()` helper if class merging is needed.
- Keep visual effects subtle.

Naming:

- Components: `PascalCase.tsx`.
- Helpers: `camelCase.ts`.
- Data files: lowercase plural, e.g. `participants.json`.
- Images: lowercase kebab-case.

Example image naming:

```txt
public/graduates/teknik-komputer/nama-peserta.webp
public/gallery/prosesi/yudisium-ke-41-001.webp
```

---

## 14. Validation Rules

Before rendering participant data:

- `displayConsent` must be true.
- `name`, `program`, `programCode`, `photo`, and `photoAlt` must exist.
- `programCode` must match allowed values.
- Optional private fields render only when present and approved.

Suggested validation behavior:

- In development: throw detailed errors for invalid data.
- In production: skip invalid participant and log a safe warning.

Example guard:

```ts
const allowedPrograms = ['TE', 'TM', 'TS', 'TK'] as const

export function canDisplayParticipant(participant: Participant) {
  return Boolean(
    participant.displayConsent &&
      participant.name &&
      participant.photo &&
      participant.photoAlt &&
      allowedPrograms.includes(participant.programCode as ProgramCode)
  )
}
```

---

## 15. QA Checklist

### Data QA
- [ ] Exactly 71 approved participants are present.
- [ ] No duplicate names unless verified.
- [ ] No duplicate slugs.
- [ ] Every participant has the correct program.
- [ ] Every formal photo opens correctly.
- [ ] Optional private fields have approval.
- [ ] All dummy data removed.

### UI QA
- [ ] Hero is readable on desktop and mobile.
- [ ] Graduate grid works at 360px width.
- [ ] Search works with partial names.
- [ ] Program filters work.
- [ ] Modal opens/closes by click, keyboard, and `Esc`.
- [ ] Footer info is accurate.
- [ ] No cheap yellow or excessive glow.

### Accessibility QA
- [ ] Keyboard navigation works.
- [ ] Focus states visible.
- [ ] Modal focus behavior is correct.
- [ ] Alt text exists.
- [ ] Text contrast passes.
- [ ] Reduced motion is respected.

### Performance QA
- [ ] `pnpm build` passes.
- [ ] No avoidable layout shift in image grid.
- [ ] Images are optimized.
- [ ] No huge JS bundle caused by unnecessary client components.
- [ ] Lighthouse mobile performance is acceptable for a media-heavy page.

---

## 16. Agent Workflow

### First action on any task
1. Read this `AGENTS.MD`.
2. Inspect existing files before editing.
3. Identify whether the task affects data, UI, performance, accessibility, or privacy.
4. Make the smallest coherent change.
5. Run relevant checks.

### Before adding dependencies
Ask whether the dependency is necessary. Prefer native platform, Next.js, Tailwind, or existing packages.

Acceptable dependencies if not already present:

- `framer-motion` or `motion` for animation.
- `lucide-react` for simple icons, if icons are needed.
- `zod` for data validation, if validation becomes complex.

Avoid:

- Large carousel libraries.
- Heavy animation stacks.
- UI kits that fight the custom luxury direction.
- Random font packages without design reason.

### Patch discipline
- Do not rewrite unrelated files.
- Do not change data shape without updating types and validation.
- Do not remove accessibility attributes.
- Do not downgrade performance to add decoration.
- Do not invent content to make layouts look full.

### Handoff note after completing work
Always summarize:

- What changed.
- Files touched.
- Checks run.
- Any missing data or manual follow-up.

---

## 17. Build Order Recommendation

Follow this order for best results:

1. Define `data/site.ts`, `programs.json`, and `participants.json` schema.
2. Build the design tokens and global layout.
3. Build Navbar, Hero, Opening Story, Stats.
4. Build Program cards.
5. Build Graduate Wall with search/filter/sort.
6. Build Graduate Modal.
7. Add Timeline, Gallery, Messages, Closing, Footer.
8. Optimize images and mobile layout.
9. Add SEO metadata and OG image.
10. Run QA, remove placeholders, and verify official data.

Do **not** start by over-polishing animation. The site will look professional only if the participant data and photos are clean.

---

## 18. Acceptance Criteria

The project is done when:

- The website presents Yudisium Ke-41 FT UBT with premium black-gold visual identity.
- The site includes the agreed sections: Hero, Story, Stats, Programs, Graduate Wall, Featured Graduates if available, Timeline, Gallery, Messages, Closing, Footer.
- All 71 approved participants are visible in the Graduate Wall.
- Search, filter, and modal interactions work.
- The site is responsive and polished on mobile.
- No unverified official data is displayed.
- No private academic data is displayed without approval.
- Images are optimized and do not cause major layout shift.
- Accessibility basics are respected.
- Build, lint, and typecheck pass.
- The final result feels cinematic, elegant, and formal—not like a generic campus template.

---

## 19. Ready-to-use Implementation Prompt

Use this prompt when asking an AI coding agent to build the project from scratch:

```txt
You are a senior creative director, award-winning UI/UX designer, and senior frontend engineer.

Build a premium, elegant, Apple-inspired profile website for “Yudisium Ke-41 Fakultas Teknik Universitas Borneo Tarakan”. Use the concept “The 41st Chapter — 71 Engineers. One Legacy. From Tarakan to the Future.”

Follow AGENTS.MD exactly. Use Next.js App Router, TypeScript, Tailwind CSS, Motion/Framer Motion, and next/image. Build a responsive single-page website with these sections: Navbar, Hero, Opening Story, Statistics, Program Studi, Graduate Wall, Featured Graduates if verified data exists, Timeline, Gallery, Messages, Closing, and Footer.

Main visual style: deep black background, elegant muted gold accents, cinematic spotlight gradients, premium typography, spacious layout, dark glass cards, and subtle motion. Do not copy Apple branding/assets. Use Apple-like principles only: clarity, hierarchy, restraint, image-led storytelling, and polished interaction.

Data must come from local JSON files. Do not fabricate participant names or official event details. Render optional private fields only when provided and approved. Use placeholders only in development and mark them clearly.

Graduate Wall is the flagship section. It must display all approved formal portraits, support name search, program filter, alphabetical sorting, program badges, luxury portrait card hover, and an accessible profile modal.

Prioritize accessibility, image optimization, mobile layout, and clean components. After implementation, run lint, typecheck, and build, then report changes and remaining data requirements.
```

---

## 20. Human Data Collection Checklist

Ask panitia/fakultas for:

- [ ] Official event title.
- [ ] Event date.
- [ ] Event venue.
- [ ] Official rundown, if displayed.
- [ ] Approved list of 71 participants.
- [ ] Program study for each participant.
- [ ] Formal photo for each participant.
- [ ] Consent for public display.
- [ ] Optional: NIM display approval.
- [ ] Optional: IPK/predicate display approval.
- [ ] Optional: thesis title display approval.
- [ ] Optional: advisor display approval.
- [ ] Optional: participant quote.
- [ ] Optional: Instagram/LinkedIn approval.
- [ ] Official sambutan from Dekan/Wakil Dekan/Koorprodi.
- [ ] Official logos/assets.
- [ ] Event gallery photos.

Recommended form fields:

```txt
Nama Lengkap:
Program Studi:
Foto Formal:
Setuju foto dan nama ditampilkan di website? Ya/Tidak
Setuju NIM ditampilkan? Ya/Tidak
Setuju IPK/predikat ditampilkan? Ya/Tidak
Judul Skripsi:
Setuju judul skripsi ditampilkan? Ya/Tidak
Dosen Pembimbing:
Quote singkat:
Instagram:
LinkedIn:
```

---

## 21. Final Reminder for Agents

A beautiful website with messy data will still feel unprofessional. Before making the interface more complex, make the participant data clean, consistent, approved, and complete.

The target feeling is:

**“A formal academic milestone presented with the confidence of a world-class product launch.”**
