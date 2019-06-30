import CardImage from './CardImage'
import { display, parse } from './cardName'

// tslint:disable no-console
;(async () => {
  const $name = document.querySelector('#body > #content_1_0')
  if (!$name) {
    return
  }

  const name = parse($name)
  if (!name) {
    return
  }

  chrome.runtime.sendMessage({ query: 'getImageUrl', ...name }, (url: string | null) => {
    if (url) {
      new CardImage(url).appendTo($name)
    } else {
      console.log('[card-image-for-yugioh-card-wiki] image not found:', display(name))
    }
  })
})()
