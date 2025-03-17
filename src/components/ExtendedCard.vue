<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  title: { type: String, required: true },
  content: { type: String, required: true },
  color: { type: String, default: '#3498db' },
  icon: { type: String, required: false },
})

const isExpanded = ref(false)
const toggleExpand = () => isExpanded.value = !isExpanded.value
</script>

<template>
  <div class="timeline-style-card" :class="{ 'is-expanded': isExpanded }" :style="{ '--card-color': color }">
    <div class="card-dot" />
    <div class="card-header" @click="toggleExpand">
      <div class="header-content">
        <i v-if="icon" :class="icon" class="card-icon" />
        <h3 class="card-title">
          {{ title }}
        </h3>
        <div class="toggle-button" :class="{ expanded: isExpanded }">
          <span class="toggle-icon" />
        </div>
      </div>
    </div>
    <transition name="expand">
      <div v-if="isExpanded" class="card-content">
        <div class="content-inner" v-html="content" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.timeline-style-card {
  position: relative;
  padding: 24px 24px 24px 36px;
  margin: 32px 0;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: rgba(219, 219, 219, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid var(--card-color);
  height: fit-content;
  isolation: isolate;
  transform-style: preserve-3d;
  position: relative;
  z-index: 1;
}

.timeline-style-card:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.is-expanded {
  z-index: 2;
}

.card-dot {
  position: absolute;
  left: -12px;
  top: 30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--card-color);
  border: 4px solid #ffffff;
  box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.card-icon {
  font-size: 1.5rem;
  color: var(--color, #3498db);
}

.card-title {
  flex-grow: 1;
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.3;
  color: inherit;
  opacity: 0.9;
}

.toggle-button {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-icon {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-right: 2px solid #666;
  border-bottom: 2px solid #666;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
  position: relative;
  top: -2px;
}

.toggle-button.expanded .toggle-icon {
  transform: rotate(225deg);
  top: 2px;
}

.card-content {
  overflow: hidden;
  transition: all 0.3s ease;
}

.content-inner {
  padding-top: 16px;
  line-height: 1.75;
  font-size: 1rem;
}

.content-inner :deep(ul) {
  padding-left: 20px;
  margin: 0;
}

.content-inner :deep(li) {
  margin-bottom: 12px;
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
</style>
