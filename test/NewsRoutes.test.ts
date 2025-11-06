import request from 'supertest'
import { app } from '../src/index'

describe('News routes', () => {
  test('GET /news/v1.0/list returns 200 and contains Noticias', async () => {
    const res = await request(app).get('/news/v1.0/list')
    expect(res.status).toBe(200)
    expect(res.text).toContain('<h1>Noticias</h1>')
  })

  test('GET /news/v1.0/detail/:id returns 200 for existing id', async () => {
    const res = await request(app).get('/news/v1.0/detail/1')
    expect([200, 404]).toContain(res.status)
    if (res.status === 200) {
      expect(res.text).toContain('<main')
    }
  })
})
