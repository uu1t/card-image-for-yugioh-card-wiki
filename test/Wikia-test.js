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

    it('sends request with name', function () {
      var wikia = new Wikia();
      wikia.imageServingUrl = 'https://httpbin.org/get?wisTitle=';
      wikia.extractUrl = parseHTTPBinArg.bind(null, 'wisTitle');

      return wikia.fetchImageUrl('Blue-Eyes White Dragon').then(function (name) {
        expect(name).to.equal('Blue-Eyes White Dragon');
      });
    });
  });

  describe('#fetchContents()', function () {
    it('fetches contents', function () {
      var wikia = new Wikia();

      // See http://myjson.com/25v0k
      wikia.fetchContentsUrl = 'https://api.myjson.com/bins/25v0k';

      return wikia.fetchContents([]).then(function (contents) {
        expect(contents).to.be.a('object');
        Object.keys(contents).forEach(function (id) {
          expect(contents[id]).to.contain.all.keys('id', 'title', 'content');
        });
      });
    });

    it('sends requests with titles delimited with |', function () {
      var wikia = new Wikia();
      wikia.fetchContentsUrl = 'https://httpbin.org/get?titles=';
      wikia.parseContents = parseHTTPBinArg.bind(null, 'titles');

      return wikia.fetchContents(['t1', 't2', 't3']).then(function (titles) {
        expect(titles).to.equal('t1|t2|t3');
      });
    });
  });

  describe('#parseContents()', function () {
    it('parses contents json', function () {
      var wikia = new Wikia();
      var json = require('./fixtures/contents-a-b-c.json');
      var contents = wikia.parseContents(json);

      expect(contents).to.have.all.keys('567356', '567360', '567361');
      expect(contents[567356]).to.have.property('id', 567356);
      expect(contents[567356]).to.have.property('content', 'Ａ－アサルト・コア');
      expect(contents[567360]).to.have.property('id', 567360);
      expect(contents[567360]).to.have.property('content', 'Ｂ－バスター・ドレイク');
      expect(contents[567361]).to.have.property('id', 567361);
      expect(contents[567361]).to.have.property('content', 'Ｃ－クラッシュ・ワイバーン');
    });
  });
});
