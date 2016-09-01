var expect = require('chai').expect;
var Wikia = require('../src/Wikia');

describe('Wikia', function () {
  describe('#fetchImageUrl()', function () {
    it('fetches image url', function () {
      var wikia = new Wikia();

      // See http://beta.json-generator.com/4JFJb--ob
      wikia.imageServingUrl = 'http://beta.json-generator.com/api/json/get/4JFJb--ob';

      return wikia.fetchImageUrl('').then(function (url) {
        expect(url).to.equal('http://example.com/');
      });
    });

    it('sends request with name', function () {
      var wikia = new Wikia();
      wikia.imageServingUrl = 'https://httpbin.org/get?wisTitle=';
      wikia.extractUrl = function extractArgs(json) {
        return json.args.wisTitle;
      };

      return wikia.fetchImageUrl('Blue-Eyes White Dragon').then(function (name) {
        expect(name).to.equal('Blue-Eyes White Dragon');
      });
    });
  });
});
