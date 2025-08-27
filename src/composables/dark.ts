import { useDark, usePreferredDark, useToggle } from '@vueuse/core'

// 暗色模式状态
export const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'theme',
  storage: localStorage,
})

// 切换暗色模式
export const toggleDark = useToggle(isDark)

// 系统主题偏好
export const preferredDark = usePreferredDark()

// 自动跟随系统主题
export const autoTheme = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'auto-theme',
  storage: localStorage,
})

// 设置主题模式
export function setTheme(theme: 'light' | 'dark' | 'auto') {
  if (theme === 'auto') {
    autoTheme.value = preferredDark.value
  }
  else {
    isDark.value = theme === 'dark'
  }
}

// 获取当前主题
export function getCurrentTheme(): 'light' | 'dark' | 'auto' {
  if (autoTheme.value)
    return 'auto'
  return isDark.value ? 'dark' : 'light'
}
