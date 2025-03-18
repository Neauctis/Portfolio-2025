<script lang="ts" setup>
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const navLinks = siteConfig.header.navLinks || []

const socialLinks = computed(() => {
  return siteConfig.socialLinks.filter((link: Record<string, any>) => {
    if (link.header && typeof link.header === 'boolean') {
      return link
    }
    else if (link.header && typeof link.header === 'string') {
      link.icon = link.header.includes('i-') ? link.header : link.icon
      return link
    }
    else {
      return false
    }
  })
})

const { y: scroll } = useWindowScroll()

const oldScroll = ref(unref(scroll))

onMounted(() => {
  const navMask = document.querySelector('.nav-drawer-mask') as HTMLElement

  navMask?.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  const headerEl = document.querySelector('#header') as HTMLElement
  if (!headerEl)
    return

  if (document.documentElement.scrollTop > 100)
    headerEl.classList.add('header-bg-blur')

  window.addEventListener('scroll', () => {
    if (scroll.value < 150) {
      headerEl.classList.remove('header-hide')
      return
    }

    if (scroll.value - oldScroll.value > 150) {
      headerEl.classList.add('header-hide')
      oldScroll.value = scroll.value
    }

    if (oldScroll.value - scroll.value > 150) {
      headerEl.classList.remove('header-hide')
      oldScroll.value = scroll.value
    }
  })
})

function toggleNavDrawer() {
  const drawer = document.querySelector('.nav-drawer') as HTMLElement
  const mask = document.querySelector('.nav-drawer-mask') as HTMLElement
  if (!drawer || !mask)
    return
  if (drawer.style.transform === `translateX(0%)`) {
    drawer.style.transform = `translateX(-100%)`
    mask.style.display = `none`
  }
  else {
    drawer.style.transform = `translateX(0%)`
    mask.style.display = `block`
  }
}
</script>

<template>
  <header
    id="header" :class="{ 'header-bg-blur': scroll > 20 }"
    class="!fixed bg-transparent z-899 w-screen h-16 sm:h-20 px-3 sm:px-6 flex justify-between items-center relative"
  >
    <div class="flex items-center h-full">
      <h1 class="text-title mr-4 sm:mr-2xl text-xl sm:text-2xl md:text-4xl">
        Portfolio
      </h1>
      <nav class="sm:flex hidden flex-wrap gap-x-3 md:gap-x-6 position-initial flex-row">
        <a
          v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
          nav-link :href="link.href"
          class="text-sm md:text-base"
        >
          {{ link.text }}
        </a>
      </nav>
      <div sm:hidden h-full flex items-center class="ml-2" @click="toggleNavDrawer()">
        <menu i-ri-menu-2-fill class="text-xl" />
      </div>
    </div>
    <div class="flex gap-x-3 sm:gap-x-6">
      <a
        v-for="link in socialLinks" :key="link.text" :aria-label="`${link.text}`" :class="link.icon" nav-link
        :target="getLinkTarget(link.href)" :href="link.href"
        class="text-lg sm:text-xl"
      />

      <a nav-link target="_blank" href="/rss.xml" i-ri-rss-line aria-label="RSS" class="text-lg sm:text-xl" />
      <ThemeToggle />
    </div>
  </header>
  <nav class="nav-drawer sm:hidden">
    <div class="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
      <h2 class="text-xl font-bold">
        Menu
      </h2>
      <i i-ri-close-line class="text-2xl cursor-pointer" @click="toggleNavDrawer()" />
    </div>
    <div class="flex flex-col gap-2">
      <a
        v-for="link in navLinks"
        :key="link.text"
        :aria-label="`${link.text}`"
        :target="getLinkTarget(link.href)"
        nav-link
        :href="link.href"
        class="py-3 text-base border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded transition-colors"
        @click="toggleNavDrawer()"
      >
        {{ link.text }}
      </a>
    </div>
  </nav>
  <div class="nav-drawer-mask" @click="toggleNavDrawer()" />
</template>

<style scoped>
.header-hide {
  transform: translateY(-100%);
  transition: transform 0.4s ease;
}

.header-bg-blur {
  --at-apply: backdrop-blur-sm bg-main bg-op-80;
}

.nav-drawer {
  transform: translateX(-100%);
  position: fixed;
  height: 100vh;
  z-index: 999;
  left: 0;
  top: 0;
  width: 75vw;
  padding: 24px;
  transition: all 0.3s ease;
  background: var(--bg-main);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #333333;
  isolation: isolate;
  transform-style: preserve-3d;
  background: var(--bg-main);
  border-color: #333333;
  color: #333333;

  html.dark & {
    background: var(--bg-main);
    border-color: #ffffff;
    color: #ffffff;
  }
}

.nav-drawer .text-xl {
  color: #333333;

  html.dark & {
    color: #ffffff;
  }
}

.nav-drawer a {
  display: block;
  width: 100%;
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 12px;
  border: 1px solid #333333;
  transition: all 0.3s ease;
  background: transparent;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  color: #333333;
  border: 1px solid #333333;

  html.dark & {
    color: #ffffff;
    border-color: #ffffff;
    background: transparent;
  }
}

.nav-drawer a:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  background: rgba(51, 51, 51, 0.05);

  html.dark & {
    background: rgba(255, 255, 255, 0.05);
  }
}

.nav-drawer-mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 998;
  transition: all 0.3s ease;
  background: rgba(51, 51, 51, 0.4);

  html.dark & {
    background: rgba(0, 0, 0, 0.4);
  }
}

[nav-link] {
  position: relative;
  z-index: 1000;
  color: #333333;

  html.dark & {
    color: #ffffff;
  }
}
</style>
