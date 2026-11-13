export function initStarField() {
  const container = document.querySelector('.starfield')
  if (!container)
    return

  const STAR_COUNT = { tiny: 30, small: 20, medium: 10, large: 5 }
  const stars = []
  let rafId
  let mouseX = 0
  let scrollY = 0
  let clickPoint = null

  function createStar(size) {
    const star = document.createElement('div')
    star.className = `star star-${size}`
    star.dataset.speed = size === 'tiny'
      ? 0.4
      : size === 'small'
        ? 0.6
        : size === 'medium' ? 0.8 : 1.0
    star.dataset.velX = '0'
    star.dataset.velY = '0'
    return star
  }

  function distributeStars() {
    Object.entries(STAR_COUNT).forEach(([size, count]) => {
      for (let i = 0; i < count; i++) {
        const star = createStar(size)
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        stars.push(star)
      }
    })
    container.append(...stars)
  }

  function createNebulas() {
    const nebulas = []
    const NEBULA_COUNT = 2 // Réduit à 2 nébuleuses

    for (let i = 0; i < NEBULA_COUNT; i++) {
      const nebula = document.createElement('div')
      nebula.className = 'nebula'

      // Tailles plus petites
      const size = 200 + Math.random() * 200
      nebula.style.width = `${size}px`
      nebula.style.height = `${size}px`

      nebula.style.left = `${(i * 40 + Math.random() * 30)}%`
      nebula.style.top = `${30 + Math.random() * 40}%`

      nebula.dataset.baseX = nebula.style.left
      nebula.dataset.baseY = nebula.style.top

      container.appendChild(nebula)
      nebulas.push(nebula)
    }
    return nebulas
  }

  const nebulas = createNebulas()

  function animate() {
    const time = Date.now() * 0.001

    // Animation des nébuleuses optimisée (moins fréquente)
    if (time % 4 < 0.1) { // Mise à jour toutes les 4 secondes
      nebulas.forEach((nebula) => {
        const x = Math.sin(time * 0.05) * 5 // Mouvement plus lent
        const y = Math.cos(time * 0.05) * 5

        // Animation simplifiée
        nebula.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })
    }

    stars.forEach((star) => {
      const speed = Number(star.dataset.speed)
      const rect = star.getBoundingClientRect()

      // Mouvement naturel des étoiles avec plus d'amplitude et de vitesse
      const naturalX = Math.sin(time * 0.8 + Number.parseInt(star.dataset.speed * 100)) * 8
      const naturalY = Math.cos(time * 0.6 + Number.parseInt(star.dataset.speed * 100)) * 8

      if (clickPoint) {
        const dx = rect.left - clickPoint.x
        const dy = rect.top - clickPoint.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        // Réduire maxDistance pour que l'onde soit visible plus longtemps
        const maxDistance = Math.max(window.innerWidth, window.innerHeight) * 0.8
        const normalizedDistance = distance / maxDistance

        const timeSinceClick = Date.now() - clickPoint.time
        // Ajuster la vitesse et l'amplitude de l'onde
        const wave = Math.sin(timeSinceClick * 0.003 - normalizedDistance * 5)
        const waveIntensity = Math.max(0, 1 - (normalizedDistance * 0.8))

        // Ajuster la force de répulsion
        const repulsionForce = Math.max(0, 1 - (normalizedDistance * 0.8))
        const repulsionX = (dx / distance || 0) * repulsionForce * 30
        const repulsionY = (dy / distance || 0) * repulsionForce * 30

        const x = mouseX * speed * 0.3 + naturalX + repulsionX
        const y = scrollY * speed * 0.2 + naturalY + repulsionY
        const scale = 1 + wave * waveIntensity * 0.8

        star.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        star.style.opacity = 1 + wave * waveIntensity * 0.3
      }
      else {
        const x = mouseX * speed * 0.3 + naturalX
        const y = scrollY * speed * 0.2 + naturalY
        star.style.transform = `translate3d(${x}px, ${y}px, 0)`
        star.style.opacity = 1
      }
    })

    rafId = requestAnimationFrame(animate)
  }

  const handleClick = (e) => {
    clickPoint = { x: e.clientX, y: e.clientY, time: Date.now() }
    container.classList.add('energized')

    setTimeout(() => {
      clickPoint = null
      container.classList.remove('energized')
    }, 2000)
  }

  distributeStars()
  animate()

  document.addEventListener('mousemove', e => mouseX = (e.clientX - window.innerWidth / 2) * 0.1)
  document.addEventListener('scroll', () => scrollY = window.scrollY * 0.2)
  document.addEventListener('click', handleClick)

  return () => {
    cancelAnimationFrame(rafId)
    container.innerHTML = ''
    stars.length = 0
    nebulas.length = 0
  }
}
