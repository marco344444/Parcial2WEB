import NewsModel from '../src/news/model/NewsModel'
import type News from '../src/news/types/News'

describe('NewsModel', () => {
  const model = new NewsModel()

  test('uniqueTags returns the 10 general categories', () => {
    const tags = model.uniqueTags()
    expect(tags).toHaveLength(10)
    expect(tags).toEqual([
      'IA y ML',
      'Web',
      'Móvil',
      'IoT/Hardware',
      'Juegos',
      'Cloud/DevOps',
      'Seguridad',
      'Datos/BI',
      'UX/UI',
      'Otros',
    ])
  })

  test('withCategoryTags maps fine-grained tags to categories', () => {
    const sample: News[] = [
      { id: 'x', title: 't', summary: '', content: '', images: [], date: '2024-01-01', presenters: [], tags: ['react', 'ia'] },
      { id: 'y', title: 't2', summary: '', content: '', images: [], date: '2024-01-01', presenters: [], tags: ['arduino'] },
    ]
    const mapped = model.withCategoryTags(sample)
    const byId = new Map(mapped.map(n => [n.id, n]))
    expect(byId.get('x')?.tags?.sort()).toEqual(['IA y ML', 'Web'])
    expect(byId.get('y')?.tags).toEqual(['IoT/Hardware'])
  })

  test('applyFilters by category (tag) works', () => {
    const items: News[] = [
      { id: '1', title: 'AI', summary: '', content: '', images: [], date: '2024-01-01', presenters: [], tags: ['ia'] },
      { id: '2', title: 'Frontend', summary: '', content: '', images: [], date: '2024-01-01', presenters: [], tags: ['react'] },
      { id: '3', title: 'Other', summary: '', content: '', images: [], date: '2024-01-01', presenters: [], tags: ['otro'] },
    ]
    const filteredAI = model.applyFilters(items, { tag: 'IA y ML' })
    expect(filteredAI.map(n => n.id)).toEqual(['1'])
    const filteredWeb = model.applyFilters(items, { tag: 'Web' })
    expect(filteredWeb.map(n => n.id)).toEqual(['2'])
  })

  test('applyFilters by jornada works with details "Jornada N"', () => {
    const items: News[] = [
      { id: 'a', title: 'A', summary: '', content: '', images: [], date: '2024-01-01', presenters: [], details: 'Jornada 3 - Foo' },
      { id: 'b', title: 'B', summary: '', content: '', images: [], date: '2024-01-01', presenters: [], details: 'Jornada 2 - Bar' },
    ] as News[]
    const filtered = model.applyFilters(items, { jornada: '3' })
    expect(filtered.map(n => n.id)).toEqual(['a'])
  })

  test('paginate returns correct slice and page count', () => {
    const items = Array.from({ length: 10 }, (_, i) => ({ id: String(i+1), title: 't', summary: '', content: '', images: [], date: '2024-01-01', presenters: [] })) as News[]
    const { data, page, pages } = model.paginate(items, 2, 4)
    expect(page).toBe(2)
    expect(pages).toBe(3)
    expect(data.map(n => n.id)).toEqual(['5', '6', '7', '8'])
  })
})
