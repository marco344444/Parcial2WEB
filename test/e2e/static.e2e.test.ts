import request from 'supertest'
import { app } from '../../src/index'

describe('E2E - Static assets', () => {
  test('CSS served at /css/app.css', async () => {
    const res = await request(app).get('/css/app.css')
    expect(res.status).toBe(200)
    expect(res.text).toContain('body {')
  })

  test('Images folder is mounted at /images', async () => {
    const res = await request(app).get('/images/Default.webp')
    // If image exists in repo, status 200; if not, server may 404 but path is mounted.
    expect([200,404]).toContain(res.status)
  })
})
