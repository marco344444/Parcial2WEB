import request from 'supertest'
import { app } from '../../src/index'

describe('E2E - 404 page', () => {
  test('unknown route renders polished 404 page', async () => {
    const res = await request(app).get('/esto-no-existe')
    expect(res.status).toBe(404)
    expect(res.text).toContain('No encontrado')
    expect(res.text).toContain('class="error-card"')
    expect(res.text).toContain('href="/news/v1.0/list"')
  })
})
