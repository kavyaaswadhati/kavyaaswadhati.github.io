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
- Prefer simple HTML, CSS, and framework-native patterns already present in the repo.
- Keep components small and named by their visible purpose.
- Use semantic markup and accessible labels for navigation, buttons, images, and forms.
- Maintain responsive behavior across mobile and desktop.
- Avoid decorative complexity that makes future edits harder.

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
- Prefer readable constants or plain data arrays for portfolios, links, and project lists.
- Avoid burying editable text inside dense logic.

## Verification

- Run the lightest relevant check after changes: formatting, build, lint, or a local smoke test.
- For visual edits, inspect the page in realistic mobile and desktop sizes when feasible.
- Report what changed, what was checked, and any follow-up risks briefly.
