import request from 'supertest'
import { app } from '../../src/index'

describe('E2E - Filters and search', () => {
  test('combination: q + tag + jornada returns 200 and shows Jornada 3', async () => {
    const res = await request(app).get('/news/v1.0/list?q=ia&tag=IA%20y%20ML&jornada=3&limit=100')
    expect(res.status).toBe(200)
    expect(res.text).toMatch(/Jornada\s*3/)
  })

  test('limit=4 shows at most 4 cards', async () => {
    const res = await request(app).get('/news/v1.0/list?limit=4')
    expect(res.status).toBe(200)
    const cards = (res.text.match(/class=\"card\"/g) || []).length
    expect(cards).toBeLessThanOrEqual(4)
  })

  test('search by presenter (Equipo VIZLA) yields a page with mention', async () => {
    const res = await request(app).get('/news/v1.0/list?q=Equipo%20VIZLA&limit=100')
    expect(res.status).toBe(200)
    expect(res.text).toContain('VIZLA')
  })
})
