# AGENTS.md

Guidance for agents working on this website.

## Core Priorities

- Keep the site easy for the owner to understand, edit, and publish.
- Prefer terse, elegant code over clever abstractions.
- Make the smallest useful change that satisfies the request.
- Avoid scope creep: do not redesign, reorganize, or add dependencies unless the task clearly requires it.
- Preserve existing content, tone, layout patterns, and file organization unless asked to change them.

## Website Changes

- Treat user-facing content as owner-editable. Keep copy, links, image paths, project data, and metadata easy to find.
- This is a Next.js + TypeScript + Tailwind site deployed on Vercel. Prefer framework-native patterns already present in the repo.
- Keep components small and named by their visible purpose.
- Use semantic markup and accessible labels for navigation, buttons, images, and forms.
- Maintain responsive behavior across mobile and desktop.
- Avoid decorative complexity that makes future edits harder.

## Deployment

- Vercel deploys the connected production branch from the repository root.
- `vercel.json` pins the project as a Next.js app and runs `npm run build`.
- Keep `package.json`, `package-lock.json`, `next.config.ts`, and `vercel.json` aligned when changing build behavior.
- Do not restore the old static root files (`index.html`, `Style.css`, `script.js`) as the deployment surface. Routes live under `app/`.
- Keep source PNGs under `source-images/`; they are local source assets and are ignored by Git. Committed deployable images live under `public/images/`.
- Run `npm run images` after adding or changing source artwork before building or deploying.
- Push to `master` only when the user asks to deploy. Vercel will build and publish automatically after the push.
- After deployment, verify the live domain and at least one changed asset or route with a simple request.

## Code Style

- Write concise code with clear structure and minimal indirection.
- Remove duplication only when it genuinely simplifies the site.
- Do not introduce a new library for a problem that plain CSS, HTML, or existing project tools handle well.
- Use comments sparingly, only to explain non-obvious decisions.
- Keep generated or build-only files out of manual edits unless the project expects them to be edited directly.

## Scope Control

- Before expanding the task, ask whether the extra work is necessary for the user's stated goal.
- Leave unrelated bugs, styling preferences, and refactors untouched unless they block the requested change.
- Do not rename files, move routes, or change deployment behavior without a clear reason.
- Preserve public URLs and asset paths where possible.

## User Modification

- Favor obvious filenames, straightforward data shapes, and local styles over hidden configuration.
- Keep repeated content easy to add, remove, or reorder.
- Prefer readable constants or plain data arrays for portfolios, links, and project lists. Current project metadata lives in `data/projects.ts`.
- Avoid burying editable text inside dense logic.

## Verification

- Run the lightest relevant check after changes: formatting, build, lint, or a local smoke test.
- For visual edits, run a local preview server and provide the preview URL before pushing or deploying. Use `npm run dev -- --hostname 127.0.0.1 --port 3000` unless that port is unavailable.
- Inspect the page in realistic mobile and desktop sizes when feasible before asking the owner to approve deployment.
- Stop any local preview server you started after the user is done reviewing or before finishing the turn, unless the user explicitly wants it left running.
- Run `npm run lint` and `npm run build` before committing deployable changes.
- Report what changed, what was checked, and any follow-up risks briefly.
