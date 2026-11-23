# Mohammad Bajaa - Portfolio

A responsive, single-page English portfolio built with React, Vite and TypeScript. Dark navy and teal surfaces, a supplied portrait, animated conceptual SVGs, a burger navigation menu, keyboard navigation, and support for reduced motion. No internal screenshots or internal links are included.

## Run locally

Requires Node.js 22.12+ (or a current supported Node.js LTS).

```sh
npm ci
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

The static output is in `dist/`. Relative asset paths support both GitHub Pages project sites and root domains. Fonts use Google Fonts, with local sans-serif fallbacks if unavailable.

## Edit content

All page copy, navigation, projects, employers, skills and contact links are in **`src/data/portfolio.ts`**. Display components read that file.

- Set a project's `visible` to `false` to hide it. Change `order` to reorder projects.
- Add a verified link to `links`, set `visible: true`, and provide a non-empty `href`. Email links should use `mailto:you@example.com`. Unavailable links are hidden. The contact section appears once any contact link is enabled. WhatsApp and Telegram links are supplied by the owner and open the corresponding chat without sending a message automatically.
- Experience titles and dates match the supplied CV; skills and contact links include the owner's corrections and additions. Edit each entry's `role` and `dates` when updating it. Set `visible: false` to hide an employer and its workplace group.
- Edit `skills.groups` for hands-on skills and `skills.familiar.items` for the single Familiar with section. Each group has its own bounded bubble field; Familiar shares one field. `useBubblePhysics.ts` handles slow drifting, elastic collisions, edge rebounds, and gentle mouse repulsion. Motion pauses offscreen or in hidden tabs and stops for reduced motion. `src/bubbles.css` controls the bubble appearance. Kafka, VM script automation and working style are owner-confirmed. Suggested skills are not added until confirmed.
- Skill logos are bundled SVGs from Simple Icons, with local symbols for SQL, Java, C#, automation and working style. Blade shares the Laravel logo. These icons load locally without external image requests. See `src/components/SkillLogo.tsx` and [Simple Icons](https://github.com/simple-icons/simple-icons) for the upstream icon collection and brand guidance.
- **Projects by workplace:** edit `workplaceWork.projects`. Each entry has an `employerId` matching an experience entry's `id`, a `status` (`completed`, `in-progress`, or `unspecified`), `order`, and `visible`. The owner has confirmed all current projects as `completed`. For new projects, use `unspecified` until their status is confirmed. The filters and badges update from this data. Use `selectedProjectId` to reuse a selected project's name and contribution, or supply `name` and `summary` for another project. Hiding a selected project also hides its linked workplace entry.
- The supplied CV is in **`public/cv.pdf`** and its download link is enabled. Replace that file to update the download; rebuild and deploy afterward.
- Replace **`public/mohammad-bajaa.jpg`** to update the small circular avatar, or change `portrait.src` and `portrait.alt` in the content file. The bio below the avatar reads `hero.summary`.
- Project `visual` selects an SVG animation: `archive`, `risk`, `incident`, or `frontend`. The illustrations are in `src/components/ProjectVisual.tsx`; styling and motion are in `src/enhancements.css`. Animations pause offscreen and stop when the visitor prefers reduced motion.
- Page entrances, menu transitions, button sheen, and skill hover effects are in `src/motion.css`. The shared observer in `src/components/usePageMotion.ts` handles staggered entrances, with visible content as the fallback.
- Dark colors, the slow decorative loader, the description's orbiting border light, and project hover backgrounds are in `src/dark-theme.css`. The loader rotates every 9 seconds and the border light every 12 seconds. Both stop with reduced motion.
- Only supplied technologies and metrics are included. Blue Store has no invented performance percentage.
- RTGS Message Sender and CBS & CMLC Letters appear only in Projects by workplace. Mar Assia's report automation is part of its single HR project. Workplace groups start expanded. The header has an icon-only WhatsApp link; all contact and CV buttons are at the bottom of the page, with SVG icons and dark tinted backgrounds.

## Deploy to GitHub Pages

Push this project to a GitHub repository with a `main` branch. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**. The included workflow builds and publishes every push to `main`, or can be run manually from the Actions tab.

For a new repository, after creating it on GitHub:

```sh
git init
git add .
git commit -m "Build personal portfolio"
git branch -M main
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
```

For later updates:

```sh
npm run build
git add .
git commit -m "Update portfolio"
git push
```

No GitHub repository or account URL is guessed or displayed on the portfolio. Hosting publication requires your repository configuration.
