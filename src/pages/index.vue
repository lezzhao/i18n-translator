<script setup lang="ts" generic="T extends any, O extends any">
import { getLanguageDisplayName } from '~/composables'

defineOptions({
  name: 'IndexPage',
})

// 语言选择
const sourceLanguage = ref('zh')
const targetLanguage = ref('en')
</script>

<template>
  <div>
    <!-- 语言选择区域 -->
    <div class="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 class="text-lg text-gray-800 font-medium mb-4">
        语言设置
      </h3>
      <div class="flex flex-col gap-4 sm:flex-row">
        <!-- 原文语言选择 -->
        <div class="flex-1">
          <LanguageSelect
            v-model="sourceLanguage"
            label="原文语言"
            placeholder="选择原文语言"
            size="md"
          />
        </div>

        <!-- 目标语言选择 -->
        <div class="flex-1">
          <LanguageSelect
            v-model="targetLanguage"
            label="目标语言"
            placeholder="选择目标语言"
            size="md"
          />
        </div>
      </div>

      <!-- 当前选择显示 -->
      <div class="text-sm text-gray-600 mt-3">
        <span>当前设置：</span>
        <span class="text-blue-600 font-medium">{{ getLanguageDisplayName(sourceLanguage) }}</span>
        <span class="mx-2">→</span>
        <span class="text-green-600 font-medium">{{ getLanguageDisplayName(targetLanguage) }}</span>
      </div>
    </div>

    <!-- 文件上传组件 -->
    <Upload />
    <FileList />
  </div>
</template>
