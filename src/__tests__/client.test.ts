import * as client from '../client'

describe('_fetchImageUrl()', () => {
  it('returns URL', async () => {
    const url = await client._fetchImageUrl('Blue-Eyes White Dragon')
    expect(url).toMatch(/^https:\/\//)
  })
})

describe('_searchTitle()', () => {
  it('returns title', async () => {
    const title = await client._searchTitle('光の創造神 ホルアクティ')
    expect(title).toBe('Holactie the Creator of Light')
  })
})
