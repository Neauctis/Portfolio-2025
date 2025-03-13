<script>
export default {
  name: 'Timeline',
  props: {
    title: {
      type: String,
      required: true,
    },
    undertitle: {
      type: String,
      required: false,
    },
    startdate: {
      type: String,
      required: true,
    },
    enddate: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#3498db',
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isExpanded: this.expanded,
      animationInProgress: false,
    }
  },
  computed: {
    timelineStyle() {
      return {
        '--timeline-color': this.color,
      }
    },
    formattedDuration() {
      return this.getDuration()
    },
  },
  methods: {
    toggleExpand() {
      if (this.animationInProgress)
        return

      this.animationInProgress = true
      this.isExpanded = !this.isExpanded

      setTimeout(() => {
        this.animationInProgress = false
      }, 300)
    },
    formatDate(date) {
      const dateObj = new Date(date.replace(/-/g, '/')) // Remplace les tirets par des slashes
      const formatter = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
      return formatter.format(dateObj)
    },
    getDuration() {
      const debutArray = this.startdate.split('/')
      const finArray = this.enddate.split('/')

      // Crée des objets Date en format 'yyyy-mm-dd'
      const debut = new Date(`${debutArray[2]}-${debutArray[1]}-${debutArray[0]}`)
      const fin = this.enddate.toLowerCase() === 'present' ? new Date() : new Date(`${finArray[2]}-${finArray[1]}-${finArray[0]}`)

      const annees = fin.getFullYear() - debut.getFullYear()
      const mois = fin.getMonth() - debut.getMonth()

      if (annees === 0) {
        return mois === 0 ? 'Moins d’un mois' : `${mois} mois`
      }
      else {
        return `${annees} an${annees > 1 ? 's' : ''} ${mois > 0 ? `et ${mois} mois` : ''}`
      }
    },
  },
}
</script>

<template>
  <div class="timeline-container" :style="{ ...timelineStyle, backgroundColor: 'rgba(219, 219, 219, 0.05)' }">
    <div class="timeline-dot" />
    <div class="timeline-header" @click="toggleExpand">
      <div class="timeline-grid">
        <div class="grid-main">
          <div class="title-area">
            <h2 class="timeline-title">
              {{ title }}
            </h2>
            <h3 v-if="undertitle" class="timeline-undertitle">
              {{ undertitle }}
            </h3>
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
        <div class="toggle-area">
          <div class="toggle-button" prose-link :class="{ expanded: isExpanded }">
            <span class="toggle-icon" />
          </div>
        </div>
      </div>
    </div>
    <transition name="expand">
      <div v-if="isExpanded" class="timeline-content">
        <div v-html="content" />
        <slot /> <!-- Slot pour afficher du contenu supplémentaire -->
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
  border: 1px solid #ddd;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-left: 4px solid var(--timeline-color, #3498db);
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
  background-color: var(--timeline-color, #3498db);
  border: 4px solid #ffffff;
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
}

.timeline-undertitle {
  font-size: 1.05rem;
  font-weight: 500;
  margin: 0;
  line-height: 1.3;
}

.timeline-period {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.date-chip {
  border: 1px solid #ddd;
  color: #3498db;
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
  border: 1px solid #ddd;
  color: #3498db;
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

.toggle-button:hover {
  background-color: #3498db;
}

.toggle-icon {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-right: 2px solid #95a5a6;
  border-bottom: 2px solid #95a5a6;
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
  border-top: 1px solid #ecf0f1;
  line-height: 1.6;
  font-size: 0.95rem;
}

.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.35s ease,
    opacity 0.35s ease;
  max-height: 1000px;
  overflow: hidden;
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
</style>
