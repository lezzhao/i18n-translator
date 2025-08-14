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

  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer'

  return `${baseClasses} ${sizeClasses[props.size]} border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500 ${disabledClasses}`
})

const labelClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return `block font-medium text-gray-700 mb-2 ${sizeClasses[props.size]}`
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
        <span v-if="selectedLanguage" class="flex items-center">
          {{ getLanguageDisplayName(selectedLanguage.code) }}
        </span>
        <span v-else class="text-gray-400">
          {{ placeholder }}
        </span>
      </span>

      <!-- 下拉箭头 -->
      <div
        class="ml-2 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      >
        <div i-carbon-chevron-down text-sm text-gray-400 />
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
        class="mt-1 border border-gray-200 rounded-md bg-white max-h-60 w-full shadow-lg absolute z-50 overflow-hidden"
      >
        <!-- 语言列表 -->
        <div class="max-h-48 overflow-y-auto">
          <div
            v-for="lang in languages"
            :key="lang.code"
            class="px-3 py-2 cursor-pointer transition-colors duration-150 hover:bg-blue-50"
            :class="{ 'bg-blue-100 text-blue-700': lang.code === modelValue }"
            @click="handleSelect(lang.code)"
          >
            <div class="text-left flex items-center">
              <span class="text-lg mr-2">{{ lang.flag }}</span>
              <div class="flex-1">
                <div class="font-medium">
                  {{ lang.name }}
                </div>
                <div v-if="lang.name !== lang.nativeName" class="text-xs text-gray-500">
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
  @apply w-full;
}

/* 自定义滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 焦点样式 */
.language-select:focus-within .trigger {
  @apply ring-2 ring-blue-500 border-blue-500;
}
</style>
