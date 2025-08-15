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
      <div class="border border-gray-200 rounded-xl bg-white shadow-lg transition-shadow duration-300 overflow-hidden hover:shadow-xl">
        <!-- 内容区域头部装饰 -->
        <div class="bg-gradient-to-r px-2 py-1.5 border-b border-gray-200 flex items-center justify-between from-gray-50 to-gray-100">
          <div class="flex items-center space-x-2">
            <div class="flex space-x-1">
              <div class="rounded-full bg-red-400 h-2 w-2 shadow-sm" />
              <div class="rounded-full bg-yellow-400 h-2 w-2 shadow-sm" />
              <div class="rounded-full bg-green-400 h-2 w-2 shadow-sm" />
            </div>
            <span class="text-xs text-gray-600 font-medium font-mono">{{ translateStore.currentFile?.name }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-xs text-gray-500 px-1.5 py-0.5 border border-gray-200 rounded-md bg-white">
              {{ getFileTypeTag(translateStore.currentFile?.name || '').text }}
            </span>
            <span class="text-xs text-gray-400 px-1.5 py-0.5 border border-gray-200 rounded-md bg-white">
              {{ formatFileSize(translateStore.currentFile?.file.size || 0) }}
            </span>
          </div>
        </div>

        <!-- 代码内容 -->
        <div class="bg-gradient-to-br max-h-96 overflow-auto from-slate-50 to-blue-50 via-white">
          <div class="relative">
            <!-- 代码内容 -->
            <pre class="text-xs text-slate-800 font-mono whitespace-pre-wrap relative overflow-x-auto selection:text-blue-900 selection:bg-blue-200">
              <code class="block">
                <span
                  v-for="(line, lineIndex) in translateStore.currentFile?.content.split('\n')"
                  :key="lineIndex"
                  class="leading-4 h-4 block"
                  :class="{ 'opacity-60': line.trim() === '' }"
                >
                  {{ line }}
                </span>
              </code>
            </pre>
          </div>
        </div><div class="bg-gradient-to-br max-h-96 overflow-auto from-slate-50 to-blue-50 via-white">
          <div class="relative">
            <!-- 代码内容 -->
            <pre class="text-xs text-slate-800 font-mono whitespace-pre-wrap relative overflow-x-auto selection:text-blue-900 selection:bg-blue-200">
              <code class="block">
                <span
                  v-for="(line, lineIndex) in translateStore.currentFile?.translatedContent.split('\n')"
                  :key="lineIndex"
                  class="leading-4 h-4 block"
                  :class="{ 'opacity-60': line.trim() === '' }"
                >
                  {{ line }}
                </span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      <!-- 内容操作提示 -->
      <div class="mt-2 flex items-center justify-center">
        <div class="text-xs text-gray-500 px-2 py-1 border border-gray-200 rounded-full bg-white flex shadow-sm items-center space-x-3">
          <div class="flex items-center space-x-1">
            <div i-carbon-copy text-xs text-blue-500 />
            <span>点击内容可复制</span>
          </div>
          <div class="bg-gray-200 h-2.5 w-px" />
          <div class="flex items-center space-x-1">
            <div i-carbon-zoom-in text-xs text-green-500 />
            <span>滚动查看更多</span>
          </div>
          <div class="bg-gray-200 h-2.5 w-px" />
          <div class="flex items-center space-x-1">
            <div i-carbon-document text-xs text-purple-500 />
            <span>{{ getFileTypeTag(translateStore.currentFile?.name || '').text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 文件内容预览样式 */
pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  line-height: 1.2;
  font-size: 11px;
  letter-spacing: 0.1px;
  text-align: left;
}

/* 代码选择样式 */
pre::selection {
  background-color: #dbeafe;
  color: #1e40af;
}

/* 代码行样式 */
pre code span {
  display: block;
  text-align: left;
  transition: background-color 0.2s ease;
  margin: 0;
  padding: 0;
  height: 16px;
  line-height: 16px;
}

pre code span:hover {
  background-color: rgba(59, 130, 246, 0.08);
}

/* 空行样式 */
pre code span.opacity-60 {
  color: #9ca3af;
  height: 16px;
  line-height: 16px;
}

/* JSON语法高亮样式 */
pre code span:has(.json-key) {
  color: #2563eb;
  font-weight: 600;
}

pre code span:has(.json-value) {
  color: #dc2626;
}

pre code span:has(.json-number) {
  color: #059669;
}

pre code span:has(.json-boolean) {
  color: #d97706;
}

pre code span:has(.json-null) {
  color: #6b7280;
  font-style: italic;
}

/* 行号样式 */
.line-numbers {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  font-size: 9px;
  line-height: 1.2;
  color: #6b7280;
  user-select: none;
  pointer-events: none;
}

/* 行号容器样式 */
.line-numbers > div {
  line-height: 16px;
}

/* 滚动条样式 */
.overflow-auto::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 2px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
  border: 1px solid #f8fafc;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
