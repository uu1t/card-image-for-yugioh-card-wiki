import CardName from './CardName';

const origin = 'http://yugioh.wikia.com';

const endpoints = {
  imageserving: origin + '/api.php?format=json&action=imageserving&wisTitle=',
  search: origin + '/wiki/Special:Search?ns0=1&search='
};

interface ImageservingResponse {
  image?: {
    imageserving?: string;
  };
}

export async function getImageUrl(cardName: CardName): Promise<string | null> {
  const title: string | null =
    cardName.en || (cardName.ja ? await _searchTitle(cardName.ja) : null);
  if (title) {
    const url = await _fetchImageUrl(title);
    if (url) {
      return url;
    }
  }
  return null;
}

export async function _fetchImageUrl(title: string): Promise<string | null> {
  const url = endpoints.imageserving + encodeURIComponent(title);
  const response = await fetch(url);
  if (response.ok) {
    const json: ImageservingResponse = await response.json();
    if (json.image && json.image.imageserving) {
      return json.image.imageserving;
    }
  }
  return null;
}

export async function _searchTitle(name: string): Promise<string | null> {
  const url = endpoints.search + encodeURIComponent(name);
  const response = await fetch(url);
  if (response.ok) {
    const text = await response.text();
    const html = document.createElement('html');
    html.innerHTML = text;
    const $els = html.querySelectorAll('.result h1 .result-link');
    for (const $el of $els) {
      const title = $el.textContent;
      if (title && !title.match(/^List of /)) {
        return title;
      }
    }
  }
  return null;
}
