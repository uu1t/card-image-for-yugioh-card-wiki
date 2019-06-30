export interface ICardName {
  en: string | null
  ja: string | null
}

export function display(cardName: ICardName): string {
  const names = [cardName.ja || '-', cardName.en].filter(Boolean)
  return '《' + names.join('/') + '》'
}

export function parse($el: Element): ICardName | null {
  if ($el.textContent) {
    const re = /《([^/》]+)\/?([^》]*)》/
    const found = $el.textContent.match(re)
    if (found) {
      const ja = found[1] !== '-' ? removeRuby(found[1]) : null
      const en = found[2] || null
      return {
        en,
        ja
      }
    }
  }
  return null
}

function removeRuby(name: string) {
  return name.replace(/\([^)]+\)/g, '')
}
