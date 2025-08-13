const translatedMap = new Map<string, string>()
const translatorMap = new Map<string, any>()

async function createTranslator(options?: {
  source: string
  target: string
}) {
  const { source = 'en', target = 'zh' } = options || {}

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
