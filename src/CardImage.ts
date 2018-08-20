export default class CardImage {
  constructor(private url: string) {}

  public appendTo($el: Element) {
    if (!$el.parentElement || !$el.nextElementSibling) {
      return;
    }
    const $sibling = $el.nextElementSibling;

    const $img = document.createElement('img');
    $img.src = this.url;
    $img.classList.add('card-image__image');

    // Set margin dinamically because font size of <pre> is different on chrome and firefox for some reason.
    $img.style.marginLeft = window.getComputedStyle($sibling).marginLeft;

    $el.parentElement.insertBefore($img, $sibling);
  }
}
