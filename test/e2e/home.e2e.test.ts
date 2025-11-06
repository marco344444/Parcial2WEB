import request from 'supertest'
import { app } from '../../src/index'

describe('E2E - Home', () => {
  test('GET / returns 200 and contains main hero title', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.text).toContain('Noticias y Proyectos UPB')
  })

  test('Home links to news and register', async () => {
    const res = await request(app).get('/')
    expect(res.text).toContain('href="/news/v1.0/list"')
    expect(res.text).toContain('href="/users/v1.0/register"')
  })
})
