import type { FileInfo, FileItem } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'

function createFileItem(file: File) {
  return {
    file,
    id: crypto.randomUUID(),
    name: file.name,
    uploadTime: new Date(),
    content: '',
    translatedContent: '',
  }
}

export const useTranslateStore = defineStore('translate', () => {
  const fileInfo = ref<FileInfo>({
    expandedFile: {
      id: '',
      content: '',
      translatedContent: '',
    },
    existDraggedFile: false,
  })

  const fileList = ref<FileItem[]>([])

  const currentFile = computed(() => {
    return fileList.value.find(f => f.id === fileInfo.value.expandedFile.id)
  })

  const hasSameFile = (file: File) => {
    return fileList.value.findIndex(f => f.file.name === file.name)
  }

  // 添加文件
  const addFiles = (file: File | File[]) => {
    const files = Array.isArray(file) ? file : [file]
    files.forEach((f) => {
      const index = hasSameFile(f)
      if (index !== -1) {
        fileList.value[index] = createFileItem(f)
      }
      else {
        fileList.value.push(createFileItem(f))
      }
    })
  }

  // 删除文件
  const removeFile = (id: string) => {
    fileList.value = fileList.value.filter(f => f.id !== id)
  }

  // 清空文件
  const clearFiles = () => {
    fileList.value = []
  }

  const updateFileInfo = (options: {
    key?: keyof FileInfo
    value: any
  }) => {
    const { key, value } = options
    if (key) {
      (fileInfo.value[key] as any) = value
      return
    }
    fileInfo.value = value
  }

  return {
    fileInfo,
    fileList,
    currentFile,
    hasSameFile,
    updateFileInfo,
    addFiles,
    removeFile,
    clearFiles,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTranslateStore as any, import.meta.hot))
