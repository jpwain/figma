const TOOL_ID = 'f721ea5e-dd35-4514-ba83-b8121b61ec79'
const DISPLAY_NAME = 'MultiPaste'

figma.root.setRelaunchData({ [TOOL_ID]: DISPLAY_NAME })

figma.showUI(__html__, { width: 280, height: 360, themeColors: true })

function getTextNodes(): TextNode[] {
  return figma.currentPage.selection
    .filter((node): node is TextNode => node.type === 'TEXT')
}

function sendSelectionUpdate(): void {
  figma.ui.postMessage({ type: 'selection', count: getTextNodes().length })
}

figma.on('selectionchange', sendSelectionUpdate)

async function loadNodeFont(node: TextNode): Promise<FontName> {
  const font = node.characters.length > 0
    ? node.getRangeFontName(0, 1)
    : node.fontName
  if (font === figma.mixed) {
    throw new Error('Cannot determine the font for "' + node.name + '"')
  }
  await figma.loadFontAsync(font)
  return font
}

async function handlePaste(text: string, loop: boolean): Promise<void> {
  const lines = text.split('\n').filter((line: string) => line.trim().length > 0)
  const textNodes = getTextNodes()

  if (textNodes.length === 0) {
    figma.notify('No text layers selected')
    figma.ui.postMessage({ type: 'paste-done' })
    return
  }
  if (lines.length === 0) {
    figma.notify('No text to paste')
    figma.ui.postMessage({ type: 'paste-done' })
    return
  }

  const count = loop ? textNodes.length : Math.min(lines.length, textNodes.length)
  // Load every destination font before changing any layers.
  const fonts = await Promise.all(textNodes.slice(0, count).map(loadNodeFont))

  for (let i = 0; i < count; i++) {
    textNodes[i].fontName = fonts[i]
    textNodes[i].characters = lines[i % lines.length]
  }

  figma.notify('Pasted into ' + count + ' layer' + (count === 1 ? '' : 's'))
  figma.ui.postMessage({ type: 'paste-done' })
}

figma.ui.onmessage = (msg: { type: string; text?: string; loop?: boolean; height?: number }) => {
  if (msg.type === 'ready') {
    sendSelectionUpdate()
    return
  }

  if (msg.type === 'resize') {
    figma.ui.resize(280, Math.max(48, Math.min(900, Math.round(msg.height ?? 360))))
    return
  }

  if (msg.type === 'paste') {
    handlePaste(msg.text ?? '', msg.loop === true).catch((err: Error) => {
      figma.notify('Error: ' + err.message)
      figma.ui.postMessage({ type: 'paste-done' })
    })
  }
}
