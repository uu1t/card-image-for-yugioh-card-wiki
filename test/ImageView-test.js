var chai = require('chai');
var dirtyChai = require('dirty-chai');
var expect = chai.expect;
var ImageView = require('../src/ImageView');

chai.use(dirtyChai);

describe('ImageView', function () {
  describe('#constructor()', function () {
    var url = 'http://example.com/';
    var $name = document.createElement('h2');
    var imageView = new ImageView(url, $name);

    it('sets .url property', function () {
      expect(imageView).to.have.property('url', 'http://example.com/');
    });

    it('sets .$name property', function () {
      expect(imageView).to.have.property('$name');
      expect(imageView.$name).to.have.property('nodeName', 'H2');
    });
  });

  describe('#show()', function () {
    before(function () {
      document.body.innerHTML = window.__html__['test/fixtures/index.html'];
    });

    after(function () {
      document.body.innerHTML = '';
    });

    var url = 'https://placehold.it/200x300';

    it('inserts <img> element just after .$name element', function () {
      var $name = document.querySelector('#body > #content_1_0');
      var imageView = new ImageView(url, $name);
      imageView.show();
      var $image = $name.nextSibling;
      expect($image).to.have.property('nodeName', 'IMG');
      expect($image).to.have.property('src', 'https://placehold.it/200x300');
      expect($image.classList.contains('image-viewer__image')).to.be.ok();
    });
  });
});
