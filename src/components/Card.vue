<script setup lang="ts">
defineProps({
  title: { type: String, required: false },
  content: { type: String, required: true },
  icon: { type: String, required: false },
})
</script>

<template>
  <div class="timeline-style-card">
    <div class="card-dot" />
    <div class="card-header">
      <div class="header-content">
        <i v-if="icon" :class="icon" class="card-icon" />
        <p class="card-title">
          {{ title }}
        </p>
      </div>
    </div>
    <div class="content-inner" v-html="content" />
  </div>
</template>

<style scoped>
.timeline-style-card {
  position: relative;
  padding: 24px 24px 24px 36px;
  margin: 32px 0;
  border-radius: 12px;
  border: 1px solid;
  border-color: #333333;
  html.dark & {
    border-color: #ffffff;
    border-left: 4px solid #ffffff;
  }
  background: transparent;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid #333333;
  height: fit-content;
  isolation: isolate;
  transform-style: preserve-3d;
  position: relative;
  z-index: 1;
}

.timeline-style-card {
  border-color: #333333;
  html.dark & {
    border-color: #ffffff;
  }
}

.timeline-style-card:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-dot {
  position: absolute;
  left: -12px;
  top: 30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #333333;
  border: 4px solid var(--bg-main, #ffffff);
  box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
  html.dark & {
    background-color: #ffffff;
  }
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-icon {
  font-size: 1.5rem;
  color: #333333;
  html.dark & {
    color: #ffffff;
  }
}

.card-title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.3;
  color: inherit;
  color: #333333;
  html.dark & {
    color: #ffffff;
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
