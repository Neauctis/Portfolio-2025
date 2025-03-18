export function initCursorEffect() {
  // Vérification si l'appareil est mobile ou tactile
  if (window.matchMedia('(max-width: 768px), (pointer: coarse)').matches) {
    return
  }

  const cursor = document.createElement('div')
  const ring = document.createElement('div')

  cursor.className = 'custom-cursor'
  ring.className = 'cursor-ring'

  document.body.appendChild(cursor)
  document.body.appendChild(ring)

  const trails: HTMLDivElement[] = []
  const MAX_TRAILS = 8

  const createTrail = (x: number, y: number) => {
    const trail = document.createElement('div')
    trail.className = 'cursor-trail'
    trail.style.left = `${x}px`
    trail.style.top = `${y}px`

    const size = Math.random() * 4 + 2 // Augmentation de la taille
    trail.style.width = `${size}px`
    trail.style.height = `${size}px`

    document.body.appendChild(trail)
    trails.push(trail)

    if (trails.length > MAX_TRAILS) {
      const oldTrail = trails.shift()
      oldTrail?.remove()
    }

    setTimeout(() => trail.remove(), 400) // Réduction du temps
  }

  let lastTrailTime = 0
  const TRAIL_INTERVAL = 50 // Intervalle entre chaque point de traînée

  let ringX = 0
  let ringY = 0
  let targetX = 0
  let targetY = 0

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  const animateRing = () => {
    ringX = lerp(ringX, targetX, 0.15)
    ringY = lerp(ringY, targetY, 0.15)

    ring.style.left = `${ringX}px`
    ring.style.top = `${ringY}px`

    requestAnimationFrame(animateRing)
  }

  const moveCursor = (e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY

    const currentTime = Date.now()
    if (currentTime - lastTrailTime > TRAIL_INTERVAL) {
      createTrail(x, y)
      lastTrailTime = currentTime
    }

    cursor.style.left = `${x}px`
    cursor.style.top = `${y}px`

    targetX = x
    targetY = y
  }

  const handleMouseDown = () => {
    cursor.classList.add('cursor-click')
    ring.classList.add('cursor-click')

    // Animation plus longue et suppression plus douce
    setTimeout(() => {
      cursor.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      ring.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      cursor.classList.remove('cursor-click')
      ring.classList.remove('cursor-click')

      // Réinitialisation des transitions après l'animation
      setTimeout(() => {
        cursor.style.transition = ''
        ring.style.transition = ''
      }, 300)
    }, 400)

    document.dispatchEvent(new CustomEvent('cursor-click', {
      detail: { x: Number.parseFloat(cursor.style.left), y: Number.parseFloat(cursor.style.top) },
    }))
  }

  const handleMouseUp = () => {
    // Suppression car plus nécessaire
  }

  // Hover effect for interactive elements
  const handleElementHover = () => {
    cursor.classList.add('cursor-hover')
    ring.classList.add('ring-hover')
  }

  const handleElementLeave = () => {
    cursor.classList.remove('cursor-hover')
    ring.classList.remove('ring-hover')
  }

  // Add hover effects to interactive elements
  document.querySelectorAll('a, button, input, [role="button"], .interactive').forEach((el) => {
    el.addEventListener('mouseenter', handleElementHover)
    el.addEventListener('mouseleave', handleElementLeave)
  })

  window.addEventListener('mousemove', moveCursor)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)

  // Démarrer l'animation
  animateRing()

  return () => {
    window.removeEventListener('mousemove', moveCursor)
    window.removeEventListener('mousedown', handleMouseDown)
    window.removeEventListener('mouseup', handleMouseUp)
    cursor.remove()
    ring.remove()
    document.querySelectorAll('.cursor-trail').forEach(el => el.remove())
    trails.forEach(trail => trail.remove())
  }
}
