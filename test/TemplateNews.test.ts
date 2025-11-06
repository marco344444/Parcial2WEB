import { renderNewsListHtml, renderNewsDetailHtml } from '../src/template/news'

const sampleNews = [
  {
    id: 'n1',
    title: 'Proyecto IA para salud',
    summary: 'Clasificación médica con IA',
    content: 'Contenido',
    images: ['/images/Default.webp'],
    date: '2025-01-01',
    presenters: ['Equipo SaludIA'],
    details: 'Jornada 3 - XYZ',
    tags: ['ia', 'salud']
  },
  {
    id: 'n2',
    title: 'Web moderna',
    summary: 'Sitio responsive',
    content: 'Contenido 2',
    images: ['/images/Default.webp'],
    date: '2025-01-01',
    presenters: ['Equipo WebX'],
    details: 'Jornada 2 - ABC',
    tags: ['web']
  }
]

describe('template/news', () => {
  test('list renders H1 and search placeholder', () => {
    const html = renderNewsListHtml(sampleNews as any, 1, 1, '', 4, { tags: ['IA y ML'], jornadas: ['3'] })
    expect(html).toContain('<h1>Noticias</h1>')
    expect(html).toContain('placeholder="Buscar por título, etiqueta, jornada o expositor..."')
  })

  test('list renders cards with titles and badges', () => {
    const html = renderNewsListHtml(sampleNews as any, 1, 1, '', 4, {})
    expect(html).toContain('Proyecto IA para salud')
    expect(html).toContain('Jornada 3')
  })

  test('list includes pagination nav', () => {
    const html = renderNewsListHtml(sampleNews as any, 2, 3, '', 4, {})
    expect(html).toContain('aria-label="Paginación"')
    expect(html).toContain('aria-current="page">2<')
  })

  test('detail renders hero image and title', () => {
    const html = renderNewsDetailHtml({ ...sampleNews[0]!, members: ['Ana', 'Luis'] } as any)
    expect(html).toContain('class="news-hero"')
    expect(html).toContain(sampleNews[0]!.title)
  })

  test('detail renders tags and members when present', () => {
    const html = renderNewsDetailHtml({ ...sampleNews[0], members: ['Ana', 'Luis'] } as any)
    expect(html).toContain('Integrantes')
    expect(html).toContain('<span class="tag">')
  })
})
