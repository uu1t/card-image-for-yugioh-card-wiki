'use strict';

var NameView = require('./NameView');
var ImageView = require('./ImageView');
var Wikia = require('./Wikia');

function Viewer($name) {
  this.nameView = new NameView($name);
}

Viewer.prototype.showImage = function () {
  if (!this.nameView.name) {
    return;
  }

  var wikia = new Wikia();
  wikia.fetchImageUrl(this.nameView.name, function (imageUrl) {
    var imageView = new ImageView(imageUrl, this.nameView.$el);
    imageView.show();
  }.bind(this));
};

module.exports = Viewer;
