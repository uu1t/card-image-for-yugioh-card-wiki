export default class CardName {
  private constructor(public ja: string | null, public en: string | null) {}

  display(): string {
    const names = [this.ja || '-', this.en].filter(Boolean);
    return '《' + names.join('/') + '》';
  }

  static parse($el: Element): CardName | null {
    if ($el.textContent) {
      const re = /《([^/》]+)\/?([^》]*)》/;
      const found = $el.textContent.match(re);
      if (found) {
        const ja = found[1] !== '-' ? removeRuby(found[1]) : null;
        const en = found[2] || null;
        return new CardName(ja, en);
      }
    }
    return null;
  }
}

function removeRuby(name: string) {
  return name.replace(/\([^)]+\)/g, '');
}
