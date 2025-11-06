import request from 'supertest'
import { app } from '../src/index'

describe('News routes - extended', () => {
  test('search by presenter returns results', async () => {
    const res = await request(app).get('/news/v1.0/list?q=Equipo%20VIZLA&limit=100')
    expect(res.status).toBe(200)
    expect(res.text).toContain('VIZLA')
  })

  test('filter by jornada shows Jornada 3 badge somewhere', async () => {
    const res = await request(app).get('/news/v1.0/list?jornada=3&limit=100')
    expect(res.status).toBe(200)
    expect(res.text).toMatch(/Jornada\s*3/) 
  })

  test('limit=4 caps cards to 4', async () => {
    const res = await request(app).get('/news/v1.0/list?limit=4')
    expect(res.status).toBe(200)
    const cardCount = (res.text.match(/class="card"/g) || []).length
    expect(cardCount).toBeLessThanOrEqual(4)
  })

  test('filter by category IA y ML returns 200', async () => {
    const res = await request(app).get('/news/v1.0/list?tag=IA%20y%20ML&limit=100')
    expect(res.status).toBe(200)
    // Should at least render the page; specific card presence can vary by dataset order
    expect(res.text).toContain('<h1>Noticias</h1>')
  })

  test('detail page shows Expositor label', async () => {
    const res = await request(app).get('/news/v1.0/detail/1')
    expect(res.status).toBe(200)
    expect(res.text).toMatch(/Expositor:/)
  })
})
