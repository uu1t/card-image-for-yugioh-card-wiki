import CardName from '../CardName';

function assertParsed(html: string, ja: string | null, en: string | null) {
  document.body.innerHTML = html;
  const $el = document.body.firstChild as Element;
  const name = CardName.parse($el);
  expect(name).toHaveProperty('ja', ja);
  expect(name).toHaveProperty('en', en);
}

describe('.parse()', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('extracts Japanese and English names', () => {
    assertParsed(
      require('./fixtures/h2-blue-eyes-white-dragon.html'),
      '青眼の白龍',
      'Blue-Eyes White Dragon'
    );
  });

  it('extracts Japanese name containing fullwidth slash', () => {
    assertParsed(
      require('./fixtures/h2-stardust-dragon-assult-mode.html'),
      'スターダスト・ドラゴン／バスター',
      'Stardust Dragon/Assault Mode'
    );
  });

  it('extracts English name containing slashes', () => {
    assertParsed(
      require('./fixtures/h2-ddd-duo-dawn-king-kali-yuga.html'),
      'ＤＤＤ双暁王カリ・ユガ',
      'D/D/D Duo-Dawn King Kali Yuga'
    );
  });

  it('extracts Japanese name when there is no English name', () => {
    assertParsed(
      require('./fixtures/h2-ddd-hexblood-king-siegfried.html'),
      'ＤＤＤ呪血王サイフリート',
      null
    );
  });

  it('extracts English name when there is no Japanese name', () => {
    assertParsed(require('./fixtures/h2-hallohallo.html'), null, 'Hallohallo');
  });
});
