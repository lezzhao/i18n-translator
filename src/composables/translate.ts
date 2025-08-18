const translatedMap = new Map<string, string>()
const translatorMap = new Map<string, any>()

async function createTranslator(options?: {
  source: string
  target: string
}) {
  const { source = 'zh', target = 'en' } = options || {}

  const key = `${source}-${target}`

  if (translatorMap.has(key)) {
    return translatorMap.get(key)
  }

  const translator = await window.Translator.create({
    sourceLanguage: source,
    targetLanguage: target,
  })
  translatorMap.set(key, translator)
  return translator
}

export async function translate(text: string, options?: {
  source: string
  target: string
}) {
  if (translatedMap.has(text)) {
    return translatedMap.get(text)
  }
  const translator = await createTranslator(options)
  const translated = await translator.translate(text)
  translatedMap.set(text, translated)
  return translated
}

const regex = /['"]?(\S*?)['"]?\s*:\s*['"](.*?)['"]/g
export async function translateText(text: string, options?: {
  source: string
  target: string
}) {
  const matches = text.matchAll(regex)
  const translatedMap = new Map<string, string>()
  for (const match of matches) {
    const [, p1, p2] = match
    if (!translatedMap.has(`${p1}-${p2}`)) {
      const translated = await translate(p2, options)
      translatedMap.set(`${p1}-${p2}`, translated)
    }
  }
  return text.replaceAll(regex, (str: string, p1: string, p2: string) => {
    return str.replace(p2, translatedMap.get(`${p1}-${p2}`) || p2)
  })
}
