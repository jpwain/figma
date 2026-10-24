# Changelog

All notable changes to MultiPaste are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-10-24

First public release on the Figma Community.

### Added

- Paste nonblank lines of text into directly selected text layers in Figma's selection order.
- Optionally loop through the input lines to fill every selected text layer.
- Show input-line and selected-layer counts in the footer, including whether looping is enabled.
- Apply the first character's font to each layer's replacement text; empty layers keep their assigned font.
- Support Figma's light and dark themes, a resizable textarea, and selection/input validation.

[Unreleased]: https://github.com/jpwain/figma/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/jpwain/figma/releases/tag/v1.0.0
