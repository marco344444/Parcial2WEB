import { Request, Response } from 'express'
import NewsModel from '../model/NewsModel'
import { renderNewsListHtml, renderNewsDetailHtml } from '../../template/renderer'
import { renderError } from '../../template/error'

export default class NewsView {
  constructor(private readonly newsModel: NewsModel) {}

  readonly getNewsList = (req: Request, res: Response) => {
  const q = (req.query['q'] as string) || ''
  const page = Number(req.query['page'] as string) || 1
  const limit = Number(req.query['limit'] as string) || 4
  const tagQ = req.query['tag']
  const tagsSel = Array.isArray(tagQ)
    ? tagQ.map(String)
    : (tagQ ? [String(tagQ)] : [])
  const jornadaQ = req.query['jornada']
  const jornadasSel = Array.isArray(jornadaQ)
    ? jornadaQ.map(String)
    : (jornadaQ ? [String(jornadaQ)] : [])

    let items = this.newsModel.getAllNews()
    if (q) items = this.newsModel.search(q)
    items = this.newsModel.applyFilters(items, { tag: tagsSel, jornada: jornadasSel })
    const tags = this.newsModel.uniqueTags()
    const jornadas = this.newsModel.uniqueJornadas()

  const { data, pages } = this.newsModel.paginate(items, page, limit)
  const dataWithCats = this.newsModel.withCategoryTags(data)

    return res.status(200).send(
      (renderNewsListHtml as any)(
        dataWithCats,
        page,
        pages,
        q,
        limit,
        { tags, selectedTags: tagsSel, jornadas, selectedJornadas: jornadasSel }
      )
    )
  }

  readonly getNewsDetail = (req: Request, res: Response) => {
  const id = (req.params['id'] as string) || ''
  const item = this.newsModel.getById(id)
    if (!item) return res.status(404).send(renderError('Not found'))
    return res.status(200).send(renderNewsDetailHtml(item))
  }
}
