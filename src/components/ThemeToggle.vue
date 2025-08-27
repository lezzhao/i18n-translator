<script setup lang="ts">
import { computed } from 'vue'
import { getCurrentTheme, setTheme } from '~/composables/dark'

defineOptions({
  name: 'ThemeToggle',
})

const currentTheme = computed(() => getCurrentTheme())
</script>

<template>
  <div class="theme-toggle">
    <button
      class="theme-btn"
      :class="{ active: currentTheme === 'light' }"
      title="亮色模式"
      @click="setTheme('light')"
    >
      <div class="i-carbon-sun text-lg" />
    </button>

    <button
      class="theme-btn"
      :class="{ active: currentTheme === 'dark' }"
      title="暗色模式"
      @click="setTheme('dark')"
    >
      <div class="i-carbon-moon text-lg" />
    </button>

    <button
      class="theme-btn"
      :class="{ active: currentTheme === 'auto' }"
      title="跟随系统"
      @click="setTheme('auto')"
    >
      <div class="i-carbon-monitor text-lg" />
    </button>
  </div>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: #f3f4f6;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

html.dark .theme-toggle {
  background: #374151;
  border-color: #4b5563;
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

html.dark .theme-btn:hover {
  background: #4b5563;
  color: #d1d5db;
}

.theme-btn.active {
  background: #3b82f6;
  color: white;
}

html.dark .theme-btn.active {
  background: #60a5fa;
  color: white;
}

.theme-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

html.dark .theme-btn:focus {
  outline-color: #60a5fa;
}
</style>
