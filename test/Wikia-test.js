var expect = require('chai').expect;
var Wikia = require('../src/Wikia');

function parseHTTPBinArg(arg, json) {
  return json.args[arg];
}

describe('Wikia', function () {
  describe('#fetchImageUrl()', function () {
    it('fetches image url', function () {
      var wikia = new Wikia();

      // See http://myjson.com/3092o
      wikia.imageServingUrl = 'https://api.myjson.com/bins/3092o';

      return wikia.fetchImageUrl('').then(function (url) {
        expect(url).to.equal('http://example.com/');
      });
    });

    it('sends a request with titles', function () {
      var wikia = new Wikia();
      wikia.imageServingUrl = 'https://httpbin.org/get?wisTitle=';
      wikia.extractUrl = parseHTTPBinArg.bind(null, 'wisTitle');

      return wikia.fetchImageUrl('Blue-Eyes White Dragon').then(function (name) {
        expect(name).to.equal('Blue-Eyes White Dragon');
      });
    });

    it('sends a request with a title containing &', function () {
      var wikia = new Wikia();
      wikia.imageServingUrl = 'https://httpbin.org/get?wisTitle=';
      wikia.extractUrl = parseHTTPBinArg.bind(null, 'wisTitle');

      return wikia.fetchImageUrl('Gogogo Aristera & Dexia').then(function (name) {
        expect(name).to.equal('Gogogo Aristera & Dexia');
      });
    });
  });

  describe('#fetchContents()', function () {
    it('fetches contents', function () {
      var wikia = new Wikia();

      // See http://myjson.com/25v0k
      wikia.fetchContentsUrl = 'https://api.myjson.com/bins/25v0k';

      return wikia.fetchContents([]).then(function (contents) {
        contents.forEach(function (content) {
          expect(content).to.contain.all.keys('id', 'title', 'content');
        });
      });
    });

    it('sends a request with titles delimited with |', function () {
      var wikia = new Wikia();
      wikia.fetchContentsUrl = 'https://httpbin.org/get?titles=';
      wikia.parseContents = parseHTTPBinArg.bind(null, 'titles');

      return wikia.fetchContents(['t1', 't2', 't3']).then(function (titles) {
        expect(titles).to.equal('t1|t2|t3');
      });
    });

    it('sends a request with titles containing &', function () {
      var wikia = new Wikia();
      wikia.fetchContentsUrl = 'https://httpbin.org/get?titles=';
      wikia.parseContents = parseHTTPBinArg.bind(null, 'titles');

      return wikia.fetchContents(['a & b']).then(function (titles) {
        expect(titles).to.equal('a & b');
      });
    });
  });

  describe('#parseContents()', function () {
    it('parses contents json', function () {
      var wikia = new Wikia();
      var json = require('./fixtures/contents-a-b-c.json');

      var contents = wikia.parseContents(json);
      expect(contents).to.deep.equal([
        { id: 567356, title: 'A-Assault Core', content: 'Ａ－アサルト・コア' },
        { id: 567360, title: 'B-Buster Drake', content: 'Ｂ－バスター・ドレイク' },
        { id: 567361, title: 'C-Crush Wyvern', content: 'Ｃ－クラッシュ・ワイバーン' },
      ]);
    });
  });

  describe('#contentToJaName', function () {
    it('extracts Japanese name', function () {
      var wikia = new Wikia();
      var json = require('./fixtures/contents-a-b-c-raw.json');
      var ids = [567356, 567360, 567361];
      var contents = ids.map(function (id) {
        return json.query.pages[id].revisions[0]['*'];
      });

      var jaNames = contents.map(wikia.contentToJaName.bind(wikia));
      expect(jaNames[0]).to.equal('Ａ－アサルト・コア');
      expect(jaNames[1]).to.equal('Ｂ－バスター・ドレイク');
      expect(jaNames[2]).to.equal('Ｃ－クラッシュ・ワイバーン');
    });
  });

  describe('#toBaseJaName', function () {
    it('removes ruby text', function () {
      var wikia = new Wikia();
      var jaName = "{{Ruby|Ｄ|ディー}}{{Ruby|Ｄ|ディー}}{{Ruby|Ｄ|ディー}}{{Ruby|呪|じゅ}}{{Ruby|血|けつ}}{{Ruby|王|おう}}サイフリート";

      var baseJaName = wikia.toBaseJaName(jaName);
      expect(baseJaName).to.equal('ＤＤＤ呪血王サイフリート');
    });

    it('converts fullwidth periods to halfwidth ones', function () {
      var wikia = new Wikia();
      var jaName = "{{Ruby|Ｄ|ディー}}．{{Ruby|Ｄ|ディー}}．クロウ";

      var baseJaName = wikia.toBaseJaName(jaName);
      expect(baseJaName).to.equal('Ｄ.Ｄ.クロウ');
    });
  });

  describe('#searchCardGallery()', function () {
    it('fetches card gallery items', function () {
      var wikia = new Wikia();

      // See http://myjson.com/2zobg
      wikia.URLs = { searchCardGallery: 'https://api.myjson.com/bins/2zobg' };

      return wikia.searchCardGallery('').then(function (items) {
        expect(items).to.be.a('array');
        items.forEach(function (item) {
          expect(item).to.contain.all.keys('id', 'title');
        });
      });
    });

    it('sends a request with URL-encoded query', function () {
      var wikia = new Wikia();
      wikia.URLs = { searchCardGallery: 'https://httpbin.org/get?query=' };
      wikia.parseSearchCardGallery = parseHTTPBinArg.bind(null, 'query');

      return wikia.searchCardGallery('青眼の白龍').then(function (query) {
        expect(query).to.equal('青眼の白龍');
      });
    });
  });

  describe('#cardGalleryToEnNames()', function () {
    it('extracts English names from card gallery', function () {
      var wikia = new Wikia();
      var items = [
        { title: 'Card Gallery:ABC' },
        { title: 'Card Gallery:DEF' },
      ];

      var enNames = wikia.cardGalleryToEnNames(items);
      expect(enNames).to.deep.equal(['ABC', 'DEF']);
    });

    it('skips items whose title are not card gallery', function () {
      var wikia = new Wikia();
      var items = [
        { title: 'Card Gallery:ABC' },
        { title: 'NOT Card Callery:123' },
        { title: 'Card Gallery:DEF' },
      ];

      var enNames = wikia.cardGalleryToEnNames(items);
      expect(enNames).to.deep.equal(['ABC', 'DEF']);
    });
  });
});
