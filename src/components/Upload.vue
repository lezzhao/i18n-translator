<script setup lang="ts">
import { translateText } from '~/composables'
import { getFileContent } from '~/composables/file'
import { useTranslateStore } from '~/stores/translate'

// 文件输入引用
const fileRef = ref<HTMLInputElement | null>(null)

const translateStore = useTranslateStore()

// 拖拽相关函数
function handleDragOver(e: DragEvent) {
  e.preventDefault()
  translateStore.updateFileInfo({
    key: 'existDraggedFile',
    value: true,
  })
}

function handleDragLeave(e: DragEvent) {
  e.preventDefault()
  translateStore.updateFileInfo({
    key: 'existDraggedFile',
    value: false,
  })
}

function addFiles(files?: FileList | null) {
  if (!files) {
    return
  }
  const fileArray = Array.from(files)
  const newFiles = fileArray.filter(file => translateStore.hasSameFile(file) === -1)
  translateStore.addFiles(newFiles)
  for (const file of newFiles) {
    getFileContent(file).then((content) => {
      const i = translateStore.hasSameFile(file)
      if (i !== -1) {
        translateStore.fileList[i].content = content
        translateText(content).then((translated) => {
          translateStore.fileList[i].translatedContent = translated
        })
      }
    })
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  translateStore.updateFileInfo({
    key: 'existDraggedFile',
    value: false,
  })

  addFiles(e.dataTransfer?.files)
}

// 处理文件选择
function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  addFiles(target.files)
}
</script>

<template>
  <div class="file-upload-area">
    <!-- 文件上传按钮 -->
    <div class="mb-4">
      <input
        ref="fileRef"
        type="file"
        multiple
        class="hidden"
        accept=".js,.ts,.json,.yml,.yaml"
        @change="handleFileSelect"
      >
      <button
        class="text-white px-4 py-2 rounded-lg bg-blue-500 flex transition-colors items-center hover:bg-blue-600"
        @click="fileRef?.click()"
      >
        <div i-carbon-cloud-upload mr-2 inline-block />
        <span>选择文件</span>
      </button>
    </div>

    <!-- 拖拽上传区域 -->
    <div
      class="drag-area p-8 border-2 border-gray-300 rounded-lg border-dashed bg-gray-50 h-48 w-full transition-all duration-300"
      :class="{ 'border-blue-500 bg-blue-50': translateStore.fileInfo.existDraggedFile }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <!-- 拖拽上传区域内容 -->
      <div class="text-center flex flex-col h-full items-center justify-center">
        <div i-carbon-upload text-4xl text-gray-400 mb-4 />
        <p class="text-lg text-gray-600 mb-2">
          拖拽文件到此处
        </p>
        <p class="text-sm text-gray-500 mb-4">
          或点击上方按钮选择文件
        </p>
        <div class="text-xs text-blue-600 font-medium mb-2">
          支持的文件类型：.js, .ts, .json, .yml, .yaml
        </div>
        <div class="text-xs text-red-500">
          其他类型文件将被自动过滤
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drag-area {
  @apply cursor-pointer;
}

.drag-area:hover {
  @apply border-gray-400 bg-gray-100;
}

/* 拖拽状态动画 */
.drag-area.border-blue-500 {
  @apply transform scale-105;
}
</style>
