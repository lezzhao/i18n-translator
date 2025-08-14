export interface FileItem {
  file: File
  id: string
  name: string
  uploadTime: Date
}

export interface FileInfo {
  expandedFile: string
  existDraggedFile: boolean
}
