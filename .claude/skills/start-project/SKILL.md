---
name: start-project
description: Initialize a new GFE project. Creates project-brief.md, techniques.md, design-notes.md, and adds a stub card to root index.html. Invoke manually at the start of every new project.
disable-model-invocation: true
argument-hint: [project-folder-path]
allowed-tools: Read Write Edit Bash WebFetch mcp__figma-bridge__get_metadata mcp__figma-bridge__get_design_context mcp__figma-bridge__get_screenshot
---

You are initializing a new GFE project. Follow these steps in order. Do not skip any step. Do not proceed to the next step until the current one is complete.

## Step 1 — Project path

If $ARGUMENTS is provided, use it as the project path. Otherwise ask:
> "What is the project folder path? (e.g. `design-system/text-input-component`)"

Once you have the path:
- Resolve it relative to `/Users/safwaan/Developer/learn/gfe-projects/`
- Check if the folder exists with `ls`. Note any existing files (index.html, css/, js/, README.md, etc.) — this is the GFE starter code.
- If the folder does not exist, create it with `mkdir -p`.
- Report back: "Found existing files: [list]" or "Folder is empty / created fresh."

## Step 2 — GFE brief URL

Ask:
> "Paste the GFE challenge URL (e.g. https://www.greatfrontend.com/projects/challenges/text-input-component)"

Use WebFetch to fetch whatever is publicly readable from that URL. Extract: project title, description, implementation requirements, component properties, states, and any other requirements mentioned.

Tell the user: "I fetched what was publicly available. Now I need the full content from the GFE page since some sections require login."

## Step 3 — Paste brief content

Ask the user to copy and paste the following from the GFE page, one at a time:

1. **Project Brief** — the "Project brief" section text. Ask: "Paste the Project Brief text from GFE:"
2. **Challenge Guide** — the guide/walkthrough content. Ask: "Paste the Challenge Guide text from GFE (the hints on tricky parts):"
3. **Relevant Techniques** — any technique articles linked. Ask: "Paste any Relevant Techniques content from GFE (or type 'none' to skip):"

After collecting all three, create `project-brief.md` inside the project folder with this exact structure:

```
# Project Brief — [Project Title]

## Original Brief
[paste the brief text verbatim, formatted as markdown]

## Challenge Guide
> GFE's hints on the tricky parts of this challenge.
[paste the guide content verbatim, formatted as markdown]

## Implementation Checklist
[generate a concise checklist of what "done" looks like, derived from the brief and guide]
```

## Step 4 — Techniques

If the user provided technique content in Step 3:
- Check if a matching file already exists in `notes/techniques/`. If it does, do not duplicate it.
- If it is a new technique, create `notes/techniques/[technique-name].md` with the content, adding `> Source: GFE — first used in: [project-folder-name]` at the top.
- Update `notes/techniques/` list in `CLAUDE.md` if a new file was created.

Create `techniques.md` inside the project folder:

```
# Techniques — [Project Title]

> Relevant techniques suggested by GFE for this challenge.

- [Technique name] → `notes/techniques/[filename].md`
```

If no techniques were provided, create the file with a placeholder: `- None provided yet.`

## Step 5 — Figma design notes

Check if the Figma MCP is connected by calling `mcp__figma-bridge__get_metadata`. 

If connected:
- Call `mcp__figma-bridge__get_design_context` with depth 1 first.
- If the result exceeds token limits and is saved to a file, use Bash with Python to parse it: extract colors, typography, spacing, effects, and component states by searching the JSON for relevant keys (fills, strokes, effects, fontSize, padding, gap, cornerRadius).
- Go deeper (depth 2+) only for specific nodes that need more detail.
- Extract: all colors with their usage context, typography (font sizes, weights, line heights), spacing values (padding, gap, border-radius), component states and their visual differences (border colors, fill colors, box-shadow effects), and variants.
- Create `design-notes.md` inside the project folder with this structure:

```
# Design Notes — [Project Title]

> Extracted from Figma. Use this as the source of truth for colors, spacing, and states during implementation.

## Colors
[list all colors with their usage context]

## Typography
[font sizes, weights, line heights per element]

## Spacing & Dimensions
[padding, gap, border-radius, heights, widths]

## Component States
[for each state: what visually changes — border, fill, shadow, text color]

## Variants
[list variants and how they differ structurally]
```

If Figma MCP is not connected:
- Create `design-notes.md` with a note: `> Figma MCP was not connected at project init. Run /start-project again with Figma open to populate this file.`
- Tell the user: "Figma wasn't connected. Open the Figma file and run `/start-project` again, or I can read it now if you connect the plugin."

## Step 6 — Update root index.html

Read `/Users/safwaan/Developer/learn/gfe-projects/index.html` first. Check if a card for this project already exists by looking for the project path in any `href` attribute. If a card already exists, skip this step entirely.

If no card exists, add a stub after the last existing `<a class="project-card">` entry:

```html
<a href="./[project-path]/index.html" class="project-card">
  <h2>[Project Title]</h2>
  <p>[One-line description — fill in after project is complete]</p>
</a>
```

## Step 7 — Summary

Report a summary of everything created:
- ✓ or ✗ for each file: `project-brief.md`, `techniques.md`, `design-notes.md`
- ✓ or ✗ for root `index.html` stub
- Any new files added to `notes/techniques/`
- Reminder: "Fill in the project card description in index.html when the project is done."

Then say: "Project initialized. Ready to start building."
