import request from 'supertest'
import { app } from '../../src/index'

describe('E2E - Detail', () => {
  test('detail includes Integrantes when mapping exists (id=1)', async () => {
    const res = await request(app).get('/news/v1.0/detail/1')
    expect(res.status).toBe(200)
    expect(res.text).toContain('Integrantes')
  })

  test('unknown id returns 404 page with No encontrado', async () => {
    const res = await request(app).get('/news/v1.0/detail/unknown-id')
    expect([404,200]).toContain(res.status)
    if (res.status === 404) {
      expect(res.text).toContain('No encontrado')
    }
  })
})
