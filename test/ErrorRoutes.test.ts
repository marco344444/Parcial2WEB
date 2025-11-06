import express from 'express'
import request from 'supertest'
import ErrorView from '../src/error/view/ErrorView'
import ErrorRouter from '../src/error/router/ErrorRouter'

describe('Error router', () => {
  const buildApp = () => {
    const app = express()
    const errRouter = new ErrorRouter(new ErrorView())
    app.use(errRouter.router) // mounted last, catches all
    return app
  }

  test('unknown route returns 404', async () => {
    const app = buildApp()
    const res = await request(app).get('/missing')
    expect(res.status).toBe(404)
  })

  test('error page contains friendly Spanish title', async () => {
    const app = buildApp()
    const res = await request(app).get('/otra')
    expect(res.text).toContain('No encontrado')
  })

  test('error page contains a primary CTA to home', async () => {
    const app = buildApp()
    const res = await request(app).get('/abc')
    expect(res.text).toContain('href="/"')
  })

  test('error page shows the card structure and svg', async () => {
    const app = buildApp()
    const res = await request(app).get('/def')
    expect(res.text).toContain('class="error-card"')
    expect(res.text).toContain('<svg')
  })

  test('error page mentions regresar button', async () => {
    const app = buildApp()
    const res = await request(app).get('/ghi')
    expect(res.text).toContain('Regresar')
  })
})
