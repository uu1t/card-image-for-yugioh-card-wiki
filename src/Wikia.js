'use strict';

function Wikia() {}

Wikia.prototype.imageServingUrl = 'http://yugioh.wikia.com/api.php?action=imageserving&format=json&wisTitle=';

Wikia.prototype.fetchImageUrl = function (name) {
  var url = this.imageServingUrl + encodeURI(name);
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    return this.extractUrl(json);
  }.bind(this));
};

Wikia.prototype.extractUrl = function (json) {
  return json.image.imageserving;
};

module.exports = Wikia;
