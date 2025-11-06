import { escapeHtml, head, footer, renderMenu } from '../src/template/layout'

describe('layout utilities', () => {
  test('escapeHtml escapes special characters', () => {
    const input = `<script>"&'</script>`
    const out = escapeHtml(input)
    expect(out).toBe('&lt;script&gt;&quot;&amp;&#39;&lt;/script&gt;')
  })

  test('head includes stylesheet link and given title', () => {
    const html = head('My Title')
    expect(html).toContain('<link rel="stylesheet" href="/css/app.css">')
    expect(html).toContain('<title>My Title</title>')
  })

  test('footer contains current year and closing tags', () => {
    const html = footer()
    const year = new Date().getFullYear().toString()
    expect(html).toContain(`© ${year}`)
    expect(html).toContain('</body></html>')
  })

  test('renderMenu contains main navigation links', () => {
    const html = renderMenu()
    expect(html).toContain('href="/"')
    expect(html).toContain('href="/news/v1.0/list"')
    expect(html).toContain('href="/users/v1.0/register"')
  })

  test('renderMenu brand is UPBnews', () => {
    const html = renderMenu()
    expect(html).toContain('UPBnews')
  })
})