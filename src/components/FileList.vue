<script setup lang="ts">
import type { FileItem } from '~/types'
import { downloadFile, formatFileSize, getFileIcon } from '~/composables/file'
import { useTranslateStore } from '~/stores/translate'

const translateStore = useTranslateStore()

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
</script>

<template>
  <div class="file-list">
    <!-- 文件列表 -->
    <div v-if="translateStore.fileList.length > 0" class="mt-6">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg text-gray-800 font-semibold">
          已上传的文件 ({{ translateStore.fileList.length }})
        </h3>
        <button
          class="text-sm text-red-600 px-4 py-2 rounded-lg bg-red-100 transition-colors hover:bg-red-200"
          @click="translateStore.clearFiles"
        >
          清空所有
        </button>
      </div>

      <div class="border border-gray-200 rounded-lg bg-white overflow-hidden">
        <div class="divide-gray-200 divide-y">
          <div
            v-for="(fileItem) in translateStore.fileList"
            :key="fileItem.id"
            class="file-item"
          >
            <!-- 文件信息行 -->
            <div class="p-4 flex transition-colors items-center justify-between hover:bg-gray-50">
              <!-- 文件信息 -->
              <div class="flex flex-1 min-w-0 items-center space-x-4">
                <div class="flex-shrink-0">
                  <div :class="getFileIcon(fileItem.file.type)" text-xl text-gray-500 />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="mb-1 flex items-center space-x-2">
                    <h4 class="text-sm text-gray-900 font-medium truncate" :title="fileItem.file.name">
                      {{ fileItem.file.name }}
                    </h4>
                    <span
                      class="text-xs font-medium px-2 py-1 rounded-full"
                      :class="getFileTypeTag(fileItem.file.name).class"
                    >
                      {{ getFileTypeTag(fileItem.file.name).text }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500">
                    {{ formatFileSize(fileItem.file.size) }} • {{ fileItem.file.type || '未知类型' }}
                  </p>
                  <p class="text-xs text-gray-400 mt-1">
                    上传时间：{{ fileItem.uploadTime.toLocaleString() }}
                  </p>
                </div>
              </div>

              <!-- 操作按钮 -->
              <div class="flex flex-shrink-0 items-center space-x-2">
                <button
                  class="text-sm px-3 py-2 rounded-lg flex transition-colors items-center space-x-1"
                  :class="isExpanded(fileItem.id)
                    ? 'text-blue-700 bg-blue-200 hover:bg-blue-300'
                    : 'text-blue-600 bg-blue-100 hover:bg-blue-200'"
                  @click="() => toggleFileContent(fileItem)"
                >
                  <div
                    class="transition-transform duration-200"
                    :class="{ 'rotate-180': isExpanded(fileItem.id) }"
                  >
                    <div i-carbon-chevron-down text-sm />
                  </div>
                  <span>{{ isExpanded(fileItem.id) ? '收起' : '查看' }}</span>
                </button>
                <button
                  class="text-sm text-green-600 px-3 py-2 rounded-lg bg-green-100 flex transition-colors items-center space-x-1 hover:bg-green-200"
                  @click="() => downloadFile(fileItem.file)"
                >
                  <div i-carbon-download text-sm />
                  <span>下载</span>
                </button>
                <button
                  class="text-sm text-red-600 px-3 py-2 rounded-lg bg-red-100 transition-colors hover:bg-red-200"
                  @click="() => translateStore.removeFile(fileItem.id)"
                >
                  <div i-carbon-trash-can text-sm />
                  <span>删除</span>
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
                class="bg-gradient-to-r border-t border-gray-200 from-blue-50 to-indigo-50"
              >
                <div class="p-6">
                  <!-- 内容预览头部 -->
                  <div class="mb-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="rounded-full bg-blue-100 flex h-8 w-8 items-center justify-center">
                        <div i-carbon-document-text text-sm text-blue-600 />
                      </div>
                      <div>
                        <h5 class="text-sm text-gray-800 font-semibold">
                          文件内容预览
                        </h5>
                        <p class="text-xs text-gray-500">
                          点击内容区域可全屏查看
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span class="text-xs text-gray-500">{{ fileItem.file.name }}</span>
                      <span
                        class="text-xs font-medium px-2 py-1 rounded-full"
                        :class="getFileTypeTag(fileItem.file.name).class"
                      >
                        {{ getFileTypeTag(fileItem.file.name).text }}
                      </span>
                    </div>
                  </div>

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
    <div v-else class="text-gray-500 mt-10 flex items-center justify-center">
      <i i-carbon-document text-2xl mr-2 inline-block />暂无文件，请上传或拖拽文件到上方区域
    </div>
  </div>
</template>

<style scoped>
/* 文件项样式 */
.file-item {
  @apply transition-all duration-200;
}

.file-item:hover {
  @apply bg-gray-50;
}
</style>
