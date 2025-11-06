import { renderError } from '../src/template/error'

describe('template/error', () => {
  test('renderError with Not found shows 404 title', () => {
    const html = renderError('Not found')
    expect(html).toContain('404')
    expect(html).toContain('No encontrado')
  })

  test('renderError with generic message shows 500 title', () => {
    const html = renderError('Algo falló')
    expect(html).toContain('500')
    expect(html).toContain('Algo salió mal')
  })

  test('includes primary and secondary actions', () => {
    const html = renderError('Not found')
    expect(html).toContain('href="/"')
    expect(html).toContain('href="/news/v1.0/list"')
    expect(html).toContain('Regresar')
  })

  test('embeds an illustration (SVG)', () => {
    const html = renderError('Not found')
    expect(html).toContain('<svg')
    expect(html).toContain('</svg>')
  })

  test('shows escaped custom message', () => {
    const html = renderError('<b>Mal</b> & Error')
    expect(html).toContain('&lt;b&gt;Mal&lt;/b&gt; &amp; Error')
  })
})
