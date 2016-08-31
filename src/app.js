'use strict';

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

function NameView($el) {
  this.$el = $el;
  this.setName();
}

NameView.prototype.re = /《([^/]+)\/([^》]+)》/;

NameView.prototype.setName = function () {
  if (!this.$el) {
    return;
  }

  var matchArray = this.$el.textContent.match(this.re);
  if (!matchArray || matchArray.length < 3) {
    return;
  }

  this.name = matchArray[2];
};

function ImageView(url, $name) {
  this.url = url;
  this.$name = $name;
}

ImageView.prototype.id = 'image-viewer_img';

ImageView.prototype.show = function () {
  var $img = document.createElement('img');
  $img.src = this.url;
  $img.id = this.id;
  this.$name.parentElement.insertBefore($img, this.$name.nextSibling);
};

var viewer = new Viewer(document.querySelector('#body > #content_1_0'));
viewer.showImage();
