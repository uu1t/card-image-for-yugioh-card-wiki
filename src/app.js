'use strict';

var Viewer = require('./Viewer');

var $name = document.querySelector('#body > #content_1_0');
if ($name) {
  var viewer = new Viewer($name);
  viewer.showImage();
}
