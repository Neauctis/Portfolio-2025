<script setup lang="ts">
import { computed, ref } from 'vue'

const { title, undertitle, startdate, enddate, address, content } = defineProps({
  title: { type: String, required: true },
  undertitle: { type: String, required: false },
  startdate: { type: String, required: true },
  enddate: { type: String, required: true },
  address: { type: String, required: false },
  content: { type: String, required: true },
})

const isExpanded = ref(false)
const animationInProgress = ref(false)

function toggleExpand() {
  if (animationInProgress.value)
    return
  animationInProgress.value = true
  isExpanded.value = !isExpanded.value
  setTimeout(() => animationInProgress.value = false, 300)
}

const formattedDuration = computed(() => {
  const start = new Date(startdate)
  const end = new Date(enddate)
  const duration = Math.abs(end.getFullYear() - start.getFullYear())
  return `${duration} years`
})
</script>

<template>
  <div
    class="timeline-container"
  >
    <div class="timeline-dot" />
    <div class="timeline-header" @click="toggleExpand">
      <div class="timeline-grid">
        <div class="grid-main">
          <div class="title-area">
            <p class="timeline-title">
              {{ title }}
            </p>
            <p v-if="undertitle" class="timeline-undertitle">
              {{ undertitle }}
            </p>
          </div>
          <div class="details-area">
            <div class="timeline-period">
              <p class="date-chip">
                {{ startdate }}
              </p>
              <span class="date-separator">→</span>
              <p class="date-chip">
                {{ enddate }}
              </p>
              <p class="duration-badge">
                {{ formattedDuration }}
              </p>
            </div>
            <div v-if="address" class="timeline-address">
              <span class="location-icon" />
              <p>{{ address }}</p>
            </div>
          </div>
        </div>
        <button class="toggle-area">
          <div class="toggle-button" prose-link :class="{ expanded: isExpanded }">
            <span class="toggle-icon" />
          </div>
        </button>
      </div>
    </div>
    <transition name="expand">
      <div v-if="isExpanded" class="timeline-content">
        <div class="content-inner" v-html="content" />
        <slot />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.timeline-container {
  position: relative;
  padding: 24px 24px 24px 36px;
  margin: 32px 0;
  border-radius: 12px;
  border-width: 1px;
  border-style: solid;
  background: transparent;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-color: #333333;
  border-left: 4px solid #333333;
  html.dark & {
    border-color: #ffffff;
    border-left: 4px solid #ffffff;
  }
  height: fit-content;
  isolation: isolate;
  transform-style: preserve-3d;
  position: relative;
  z-index: 1;
}

.timeline-container:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.timeline-dot {
  position: absolute;
  left: -12px;
  top: 30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #333333;
  html.dark & {
    background-color: #ffffff;
  }
  border: 4px solid var(--bg-main, #ffffff);
  box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
  z-index: 2;
}

.timeline-header {
  cursor: pointer;
  position: relative;
}

.timeline-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  width: 100%;
  align-items: start;
}

.grid-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title-area {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.details-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
  color: inherit;
  color: #333333;
  html.dark & {
    color: #ffffff;
  }
}

.timeline-undertitle {
  font-size: 1.05rem;
  font-weight: 500;
  margin: 0;
  line-height: 1.3;
  color: #333333;
  html.dark & {
    color: #ffffff;
  }
}

.timeline-period {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.date-chip {
  border: 1px solid;
  border-color: #333333;
  html.dark & {
    border-color: #ffffff;
  }
  color: #333333;
  html.dark & {
    color: #ffffff;
  }
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  margin: 0;
  font-weight: 600;
  white-space: nowrap;
}

.date-separator {
  color: #95a5a6;
  font-size: 0.9rem;
}

.duration-badge {
  border: 1px solid;
  border-color: #333333;
  html.dark & {
    border-color: #ffffff;
  }
  color: #333333;
  html.dark & {
    color: #ffffff;
  }
  padding: 4px 12px;
  margin: 0;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.timeline-address {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  margin-top: 2px;
}

.location-icon {
  font-size: 1.1rem;
  display: inline-block;
  width: 18px;
  height: 18px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%235c6a7a"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.toggle-area {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.toggle-icon {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-right: 2px solid #333333;
  border-bottom: 2px solid #333333;
  html.dark & {
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
  }
  transform: rotate(45deg);
  transition: transform 0.3s ease;
  position: relative;
  top: -2px;
}

.toggle-button.expanded .toggle-icon {
  transform: rotate(225deg);
  top: 2px;
}

.timeline-content {
  padding-top: 18px;
  margin-top: 16px;
  border-top: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  .dark & {
    border-color: rgba(255, 255, 255, 0.1);
  }
  line-height: 1.6;
  font-size: 0.95rem;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

@media (max-width: 768px) {
  .timeline-container {
    padding: 20px 20px 20px 28px;
  }

  .timeline-grid {
    grid-template-columns: 1fr auto;
  }

  .grid-main {
    gap: 16px;
  }

  .timeline-period {
    gap: 6px;
  }

  .date-chip {
    padding: 3px 10px;
    font-size: 0.8rem;
  }

  .duration-badge {
    padding: 3px 10px;
    font-size: 0.75rem;
  }

  .timeline-title {
    font-size: 1.2rem;
  }

  .timeline-undertitle {
    font-size: 0.95rem;
  }

  .timeline-dot {
    width: 16px;
    height: 16px;
    left: -10px;
    top: 28px;
  }
}

@media (max-width: 480px) {
  .timeline-container {
    padding: 16px 16px 16px 24px;
    margin: 24px 0;
  }

  .timeline-dot {
    width: 16px;
    height: 16px;
    left: -10px;
    top: 24px;
  }

  .timeline-grid {
    gap: 12px;
  }

  .timeline-period {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .date-separator {
    display: none;
  }

  .toggle-button {
    width: 32px;
    height: 32px;
  }
}

.content-inner {
  padding-top: 16px;
  line-height: 1.75;
  font-size: 1rem;
}

.content-inner :deep(p) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.content-inner :deep(strong) {
  font-weight: 600;
  color: inherit;
}

.content-inner :deep(ul) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 20px;
}

.content-inner :deep(li) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>
