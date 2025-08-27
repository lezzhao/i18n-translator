<script setup lang="ts" generic="T extends any, O extends any">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'
import { checkAvailability, getLanguageDisplayName } from '~/composables'
import { isDark, toggleDark } from '~/composables/dark'
import { useTranslateStore } from '~/stores/translate'

defineOptions({
  name: 'IndexPage',
})

const translateStore = useTranslateStore()
const { t } = useI18n()

watchEffect(() => {
  checkAvailability(translateStore.languageInfo)
})
</script>

<template>
  <div>
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">
        {{ t('page.title') }}
      </h1>
      <div class="header-actions">
        <a
          href="https://github.com/lezzhao/i18n-translator"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn github-btn"
          :title="t('page.header.github')"
        >
          <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <LanguageSwitcher />
        <button
          class="action-btn theme-btn"
          :title="isDark ? t('page.header.theme.light') : t('page.header.theme.dark')"
          @click="() => toggleDark()"
        >
          <div v-if="isDark" class="i-carbon-sun text-lg" />
          <div v-else class="i-carbon-moon text-lg" />
        </button>
      </div>
    </div>

    <!-- 语言选择区域 -->
    <div class="language-section">
      <h3 class="section-title">
        {{ t('language.section.title') }}
      </h3>
      <div class="flex flex-col gap-4 sm:flex-row">
        <!-- 原文语言选择 -->
        <div class="flex-1">
          <LanguageSelect
            v-model="translateStore.languageInfo.source"
            :label="t('language.section.source.label')"
            :placeholder="t('language.section.source.placeholder')"
            size="md"
          />
        </div>

        <!-- 目标语言选择 -->
        <div class="flex-1">
          <LanguageSelect
            v-model="translateStore.languageInfo.target"
            :label="t('language.section.target.label')"
            :placeholder="t('language.section.target.placeholder')"
            size="md"
          />
        </div>
      </div>

      <!-- 当前选择显示 -->
      <div class="current-selection">
        <span>{{ t('language.section.current') }}：</span>
        <span class="source-lang">{{ getLanguageDisplayName(translateStore.languageInfo.source) }}</span>
        <span class="arrow">→</span>
        <span class="target-lang">{{ getLanguageDisplayName(translateStore.languageInfo.target) }}</span>
      </div>
    </div>

    <!-- 文件上传组件 -->
    <Upload />
    <FileList />
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

html.dark .page-title {
  color: #f9fafb;
}

.language-section {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: #f9fafb;
}

html.dark .language-section {
  border-color: #4b5563;
  background: #1f2937;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 1rem 0;
}

html.dark .section-title {
  color: #f9fafb;
}

.current-selection {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.75rem;
}

html.dark .current-selection {
  color: #9ca3af;
}

.source-lang {
  color: #2563eb;
  font-weight: 500;
}

html.dark .source-lang {
  color: #60a5fa;
}

.target-lang {
  color: #059669;
  font-weight: 500;
}

html.dark .target-lang {
  color: #34d399;
}

.arrow {
  margin: 0 0.5rem;
  color: #6b7280;
}

html.dark .arrow {
  color: #9ca3af;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: #f3f4f6;
  color: #374151;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
  cursor: pointer;
}

.action-btn:hover {
  background: #e5e7eb;
  color: #111827;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

html.dark .action-btn {
  background: #374151;
  color: #d1d5db;
  border-color: #4b5563;
}

html.dark .action-btn:hover {
  background: #4b5563;
  color: #f9fafb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.action-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

html.dark .action-btn:focus {
  outline-color: #60a5fa;
}

.github-btn {
  text-decoration: none;
}

.github-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.2s ease;
}

.github-btn:hover .github-icon {
  transform: scale(1.1);
}

.language-btn {
  cursor: default;
}

.language-btn:hover {
  transform: none;
  box-shadow: none;
}

.theme-btn {
  position: relative;
}

.theme-btn .i-carbon-sun,
.theme-btn .i-carbon-moon {
  transition: transform 0.3s ease;
}

.theme-btn:hover .i-carbon-sun,
.theme-btn:hover .i-carbon-moon {
  transform: rotate(15deg);
}
</style>
