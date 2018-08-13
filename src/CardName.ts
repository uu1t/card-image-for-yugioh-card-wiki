export default class CardName {
  public static parse($el: Element): CardName | null {
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

  private constructor(public ja: string | null, public en: string | null) {}

  public display(): string {
    const names = [this.ja || '-', this.en].filter(Boolean);
    return '《' + names.join('/') + '》';
  }
}

function removeRuby(name: string) {
  return name.replace(/\([^)]+\)/g, '');
}
