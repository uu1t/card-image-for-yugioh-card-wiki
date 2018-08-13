export default class CardImage {
  constructor(private url: string) {}

  appendTo($el: Element) {
    if (!$el.parentElement) {
      return;
    }
    const $img = document.createElement('img');
    $img.src = this.url;
    $img.classList.add('card-image__image');
    $el.parentElement.insertBefore($img, $el.nextSibling);
  }
}
