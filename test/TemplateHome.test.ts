import { renderHome } from '../src/template/home'

describe('template/home', () => {
  test('contains main hero title Noticias y Proyectos UPB', () => {
    const html = renderHome()
    expect(html).toContain('Noticias y Proyectos UPB')
  })

  test('document title mentions Jornada 2025-II', () => {
    const html = renderHome()
    expect(html).toContain('Jornada de Proyectos Integradores 2025-II')
  })

  test('has a link to news list', () => {
    const html = renderHome()
    expect(html).toContain('href="/news/v1.0/list"')
  })

  test('has a link to register', () => {
    const html = renderHome()
    expect(html).toContain('href="/users/v1.0/register"')
  })

  test('includes What you will find section', () => {
    const html = renderHome()
    expect(html).toContain('¿Qué encontrarás aquí?')
  })
})
