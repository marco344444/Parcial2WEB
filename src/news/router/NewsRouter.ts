import { Router } from 'express'
import NewsView from '../view/NewsView'

export default class NewsRouter {
  readonly router: Router

  constructor(private readonly newsView: NewsView) {
    this.router = Router()
    this.routes()
  }

  private routes(): void {
    this.router.get('/v1.0/list', this.newsView.getNewsList)
    this.router.get('/v1.0/detail/:id', this.newsView.getNewsDetail)
  }
}
