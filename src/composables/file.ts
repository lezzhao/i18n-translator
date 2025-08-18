import yaml from 'js-yaml'

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

// 转换yaml为json
export async function convertYamlToJson(content: string): Promise<string> {
  try {
    const json = yaml.load(content)
    const res = JSON.stringify(json, null, 2)
    return res
  }
  catch (error) {
    console.error(error)
    return content
  }
}

// 将json转换为yaml
export async function convertJsonToYaml(content: string): Promise<string> {
  try {
    const json = JSON.parse(content)
    const res = yaml.dump(json)
    return res
  }
  catch (error) {
    console.error(error)
    return content
  }
}

// 解析文件内容
export async function getFileContent(file: File) {
  try {
    const content = await file.text()
    // 根据文件类型进行格式化
    if (file.name.endsWith('.json')) {
      return content
    }
    else if (file.name.endsWith('.yml') || file.name.endsWith('.yaml')) {
      return convertYamlToJson(content) // YAML 保持原格式
    }

    return content // JS/TS 文件保持原格式
  }
  catch (error) {
    console.error('解析文件内容失败:', error)
    return '无法读取文件内容'
  }
}

// 下载内容为指定类型的文件
export async function downloadContentAsFile(
  content: string,
  fileName: string,
) {
  const fileType = fileName.slice(fileName.lastIndexOf('.') + 1)
  // 根据文件类型设置MIME类型
  const mimeTypes: Record<string, string> = {
    js: 'application/javascript',
    ts: 'application/typescript',
    json: 'application/json',
    yml: 'text/yaml',
    yaml: 'text/yaml',
  }

  // 确保文件名有正确的扩展名
  const extension = fileType === 'yml' ? '.yml' : `.${fileType}`

  if (fileType === 'yml' || fileType === 'yaml') {
    content = await convertJsonToYaml(content)
  }

  const finalFileName = fileName.endsWith(extension) ? fileName : `${fileName}${extension}`

  // 创建Blob对象
  const blob = new Blob([content], { type: mimeTypes[fileType] })

  // 创建下载链接
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = finalFileName

  // 触发下载
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // 清理URL对象
  URL.revokeObjectURL(url)
}
