# MultiPaste

Plugin identity:
- displayName: MultiPaste
- description: Paste lines of text into multiple selected text layers at once

Agent prompt:
A plugin called MultiPaste that takes the contents of a textarea, and pastes each line (separated by line breaks) into the selected text items, such that if i have 5 lines of text as input, and 5 selected text objects on the canvas, and I click the "Paste into 5 items" button, first text object gets line 1 as its contents, second text object gets line 2 as its contents, etc, satisfying all the selected text objects.

Usage:
- Textarea for multi-line input
- Button shows count of selected text layers, e.g. "Paste into 5 items"
- Lines are matched to text layers in selection order
- Button disabled when no text layers selected or textarea empty

## Community listing

Tagline:
The easiest way to paste lines of text into multiple layers

Description:
Select any number of text layers, and paste into them line by line. Optionally, loop through available lines.

Tags:
- `text layers`
- `paste`
- `multiple`
- `text`
