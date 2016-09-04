'use strict';

function Wikia() {}

Wikia.prototype.imageServingUrl = 'http://yugioh.wikia.com/api.php?action=imageserving&format=json&wisTitle=';
Wikia.prototype.fetchContentsUrl = 'http://yugioh.wikia.com/api.php?format=json&action=query&prop=revisions&rvprop=content&titles=';

Wikia.prototype.URLs = {
  searchCardGallery: 'http://yugioh.wikia.com/api/v1/Search/List?namespaces=100&query=',
};

Wikia.prototype.toJSON = function (response) {
  return response.json();
};

Wikia.prototype.fetchImageUrl = function (name) {
  var url = this.imageServingUrl + encodeURI(name);
  return fetch(url).then(this.toJSON).then(this.extractUrl);
};

Wikia.prototype.extractUrl = function (json) {
  return json.image.imageserving;
};

Wikia.prototype.fetchContents = function (titles) {
  var url = this.fetchContentsUrl + encodeURI(titles.join('|'));
  return fetch(url).then(this.toJSON).then(this.parseContents);
};

Wikia.prototype.parseContents = function (json) {
  var pages = json.query.pages;
  for (var id in pages) {
    if (Object.prototype.hasOwnProperty.call(pages, id)) {
      pages[id].id = pages[id].pageid;
      pages[id].content = pages[id].revisions[0]['*'];
    }
  }

  return pages;
};

Wikia.prototype.searchCardGallery = function (jaName) {
  var url = this.URLs.searchCardGallery + encodeURI(jaName);
  return fetch(url).then(this.toJSON).then(this.parseSearchCardGallery);
};

Wikia.prototype.parseSearchCardGallery = function (json) {
  return json.items;
};

module.exports = Wikia;
