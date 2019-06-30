import { ICardName } from './cardName'
import { getImageUrl } from './client'

interface IRequest extends ICardName {
  query: 'getImageUrl'
}

chrome.runtime.onMessage.addListener((request: IRequest, _, sendResponse) => {
  if (request.query === 'getImageUrl') {
    getImageUrl(request)
      .then(url => {
        if (url) {
          sendResponse(url)
        }
      })
      .catch(error => {
        // tslint:disable-next-line no-console
        console.error(error)
      })
    return true
  }
  return false
})
