import type { FileInfo, FileItem } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'

function hasSameFile(file: File, fileList: FileItem[]) {
  return fileList.findIndex(f => f.file.name === file.name)
}

export const useTranslateStore = defineStore('translate', () => {
  const fileInfo = ref<FileInfo>({
    expandedFile: '',
    existDraggedFile: false,
  })

  const fileList = ref<FileItem[]>([])

  // 添加文件
  const addFiles = (file: File | File[]) => {
    const files = Array.isArray(file) ? file : [file]
    files.forEach((f) => {
      const index = hasSameFile(f, fileList.value)
      if (index !== -1) {
        fileList.value[index] = {
          file: f,
          id: crypto.randomUUID(),
          name: f.name,
          uploadTime: new Date(),
        }
      }
      else {
        fileList.value.push({
          file: f,
          id: crypto.randomUUID(),
          name: f.name,
          uploadTime: new Date(),
        })
      }
    })
    console.log(fileList.value)
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
    updateFileInfo,
    addFiles,
    removeFile,
    clearFiles,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTranslateStore as any, import.meta.hot))
