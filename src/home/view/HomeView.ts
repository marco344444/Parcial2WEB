import { Request, Response } from 'express'
import { renderHome } from '../../template/renderer'

export default class HomeView {
  readonly index = (_req: Request, res: Response) => {
    return res.status(200).send(renderHome())
  }
}
