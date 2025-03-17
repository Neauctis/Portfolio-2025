export function initDotAnimation() {
  const container = document.querySelector('.dot-container')
  if (!container)
    return

  const handleMouseMove = (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.05
    const moveY = (e.clientY - window.innerHeight / 2) * 0.05
    container.style.transform = `translate(${moveX}px, ${moveY}px)`
  }

  const handleScroll = () => {
    const scrollY = window.scrollY * 0.15
    container.style.transform = `translateY(${scrollY}px)`
  }

  document.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll)

  return () => {
    document.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('scroll', handleScroll)
  }
}
