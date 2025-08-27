<script setup lang="ts">
import { formatFileSize } from '~/composables/file'
import { useTranslateStore } from '~/stores/translate'

const translateStore = useTranslateStore()

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
</script>

<template>
  <div class="file-content-preview">
    <!-- 文件内容展示 -->
    <div class="relative">
      <div class="content-container">
        <!-- 内容区域头部装饰 -->
        <div class="content-header">
          <div class="header-left">
            <div class="window-controls">
              <div class="control-btn red" />
              <div class="control-btn yellow" />
              <div class="control-btn green" />
            </div>
            <span class="file-name">{{ translateStore.currentFile?.name }}</span>
          </div>
          <div class="header-right">
            <span class="file-type-tag">
              {{ getFileTypeTag(translateStore.currentFile?.name || '').text }}
            </span>
            <span class="file-size-tag">
              {{ formatFileSize(translateStore.currentFile?.file.size || 0) }}
            </span>
          </div>
        </div>

        <!-- 两列内容展示 -->
        <div class="content-grid">
          <!-- 原文列 -->
          <div class="original content-column">
            <div class="column-header">
              <h3 class="column-title">
                原文
              </h3>
            </div>
            <!-- 原文内容 -->
            <pre class="content-code">
              <code class="block">
                <span
                  v-for="(line, lineIndex) in translateStore.currentFile?.content.split('\n')"
                  :key="`original-${lineIndex}`"
                  class="code-line"
                  :class="{ 'empty-line': line.trim() === '' }"
                >
                  {{ line }}
                </span>
              </code>
            </pre>
          </div>

          <!-- 译文列 -->
          <div class="content-column translated">
            <div class="column-header">
              <h3 class="column-title">
                译文
              </h3>
              <div title="点击复制" class="copy-icon i-carbon-copy" />
            </div>
            <!-- 译文内容 -->
            <pre class="content-code">
              <code class="block">
                <span
                  v-for="(line, lineIndex) in translateStore.currentFile?.translatedContent.split('\n')"
                  :key="`translated-${lineIndex}`"
                  class="code-line"
                  :class="{ 'empty-line': line.trim() === '' }"
                >
                  {{ line }}
                </span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-container {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: white;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
}

html.dark .content-container {
  border-color: #4b5563;
  background: #1f2937;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.3),
    0 4px 6px -2px rgba(0, 0, 0, 0.2);
}

.content-container:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

html.dark .content-container:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.content-header {
  background: linear-gradient(to right, #f9fafb, #f3f4f6);
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

html.dark .content-header {
  background: linear-gradient(to right, #374151, #4b5563);
  border-bottom-color: #4b5563;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.window-controls {
  display: flex;
  gap: 0.25rem;
}

.control-btn {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.control-btn.red {
  background: #ef4444;
}

.control-btn.yellow {
  background: #eab308;
}

.control-btn.green {
  background: #22c55e;
}

.file-name {
  font-size: 0.75rem;
  color: #374151;
  font-weight: 500;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
}

html.dark .file-name {
  color: #d1d5db;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.file-type-tag,
.file-size-tag {
  font-size: 0.75rem;
  color: #6b7280;
  padding: 0.125rem 0.375rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
}

html.dark .file-type-tag,
html.dark .file-size-tag {
  color: #9ca3af;
  border-color: #4b5563;
  background: #374151;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  max-height: 24rem;
  overflow: hidden;
}

.content-column {
  position: relative;
}

.content-column.original {
  border-right: 1px solid #e5e7eb;
}

html.dark .content-column.original {
  border-right-color: #4b5563;
}

.column-header {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

html.dark .column-header {
  border-bottom-color: #4b5563;
  background: #1f2937;
}

.column-title {
  font-size: 0.75rem;
  font-weight: 500;
}

.column-header:has(.column-title:contains('原文')) .column-title {
  color: #1e40af;
}

.column-header:has(.column-title:contains('译文')) .column-title {
  color: #059669;
}

html.dark .column-header:has(.column-title:contains('原文')) .column-title {
  color: #60a5fa;
}

html.dark .column-header:has(.column-title:contains('译文')) .column-title {
  color: #34d399;
}

.copy-icon {
  font-size: 0.75rem;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s ease;
}

.copy-icon:hover {
  color: #3b82f6;
}

html.dark .copy-icon {
  color: #9ca3af;
}

html.dark .copy-icon:hover {
  color: #60a5fa;
}

.content-code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  line-height: 1.2;
  font-size: 11px;
  letter-spacing: 0.1px;
  text-align: left;
  margin: 0;
  padding: 0;
}

.code-line {
  display: block;
  text-align: left;
  transition: background-color 0.2s ease;
  margin: 0;
  padding: 0.125rem 0.75rem;
  height: 1.25rem;
  line-height: 1.25rem;
  white-space: nowrap;
  color: #374151;
}

html.dark .code-line {
  color: #d1d5db;
}

.code-line:hover {
  background-color: rgba(59, 130, 246, 0.08);
}

html.dark .code-line:hover {
  background-color: rgba(96, 165, 250, 0.1);
}

.empty-line {
  opacity: 0.6;
  color: #9ca3af;
}

html.dark .empty-line {
  color: #6b7280;
}

/* 滚动条样式 */
.content-grid::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.content-grid::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 2px;
}

.content-grid::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
  border: 1px solid #f8fafc;
}

.content-grid::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

html.dark .content-grid::-webkit-scrollbar-track {
  background: #374151;
}

html.dark .content-grid::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-color: #374151;
}

html.dark .content-grid::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
