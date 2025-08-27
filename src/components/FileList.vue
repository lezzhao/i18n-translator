<script setup lang="ts">
import type { FileItem } from '~/types'
import { useI18n } from 'vue-i18n'
import { downloadContentAsFile, formatFileSize, getFileIcon } from '~/composables/file'
import { useTranslateStore } from '~/stores/translate'

const translateStore = useTranslateStore()
const { t } = useI18n()

function isExpanded(id: string) {
  return translateStore.fileInfo.expandedFile.id === id
}

// 切换文件内容展开状态
async function toggleFileContent(fileItem: FileItem) {
  if (isExpanded(fileItem.id)) {
    // 如果当前文件已展开，则收起
    translateStore.updateFileInfo({
      key: 'expandedFile',
      value: {
        id: '',
        content: '',
      },
    })
  }
  else {
    // 如果点击其他文件，则展开该文件
    if (fileItem.translatedContent) {
      translateStore.updateFileInfo({
        key: 'expandedFile',
        value: {
          id: fileItem.id,
          content: fileItem.content,
          translatedContent: fileItem.translatedContent,
        },
      })
    }
  }
}

// 获取文件类型标签样式
function getFileTypeTag(fileName: string): { text: string, class: string } {
  if (fileName.endsWith('.js'))
    return { text: 'JavaScript', class: 'bg-yellow-100 text-yellow-800' }
  if (fileName.endsWith('.ts'))
    return { text: 'TypeScript', class: 'bg-blue-100 text-blue-800' }
  if (fileName.endsWith('.json'))
    return { text: 'JSON', class: 'bg-green-100 text-green-800' }
  if (fileName.endsWith('.yml') || fileName.endsWith('.yaml'))
    return { text: 'YAML', class: 'bg-purple-100 text-purple-800' }
  return { text: 'Unknown', class: 'bg-gray-100 text-gray-800' }
}

function download(fileItem: FileItem) {
  if (!translateStore.availability || !fileItem.translatedContent) {
    return
  }
  downloadContentAsFile(fileItem.translatedContent, fileItem.file.name)
}
</script>

<template>
  <div class="file-list">
    <!-- 文件列表 -->
    <div v-if="translateStore.fileList.length > 0" class="mt-6">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="section-title">
          {{ t('file.list.title') }} ({{ translateStore.fileList.length }})
        </h3>
        <button
          class="clear-btn"
          @click="translateStore.clearFiles"
        >
          {{ t('file.list.clear') }}
        </button>
      </div>

      <div class="file-container">
        <div class="file-divider">
          <div
            v-for="(fileItem) in translateStore.fileList"
            :key="fileItem.id"
            class="file-item"
          >
            <!-- 文件信息行 -->
            <div class="file-info">
              <!-- 文件信息 -->
              <div class="file-details">
                <div>
                  <div class="file-header">
                    <div :class="getFileIcon(fileItem.file.type)" class="file-icon" />
                    <span class="file-name" :title="fileItem.file.name">
                      {{ fileItem.file.name }}
                    </span>
                    <span
                      class="file-type-tag"
                      :class="getFileTypeTag(fileItem.file.name).class"
                    >
                      {{ getFileTypeTag(fileItem.file.name).text }}
                    </span>
                  </div>
                  <div class="file-meta">
                    <span>
                      {{ formatFileSize(fileItem.file.size) }}
                    </span>
                    <span>
                      {{ fileItem.uploadTime.toLocaleString() }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 操作按钮 -->
              <div class="file-actions">
                <button
                  class="action-btn view-btn"
                  :class="{ expanded: isExpanded(fileItem.id) }"
                  @click="() => toggleFileContent(fileItem)"
                >
                  <div
                    class="chevron-icon"
                    :class="{ 'rotate-180': isExpanded(fileItem.id) }"
                  >
                    <div class="i-carbon-chevron-down text-sm" />
                  </div>
                  <span>{{ isExpanded(fileItem.id) ? t('file.list.actions.collapse') : t('file.list.actions.view') }}</span>
                </button>
                <button
                  class="action-btn download-btn"
                  :class="{ disabled: !translateStore.availability }"
                  @click="download(fileItem)"
                >
                  <div class="i-carbon-download text-xs" />
                  <span>{{ t('file.list.actions.download') }}</span>
                </button>
                <button
                  class="action-btn remove-btn"
                  @click="() => translateStore.removeFile(fileItem.id)"
                >
                  <div class="i-carbon-trash-can text-xs" />
                  <span>{{ t('file.list.actions.remove') }}</span>
                </button>
              </div>
            </div>

            <!-- 文件内容展开区域 -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-[500px]"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-[500px]"
              leave-to-class="opacity-0 max-h-0"
            >
              <div
                v-if="isExpanded(fileItem.id)"
                class="file-content-expanded"
              >
                <div class="p-3">
                  <!-- 使用文件内容预览组件 -->
                  <FileContent
                    :content="translateStore.fileInfo.expandedFile.content"
                    :file-name="fileItem.file.name"
                    :file-size="formatFileSize(fileItem.file.size)"
                    :file-type="fileItem.file.type || '未知类型'"
                  />
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态提示 -->
    <div v-else class="empty-state">
      <div class="i-carbon-document text-2xl mr-2 inline-block" />
      {{ t('file.list.empty') }}
    </div>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

html.dark .section-title {
  color: #f9fafb;
}

.clear-btn {
  font-size: 0.875rem;
  color: #dc2626;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  background: #fef2f2;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.clear-btn:hover {
  background: #fee2e2;
}

html.dark .clear-btn {
  background: #7f1d1d;
  color: #fca5a5;
}

html.dark .clear-btn:hover {
  background: #991b1b;
}

.file-container {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  overflow: hidden;
}

html.dark .file-container {
  border-color: #4b5563;
  background: #1f2937;
}

.file-divider {
  border-top: 1px solid #e5e7eb;
}

html.dark .file-divider {
  border-top-color: #4b5563;
}

.file-item {
  transition: all 0.2s ease;
}

.file-item:hover {
  background: #f9fafb;
}

html.dark .file-item:hover {
  background: #374151;
}

.file-info {
  padding: 1rem;
  display: flex;
  transition: all 0.2s ease;
  align-items: center;
  justify-content: space-between;
}

.file-details {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  gap: 1rem;
}

.file-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.file-icon {
  font-size: 1.25rem;
  color: #6b7280;
  flex-shrink: 0;
}

html.dark .file-icon {
  color: #9ca3af;
}

.file-name {
  font-size: 0.875rem;
  color: #6b7280;
  flex: 1;
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

html.dark .file-name {
  color: #d1d5db;
}

.file-type-tag {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  flex-shrink: 0;
}

.file-type-tag.bg-yellow-100 {
  background: #fef3c7;
  color: #92400e;
}

.file-type-tag.bg-blue-100 {
  background: #dbeafe;
  color: #1e40af;
}

.file-type-tag.bg-green-100 {
  background: #dcfce7;
  color: #166534;
}

.file-type-tag.bg-purple-100 {
  background: #f3e8ff;
  color: #7c3aed;
}

.file-type-tag.bg-gray-100 {
  background: #f3f4f6;
  color: #374151;
}

html.dark .file-type-tag.bg-yellow-100 {
  background: #78350f;
  color: #fbbf24;
}

html.dark .file-type-tag.bg-blue-100 {
  background: #1e3a8a;
  color: #93c5fd;
}

html.dark .file-type-tag.bg-green-100 {
  background: #14532d;
  color: #86efac;
}

html.dark .file-type-tag.bg-purple-100 {
  background: #581c87;
  color: #c084fc;
}

html.dark .file-type-tag.bg-gray-100 {
  background: #374151;
  color: #d1d5db;
}

.file-meta {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

html.dark .file-meta {
  color: #6b7280;
}

.file-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  cursor: pointer;
  transition: all 0.2s ease;
  align-items: center;
  gap: 0.25rem;
  border: none;
}

.view-btn {
  color: #1d4ed8;
  background: #dbeafe;
}

.view-btn:hover {
  background: #bfdbfe;
}

.view-btn.expanded {
  color: #1e40af;
  background: #bfdbfe;
}

.view-btn.expanded:hover {
  background: #93c5fd;
}

html.dark .view-btn {
  color: #60a5fa;
  background: #1e3a8a;
}

html.dark .view-btn:hover {
  background: #1e40af;
}

html.dark .view-btn.expanded {
  color: #93c5fd;
  background: #1e40af;
}

html.dark .view-btn.expanded:hover {
  background: #2563eb;
}

.download-btn {
  color: #059669;
  background: #d1fae5;
}

.download-btn:hover {
  background: #a7f3d0;
}

.download-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

html.dark .download-btn {
  color: #34d399;
  background: #064e3b;
}

html.dark .download-btn:hover {
  background: #065f46;
}

.remove-btn {
  color: #dc2626;
  background: #fee2e2;
}

.remove-btn:hover {
  background: #fecaca;
}

html.dark .remove-btn {
  color: #f87171;
  background: #7f1d1d;
}

html.dark .remove-btn:hover {
  background: #991b1b;
}

.chevron-icon {
  transition: transform 0.2s ease;
}

.file-content-expanded {
  background: linear-gradient(to right, #eff6ff, #e0e7ff);
  border-top: 1px solid #e5e7eb;
}

html.dark .file-content-expanded {
  background: linear-gradient(to right, #1e3a8a, #312e81);
  border-top-color: #4b5563;
}

.empty-state {
  color: #6b7280;
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

html.dark .empty-state {
  color: #9ca3af;
}
</style>
