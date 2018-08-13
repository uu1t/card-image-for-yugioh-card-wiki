// tslint:disable:no-console
import CardImage from './CardImage';
import CardName from './CardName';
import * as wikia from './wikia';

(async () => {
  const $name = document.querySelector('#body > #content_1_0');
  if (!$name) {
    return;
  }

  const name = CardName.parse($name);
  if (!name) {
    return;
  }

  const url = await wikia.getImageUrl(name).catch(e => console.error(e));
  if (url) {
    new CardImage(url).appendTo($name);
  } else {
    console.log('Image not found:', name.display());
  }
})();
