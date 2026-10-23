# MultiPaste

Paste nonblank lines into directly selected Figma text layers, in Figma's selection order. Enable **Loop pasting** to repeat the lines across all selected text layers. Each layer uses its first character's font; empty layers keep their assigned font.

## Build and import

Requires Node.js, npm, and the Figma desktop app. No MCP connection is needed.

```sh
npm ci
npm run build
```

In a Figma Design file, choose **Plugins → Development → Import plugin from manifest**, then select this folder's `manifest.json`. Run **MultiPaste** from the Development menu.

The build compiles `code.ts` to `code.js`, which the manifest loads. The UI is plain HTML and JavaScript in `ui.html`, with Figma's light/dark theme colors.

## Develop

```sh
npm run watch
```

TypeScript changes rebuild automatically. After saving changes to the code or UI, close and reopen the plugin in Figma. Run `npm run typecheck` to check the TypeScript without emitting JavaScript.

## Quick test

1. Select three text layers and paste two lines separated by a blank line. With looping off, only the first two layers should change; the status should show **2 of 3 layers**.
2. Enable looping and paste again. The three layers should receive line 1, line 2, then line 1.
3. Include a layer with mixed fonts. Its pasted text should use the original first character's font throughout.
4. Click Paste once and confirm one success notification. An empty selection or blank-only input should disable Paste.
