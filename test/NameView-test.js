var expect = require('chai').expect;
var NameView = require('../src/NameView');

describe('NameView', function () {
  afterEach(function () {
    document.body.innerHTML = '';
  });

  describe('#constructor()', function () {
    it('sets .$el property', function () {
      document.body.innerHTML = window.__html__['test/fixtures/h2-blue-eyes-white-dragon.html'];
      var $name = document.body.firstChild;
      var nameView = new NameView($name);
      expect(nameView).to.have.property('$el');
      expect(nameView.$el).to.have.property('nodeName', 'H2');
    });
  });

  describe('#setName()', function () {
    it('sets .name property', function () {
      document.body.innerHTML = window.__html__['test/fixtures/h2-blue-eyes-white-dragon.html'];
      var $name = document.body.firstChild;
      var nameView = new NameView($name);
      expect(nameView).to.have.property('name', 'Blue-Eyes White Dragon');
    });

    it('extracts English name from the string containing slash (1)', function () {
      document.body.innerHTML =
        window.__html__['test/fixtures/h2-stardust-dragon-assult-mode.html'];
      var $name = document.body.firstChild;
      var nameView = new NameView($name);
      expect(nameView).to.have.property('name', 'Stardust Dragon/Assault Mode');
    });

    it('extracts English name from the string containing slash (2)', function () {
      document.body.innerHTML =
        window.__html__['test/fixtures/h2-ddd-duo-dawn-king-kali-yuga.html'];
      var $name = document.body.firstChild;
      var nameView = new NameView($name);
      expect(nameView).to.have.property('name', 'D/D/D Duo-Dawn King Kali Yuga');
    });
  });
});
