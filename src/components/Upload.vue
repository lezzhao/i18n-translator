<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { translateText } from '~/composables'
import { getFileContent } from '~/composables/file'
import { useTranslateStore } from '~/stores/translate'

// 文件输入引用
const fileRef = ref<HTMLInputElement | null>(null)

const translateStore = useTranslateStore()
const { t } = useI18n()

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
  if (!files || !translateStore.availability) {
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
        translateText(content, translateStore.languageInfo).then((translated) => {
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
  if (!translateStore.availability) {
    return
  }
  const target = event.target as HTMLInputElement
  addFiles(target.files)
}

function handleUpload() {
  if (!translateStore.availability) {
    return
  }
  fileRef?.value?.click()
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
        class="upload-btn"
        :class="{ disabled: !translateStore.availability }"
        @click="handleUpload"
      >
        <div class="i-carbon-cloud-upload mr-2 inline-block" />
        <span>{{ t('upload.button') }}</span>
      </button>
    </div>

    <!-- 拖拽上传区域 -->
    <div
      v-show="!translateStore.fileList.length"
      class="drag-area"
      :class="{ dragging: translateStore.fileInfo.existDraggedFile }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <!-- 拖拽上传区域内容 -->
      <div class="drag-content">
        <div class="i-carbon-upload text-4xl text-gray-400 mb-4" />
        <p class="drag-title">
          {{ t('upload.drag.title') }}
        </p>
        <p class="drag-subtitle">
          {{ t('upload.drag.subtitle') }}
        </p>
        <div class="file-types">
          {{ t('upload.drag.types') }}
        </div>
        <div class="file-note">
          {{ t('upload.drag.note') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-btn {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.upload-btn:hover:not(.disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.upload-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #6b7280;
}

html.dark .upload-btn {
  background: #60a5fa;
}

html.dark .upload-btn:hover:not(.disabled) {
  background: #3b82f6;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
}

.drag-area {
  padding: 2rem;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  background: #f9fafb;
  height: 12rem;
  width: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
}

html.dark .drag-area {
  border-color: #4b5563;
  background: #1f2937;
}

.drag-area:hover {
  border-color: #9ca3af;
  background: #f3f4f6;
}

html.dark .drag-area:hover {
  border-color: #6b7280;
  background: #374151;
}

.drag-area.dragging {
  border-color: #3b82f6;
  background: #eff6ff;
  transform: scale(1.02);
}

html.dark .drag-area.dragging {
  border-color: #60a5fa;
  background: #1e3a8a;
}

.drag-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.drag-title {
  font-size: 1.125rem;
  color: #374151;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

html.dark .drag-title {
  color: #f3f4f6;
}

.drag-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

html.dark .drag-subtitle {
  color: #9ca3af;
}

.file-types {
  font-size: 0.75rem;
  color: #3b82f6;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

html.dark .file-types {
  color: #60a5fa;
}

.file-note {
  font-size: 0.75rem;
  color: #ef4444;
}

html.dark .file-note {
  color: #f87171;
}
</style>
