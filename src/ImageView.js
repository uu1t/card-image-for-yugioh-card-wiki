'use strict';

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

module.exports = ImageView;
