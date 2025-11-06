import request from 'supertest'
import { app } from '../../src/index'

describe('News E2E', () => {
  test('GET /news/v1.0/list returns 200 and contains Noticias', async () => {
    const res = await request(app).get('/news/v1.0/list')
    expect(res.status).toBe(200)
    expect(res.text).toContain('Noticias')
  })

  test('GET /news/v1.0/detail/1 returns 200 and contains Presentación', async () => {
    const res = await request(app).get('/news/v1.0/detail/1')
    expect(res.status).toBe(200)
    expect(res.text).toContain('Presentación')
  })
})
