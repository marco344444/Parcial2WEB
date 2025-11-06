import NewsModel from '../src/news/model/NewsModel'

describe('NewsModel', () => {
  const model = new NewsModel()

  test('getAllNews returns array', () => {
    const all = model.getAllNews()
    expect(Array.isArray(all)).toBe(true)
    expect(all.length).toBeGreaterThan(0)
  })

  test('search returns filtered results', () => {
    const res = model.search('plataforma')
    expect(res.every(r => r.title.toLowerCase().includes('plataforma') || r.summary.toLowerCase().includes('plataforma') || r.content.toLowerCase().includes('plataforma'))).toBeTruthy()
  })

  test('paginate splits results', () => {
    const items = model.getAllNews()
    const page1 = model.paginate(items, 1, 2)
    const page2 = model.paginate(items, 2, 2)
    expect(page1.data.length).toBeLessThanOrEqual(2)
    expect(page2.data.length).toBeLessThanOrEqual(2)
    if (page1.data[0] && page2.data[0]) {
      expect(page1.data[0].id).not.toBe(page2.data[0].id)
    } else {
      // If not enough items for two pages, at least the arrays exist
      expect(Array.isArray(page1.data)).toBe(true)
      expect(Array.isArray(page2.data)).toBe(true)
    }
  })
})
