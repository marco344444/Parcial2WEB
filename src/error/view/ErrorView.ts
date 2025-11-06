import { Request, Response } from 'express'
import { renderError } from '../../template/renderer'

export default class ErrorView {
  readonly notFound = (_req: Request, res: Response) => {
    return res.status(404).send(renderError('Not found'))
  }
}
