'use strict';

var NameView = require('./NameView');
var ImageView = require('./ImageView');
var Wikia = require('./Wikia');

function Viewer($name) {
  this.nameView = new NameView($name);
}

Viewer.prototype.showImage = function () {
  if (!this.nameView.enName && !this.nameView.jaName) {
    return;
  }

  var wikia = new Wikia();
  var promise;
  if (this.nameView.enName) {
    promise = wikia.fetchImageUrl(this.nameView.enName);
  } else if (this.nameView.jaName) {
    promise = wikia.fetchImageUrlForJa(this.nameView.jaName);
  }

  promise.then(this.showImageView.bind(this)).catch(console.error.bind(console));
};

Viewer.prototype.showImageView = function (url) {
  var imageView = new ImageView(url, this.nameView.$el);
  imageView.show();
};

module.exports = Viewer;
