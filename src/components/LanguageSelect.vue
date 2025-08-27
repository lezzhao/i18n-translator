<script setup lang="ts">
import { getLanguageDisplayName, languages } from '~/composables/language'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '选择语言',
  disabled: false,
  size: 'md',
  variant: 'default',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

// 下拉框状态
const isOpen = ref(false)

// 获取当前选中的语言
const selectedLanguage = computed(() => {
  return languages.find(lang => lang.code === props.modelValue)
})

// 处理选择变化
function handleSelect(langCode: string) {
  emit('update:modelValue', langCode)
  emit('change', langCode)
  isOpen.value = false
}

// 切换下拉框
function toggleDropdown() {
  if (props.disabled)
    return
  isOpen.value = !isOpen.value
}

// 关闭下拉框
function closeDropdown() {
  isOpen.value = false
}

// 样式类计算
const triggerClasses = computed(() => {
  const baseClasses = 'w-full border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between'

  const sizeClasses = {
    sm: 'px-2 py-1.5 text-sm min-h-[32px]',
    md: 'px-3 py-2 text-sm min-h-[40px]',
    lg: 'px-4 py-2.5 text-base min-h-[48px]',
  }

  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800' : 'cursor-pointer'

  return `${baseClasses} ${sizeClasses[props.size]} border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500 dark:focus:border-blue-400 ${disabledClasses}`
})

const labelClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return `block font-medium text-gray-700 dark:text-gray-200 mb-2 ${sizeClasses[props.size]}`
})

const languageSelectRef = ref<HTMLDivElement | null>(null)
// 点击外部关闭下拉框
onClickOutside(languageSelectRef, () => {
  closeDropdown()
})
</script>

<template>
  <div ref="languageSelectRef" class="language-select relative">
    <!-- 标签 -->
    <label v-if="label" :class="labelClasses">
      {{ label }}
    </label>

    <!-- 自定义下拉框触发器 -->
    <div
      :class="triggerClasses"
      tabindex="0"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      @click="toggleDropdown"
      @keydown.enter="toggleDropdown"
      @keydown.space="toggleDropdown"
      @keydown.escape="closeDropdown"
    >
      <!-- 显示选中的语言或占位符 -->
      <span class="text-left flex-1">
        <span v-if="selectedLanguage" class="text-gray-900 flex items-center dark:text-gray-100">
          {{ getLanguageDisplayName(selectedLanguage.code) }}
        </span>
        <span v-else class="text-gray-400 dark:text-gray-500">
          {{ placeholder }}
        </span>
      </span>

      <!-- 下拉箭头 -->
      <div
        class="ml-2 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      >
        <div class="i-carbon-chevron-down text-sm text-gray-400 dark:text-gray-500" />
      </div>
    </div>

    <!-- 下拉菜单 -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="dropdown-menu"
      >
        <!-- 语言列表 -->
        <div class="language-list">
          <div
            v-for="lang in languages"
            :key="lang.code"
            class="language-item"
            :class="{ selected: lang.code === modelValue }"
            @click="handleSelect(lang.code)"
          >
            <div class="text-left flex items-center">
              <span class="text-lg mr-2">{{ lang.flag }}</span>
              <div class="flex-1">
                <div class="font-medium">
                  {{ lang.name }}
                </div>
                <div v-if="lang.name !== lang.nativeName" class="text-xs text-gray-500 dark:text-gray-400">
                  {{ lang.nativeName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.language-select {
  width: 100%;
}

.dropdown-menu {
  margin-top: 0.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  max-height: 15rem;
  width: 100%;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: absolute;
  z-index: 50;
  overflow: hidden;
}

html.dark .dropdown-menu {
  border-color: #4b5563;
  background: #1f2937;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.3),
    0 4px 6px -2px rgba(0, 0, 0, 0.2);
}

.language-list {
  max-height: 12rem;
  overflow-y: auto;
}

.language-item {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.language-item:hover {
  background: #eff6ff;
}

html.dark .language-item:hover {
  background: #1e3a8a;
}

.language-item.selected {
  background: #dbeafe;
  color: #1e40af;
}

html.dark .language-item.selected {
  background: #1e3a8a;
  color: #93c5fd;
}

/* 自定义滚动条样式 */
.language-list::-webkit-scrollbar {
  width: 6px;
}

.language-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.language-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.language-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

html.dark .language-list::-webkit-scrollbar-track {
  background: #374151;
}

html.dark .language-list::-webkit-scrollbar-thumb {
  background: #6b7280;
}

html.dark .language-list::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* 焦点样式 */
.language-select:focus-within .trigger {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}

html.dark .language-select:focus-within .trigger {
  box-shadow: 0 0 0 2px #60a5fa;
  border-color: #60a5fa;
}
</style>
