import express, { Application } from 'express'
import path from 'node:path'
import fs from 'node:fs'
import ErrorRouter from './error/router/ErrorRouter'
import ErrorView from './error/view/ErrorView'
import UserRouter from './user/router/UserRouter'
import UserView from './user/view/UserView'
import NewsRouter from './news/router/NewsRouter'
import NewsView from './news/view/NewsView'
import NewsModel from './news/model/NewsModel'
import HomeRouter from './home/router/HomeRouter'
import HomeView from './home/view/HomeView'

export default class Server {
  private readonly app: Application

  constructor(
    private readonly userRouter: UserRouter,
    private readonly errorRouter: ErrorRouter,
    private readonly newsRouter: NewsRouter
  ) {
    this.app = express()
    this.configure()
    this.static()
    this.routes()
  }

  private readonly configure = (): void => {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    // We're rendering templates from TypeScript functions (no EJS engine)
  }

  private readonly routes = (): void => {
    this.app.use('/users', this.userRouter.router)
    this.app.use('/news', this.newsRouter.router)
  }

  private readonly static = (): void => {
    // Support running from ts-node-dev (src) and from compiled build
    const candidates = [
      path.join(__dirname, './public'),              // when running from src
      path.join(__dirname, '../src/public'),         // when running from build
    ]
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        this.app.use(express.static(p))
      }
    }

    // Serve images from the repository-level /images folder at the /images URL path
    const imageCandidates = [
      path.join(__dirname, '../images'), // ts-node (src) and build both resolve correctly with ../images
      path.join(__dirname, './images'),  // fallback if images lives alongside current dir
    ]
    for (const p of imageCandidates) {
      if (fs.existsSync(p)) {
        this.app.use('/images', express.static(p))
        break
      }
    }
  }

  readonly start = (): void => {
    const port = 34444
    const host = 'localhost'
    this.app.listen(port, () => {
      console.log(`Server is running on http://${host}:${port}`)
    })
  }

  getApp(): Application {
    return this.app
  }

  attachHome(homeRouter: HomeRouter) {
    this.app.use('/', homeRouter.router)
  }

  attachNotFound() {
    // Must be last
    this.app.use('/', this.errorRouter.router)
  }
}

const server = new Server(
  new UserRouter(new UserView()),
  new ErrorRouter(new ErrorView()),
  new NewsRouter(new NewsView(new NewsModel()))
)
server.attachHome(new HomeRouter(new HomeView()))
server.attachNotFound()
server.start()

export const app = server.getApp()
