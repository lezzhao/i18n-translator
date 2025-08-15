export interface FileItem {
  file: File
  id: string
  name: string
  uploadTime: Date
  content: string
  translatedContent: string
}

export interface FileInfo {
  expandedFile: {
    id: string
    content: string
    translatedContent: string
  }
  existDraggedFile: boolean
}
