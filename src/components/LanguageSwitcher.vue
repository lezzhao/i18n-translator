<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { loadLanguageAsync } from '~/composables/ i18n'

defineOptions({
  name: 'LanguageSwitcher',
})

const { t, locale } = useI18n()

// 当前语言
const currentLocale = computed(() => locale.value)

// 切换语言
async function toggleLanguage() {
  const newLang = currentLocale.value === 'zh-CN' ? 'en' : 'zh-CN'
  try {
    await loadLanguageAsync(newLang)
  }
  catch (error) {
    console.error('Failed to switch language:', error)
  }
}
</script>

<template>
  <button
    class="action-btn language-btn"
    :title="currentLocale === 'zh-CN' ? t('languageSwitch.toEnglish') : t('languageSwitch.toChinese')"
    @click="toggleLanguage"
  >
    <span v-if="currentLocale === 'zh-CN'" class="flag">🇺🇸</span>
    <span v-else class="flag">🇨🇳</span>
  </button>
</template>

<style scoped>
.flag {
  font-size: 1.25rem;
  display: block;
  transition: transform 0.2s ease;
}

.language-btn:hover .flag {
  transform: scale(1.1);
}
</style>
