import { Router } from 'express'
import ErrorView from '../view/ErrorView'

export default class ErrorRouter {
  router: Router

  constructor(private readonly errorView: ErrorView) {
    this.router = Router()
    this.routes()
  }

  readonly routes = () => {
    // Express 5: avoid '*' patterns; use a middleware without a path as catch-all (mounted last).
    this.router.use(this.errorView.notFound)
  }
}
