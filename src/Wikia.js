'use strict';

function Wikia() {}

Wikia.prototype.imageServingUrl = 'http://yugioh.wikia.com/api.php?action=imageserving&format=json&wisTitle=';

Wikia.prototype.fetchImageUrl = function (name, callback) {
  var url = this.imageServingUrl + encodeURI(name);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    callback(json.image.imageserving);
  }).catch(function (error) {
    console.error(error);
  });
};

module.exports = Wikia;
