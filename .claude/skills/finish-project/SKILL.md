---
name: finish-project
description: Wrap up a completed GFE project. Creates LEARNINGS.md, submission.md, updates notes/, and fills in the root index.html project card description. Invoke manually when a project is done.
disable-model-invocation: true
argument-hint: [project-folder-path]
allowed-tools: Read Write Edit Bash
---

You are wrapping up a completed GFE project. Follow these steps in order. Do not skip any step.

## Step 1 — Identify the project

If $ARGUMENTS is provided, use it as the project path. Otherwise ask:
> "Which project are we wrapping up? (e.g. `design-system/text-input-component`)"

Resolve to the full path: `/Users/safwaan/Developer/learn/gfe-projects/[project-path]`

Read these files to build full context before writing anything:
- `project-brief.md` — what was required
- `design-notes.md` — what was designed
- `index.html` — the final HTML structure
- `css/style.css` (or equivalent) — the final CSS
- `js/index.js` (or equivalent) — any JavaScript
- Any existing `LEARNINGS.md` — to update rather than overwrite if it exists

Do not proceed until you have read all files that exist.

## Step 2 — Read the conversation

Before writing anything, reflect on the current conversation — the full exchange between you and the user during this project's implementation. Do not ask the user anything. Extract from the conversation:

- Moments where the user questioned their own approach ("am I thinking wrong?", "is this right?", "are you sure?")
- Assumptions the user started with that turned out to be incorrect
- Questions the user asked that revealed a gap in their mental model
- Questions the user asked that showed good instinct
- Where the user caught their own mistakes vs. where they needed to be corrected
- How the user's understanding of a concept shifted during the project

This feeds directly into the "How You Thought" section in LEARNINGS.md.

## Step 3 — Create LEARNINGS.md

Create (or overwrite) `LEARNINGS.md` inside the project folder. Base it on the code and the conversation analysis above. Use this exact structure:

```
# [Project Name] — Learnings

## Concepts Learned
For each concept actually used in the project: what it is, why it was the right choice, and a short code snippet.

## Mistakes Made
A table with three columns: Mistake | What Went Wrong | Fix
Only include mistakes that are evidenced in the conversation or visible in the code history — do not guess and do not ask the user.

## Patterns to Reuse
Reusable code snippets or approaches worth copying into future projects. Each one labelled with what it solves.

## What You Did Well
2–4 specific things the user did correctly or showed good instinct on. Be specific — not generic praise.

## What to Improve
Specific habits or patterns to fix next time. Reference what actually went wrong in this project.

## Interview Connections
Which concepts from this project appear in real frontend interviews and why they matter.

## How You Thought
Drawn from the conversation during this project — not the code, but the thinking. Include:
- Assumptions you started with that turned out wrong
- Moments where you questioned your own approach (and whether the instinct was right)
- Questions that revealed a gap in your mental model
- Questions that showed good instinct
- How your understanding of something shifted during the project

## Carry-forward Questions
Open questions or uncertainties from this project to revisit later. Be honest — include things that weren't fully understood.

## Unlearned Gaps (if any)
Any features added by the coach rather than the user. List what was added, why it matters, and point to the relevant notes/ file.

## What to Practice More
Specific skill gaps that need more reps based on this project.
```

## Step 4 — Create submission.md

Create `submission.md` inside the project folder. Use this exact structure and enforce the character limits strictly:

```
# [Project Name]

**[Title]**

---

## Summary

[Summary]

---

## Implementation Details

### Tech stack and approach

[Content]

### Useful resources and lessons learnt

[4–6 bullet points]

### Notes/questions for community

[2–3 questions]
```

**Character limit rules — enforce these before saving:**
- Title (the bold line): min 20 chars, max 80 chars. Count the characters. If over or under, rewrite until it fits.
- Summary: max 160 chars. Count the characters. If over, shorten until it fits.
- After writing both, state the exact character counts: "Title: X chars. Summary: Y chars."

The title should be professional and concise — clear and direct, not wordy or marketing-style. Lead with what was built, not how. Avoid dashes, em-dashes, or clever wordplay.
The summary should mention the specific techniques used — not just "built a component with HTML and CSS."

## Step 5 — Update notes/

Read the existing notes files at `/Users/safwaan/Developer/learn/gfe-projects/notes/`:
- `css-layout.md`
- `css-box-model.md`
- `css-typography.md`
- `css-properties.md`
- `html-semantics.md`
- `javascript-dom.md`
- `accessibility.md`
- `techniques/` subfolder

For each new concept used in this project that is not already covered in the relevant file, add it. Rules:
- Update existing sections rather than duplicating
- Add a new file only if the concept genuinely doesn't fit any existing file
- Keep entries concise — code snippet + one-line explanation
- If a concept was learned but not yet understood hands-on (coach-added), mark it with `(GAP AREA — not yet learned hands-on)`
- Update the file list in `CLAUDE.md` if a new notes file was created

## Step 6 — Update root index.html

Read `/Users/safwaan/Developer/learn/gfe-projects/index.html`.

Find the stub card for this project (added by `/start-project`). It will have a placeholder description. Replace the placeholder `<p>` with a real one-liner description of what was built.

If no stub exists (the card is missing entirely), add a full card entry.

## Step 7 — Update memory/learning_progress.md

Read `/Users/safwaan/.claude/projects/-Users-safwaan-Developer-learn-gfe-projects/memory/learning_progress.md`.

Update it with this project:

1. **Completed Projects table** — add a new row with: project name, key concepts used, and the single most notable gain from this session.
2. **Mastered Concepts** — add any concepts from this project that are now solid and shouldn't need re-teaching.
3. **Persistent Gaps** — update any existing gaps that improved, worsened, or are newly confirmed. Add new ones if this project revealed a gap not already listed.
4. **Carry-forward Questions** — add the unresolved questions from this project's LEARNINGS.md under a new "From [project-name]:" heading.
5. **Current State** — update the "Next project", "Overall trajectory", and "Interview readiness" lines to reflect where things stand now.

Do not rewrite the whole file — surgically update each section.

## Step 8 — Summary

Report what was done:
- ✓ or ✗ for each file: `LEARNINGS.md`, `submission.md`
- Title character count and summary character count
- Which `notes/` files were updated and what was added
- ✓ or ✗ for `index.html` card description
- ✓ or ✗ for `memory/learning_progress.md`
- Any gaps flagged as unlearned

Then ask: "Anything you want to add or change before we commit?"
