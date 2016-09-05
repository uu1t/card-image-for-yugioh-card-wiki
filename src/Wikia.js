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

Wikia.prototype.fetchImageUrlForJa = function (jaName) {
  return this.searchCardGallery(jaName)
    .then(this.cardGalleryToEnNames)
    .then(this.fetchContents.bind(this))
    .then(this.searchContentsFor.bind(this, jaName))
    .then(this.fetchImageUrl.bind(this));
};

Wikia.prototype.searchContentsFor = function (jaName, contents) {
  for (var i = 0; i < contents.length; i++) {
    if (this.contentToJaName(contents[i].content) === jaName) {
      return contents[i].title;
    }
  }

  return Promise.reject(new Error('Card not found: ' + jaName));
};

Wikia.prototype.contentToJaName = function (content) {
  var re = /\n\| ja_name += ([^\n]+)\n/;
  var found = content.match(re);
  if (found) {
    return this.toBaseJaName(found[1]);
  }
};

Wikia.prototype.toBaseJaName = function (name) {
  var re = /{{Ruby\|([^|]+)\|([^}]+)}}/g;
  return name
    .replace(re, '$1')
    .replace(/．/g, '.');  // convert to half width
};

Wikia.prototype.fetchContents = function (titles) {
  var url = this.fetchContentsUrl + encodeURI(titles.join('|'));
  return fetch(url).then(this.toJSON).then(this.parseContents);
};

Wikia.prototype.parseContents = function (json) {
  var pages = json.query.pages;
  return Object.keys(pages).map(function (id) {
    return {
      id: pages[id].pageid,
      title: pages[id].title,
      content: pages[id].revisions[0]['*'],
    };
  });
};

Wikia.prototype.searchCardGallery = function (jaName) {
  var url = this.URLs.searchCardGallery + encodeURI(jaName);
  return fetch(url).then(this.toJSON).then(this.parseSearchCardGallery);
};

Wikia.prototype.parseSearchCardGallery = function (json) {
  return json.items;
};

Wikia.prototype.cardGalleryToEnNames = function (items) {
  var re = /^Card Gallery:(.+)$/;
  return items.map(function (item) {
    var found = item.title.match(re);
    if (found) {
      return found[1];
    }
  }).filter(Boolean);
};

module.exports = Wikia;
