export interface FileItem {
  file: File
  id: string
  uploadTime: Date
}

// 过滤允许的文件类型
export function filterAllowedFiles(files: File[]): File[] {
  return files.filter(file => isAllowedFile(file))
}

// 检查是否为允许的文件类型
export function isAllowedFile(file: File): boolean {
  const allowedTypes = [
    'application/javascript', // .js 文件
    'text/javascript', // .js 文件 (某些系统)
    'application/typescript', // .ts 文件
    'text/typescript', // .ts 文件 (某些系统)
    'application/json', // .json 文件
    'text/json', // .json 文件 (某些系统)
    'text/yaml', // .yml/.yaml 文件
    'application/x-yaml', // .yml/.yaml 文件 (某些系统)
    'text/plain', // 纯文本文件 (可能包含 js/ts/json/yml)
  ]

  // 检查文件扩展名
  const fileName = file.name.toLowerCase()
  const allowedExtensions = ['.js', '.ts', '.json', '.yml', '.yaml']
  const hasAllowedExtension = allowedExtensions.some(ext => fileName.endsWith(ext))

  // 检查MIME类型或文件扩展名
  return allowedTypes.includes(file.type) || hasAllowedExtension
}

// 格式化文件大小
export function formatFileSize(bytes: number): string {
  if (bytes === 0)
    return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / (k ** i)).toFixed(2))} ${sizes[i]}`
}

// 获取文件图标
export function getFileIcon(type: string): string {
  if (type.startsWith('image/'))
    return 'i-carbon-image'
  if (type.startsWith('video/'))
    return 'i-carbon-video'
  if (type.startsWith('audio/'))
    return 'i-carbon-music'
  if (type.includes('pdf'))
    return 'i-carbon-document-pdf'
  if (type.includes('word') || type.includes('document'))
    return 'i-carbon-document'
  if (type.includes('excel') || type.includes('spreadsheet'))
    return 'i-carbon-table'
  return 'i-carbon-document'
}

// 下载文件
export function downloadFile(file: File) {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
