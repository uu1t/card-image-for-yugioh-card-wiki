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
    it('sets .jaName and .enName properties', function () {
      document.body.innerHTML = window.__html__['test/fixtures/h2-blue-eyes-white-dragon.html'];
      var $name = document.body.firstChild;
      var nameView = new NameView($name);
      expect(nameView).to.have.property('jaName', '青眼の白龍');
      expect(nameView).to.have.property('enName', 'Blue-Eyes White Dragon');
    });

    it('extracts Japanese name containing fullwidth slash, and English name', function () {
      document.body.innerHTML =
        window.__html__['test/fixtures/h2-stardust-dragon-assult-mode.html'];
      var $name = document.body.firstChild;
      var nameView = new NameView($name);
      expect(nameView).to.have.property('jaName', 'スターダスト・ドラゴン／バスター');
      expect(nameView).to.have.property('enName', 'Stardust Dragon/Assault Mode');
    });

    it('extracts Japanese name, and English name containing slashes', function () {
      document.body.innerHTML =
        window.__html__['test/fixtures/h2-ddd-duo-dawn-king-kali-yuga.html'];
      var $name = document.body.firstChild;
      var nameView = new NameView($name);
      expect(nameView).to.have.property('jaName', 'ＤＤＤ双暁王カリ・ユガ');
      expect(nameView).to.have.property('enName', 'D/D/D Duo-Dawn King Kali Yuga');
    });

    it('extracts only Japanese name when there is no English name', function () {
      document.body.innerHTML =
        window.__html__['test/fixtures/h2-ddd-hexblood-king-siegfried.html'];
      var $name = document.body.firstChild;
      var nameView = new NameView($name);
      expect(nameView).to.have.property('jaName', 'ＤＤＤ呪血王サイフリート');
      expect(nameView).to.have.property('enName', '');
    });
  });
});
