interface AsciiCell {
  element: HTMLSpanElement
  x: number
  y: number
  glyph: string
}

const GLYPHS = ' .:-=+*#%@'

export function initAsciiField() {
  const field = document.querySelector<HTMLElement>('.ascii-field')
  const grid = field?.querySelector<HTMLPreElement>('pre')
  if (!field || !grid)
    return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let cells: AsciiCell[] = []
  let animationFrame = 0
  let lastFrame = 0

  function buildGrid() {
    const columns = Math.min(100, Math.ceil(window.innerWidth / 18))
    const rows = Math.min(40, Math.ceil(window.innerHeight / 26))
    const fragment = document.createDocumentFragment()

    grid.style.setProperty('--ascii-columns', String(columns))
    cells = []

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const element = document.createElement('span')
        element.setAttribute('aria-hidden', 'true')
        fragment.append(element)
        cells.push({ element, x, y, glyph: '' })
      }
    }

    grid.replaceChildren(fragment)
  }

  function draw(time: number) {
    if (time - lastFrame < 90 && !reducedMotion) {
      animationFrame = requestAnimationFrame(draw)
      return
    }
    lastFrame = time
    const phase = reducedMotion ? 0 : time * 0.00045

    for (const cell of cells) {
      const { x, y, element } = cell
      const wave = (
        Math.sin(x * 0.18 + phase)
        + Math.cos(y * 0.29 - phase * 0.72)
        + Math.sin((x + y) * 0.12 + phase * 0.55)
      ) / 3
      const intensity = (wave + 1) / 2
      const glyphIndex = Math.min(GLYPHS.length - 1, Math.floor(intensity * GLYPHS.length))
      const glyph = intensity < 0.38 ? ' ' : GLYPHS[glyphIndex]

      if (cell.glyph !== glyph) {
        element.textContent = glyph
        cell.glyph = glyph
      }
      element.style.opacity = glyph === ' ' ? '0' : String(0.18 + intensity * 0.7)
    }

    if (!reducedMotion)
      animationFrame = requestAnimationFrame(draw)
  }

  buildGrid()
  draw(0)
  if (!reducedMotion)
    window.addEventListener('resize', buildGrid)

  return () => {
    cancelAnimationFrame(animationFrame)
    window.removeEventListener('resize', buildGrid)
    grid.replaceChildren()
  }
}
