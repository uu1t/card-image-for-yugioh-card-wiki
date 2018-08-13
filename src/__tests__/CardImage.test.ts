import CardImage from '../CardImage';

describe('.appendTo()', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('inserts <img> element', () => {
    document.body.innerHTML = require('./fixtures/index.html');
    const $el = document.querySelector('#body > #content_1_0') as Element;

    const image = new CardImage('https://example.com/');
    image.appendTo($el);

    const $image = document.querySelector(
      '#body > .card-image__image'
    ) as HTMLImageElement;
    expect($image).toHaveProperty('src', 'https://example.com/');
  });
});
