import news_json from '../../../database/news.json'
import team_members_json from '../../../database/team-members.json'
import News from '../types/News'

export default class NewsModel {
  // Ten general categories to group all project/news tags
  private static readonly CATEGORY_SET: string[] = [
    'IA y ML',
    'Web',
    'Móvil',
    'IoT/Hardware',
    'Juegos',
    'Cloud/DevOps',
    'Seguridad',
    'Datos/BI',
    'UX/UI',
    'Otros'
  ]

  private readonly normalize = (s: string): string => {
    return s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics
  }

  private readonly tokenize = (s: string): Set<string> => {
    const norm = this.normalize(s)
    const words = norm.match(/[a-z0-9ñ]+/gi) || []
    return new Set(words)
  }

  private readonly jaccard = (a: Set<string>, b: Set<string>): number => {
    if (a.size === 0 && b.size === 0) return 1
    if (a.size === 0 || b.size === 0) return 0
    let inter = 0
    for (const t of a) if (b.has(t)) inter++
    const union = a.size + b.size - inter
    return union === 0 ? 0 : inter / union
  }
  readonly getAllNews = (): News[] => {
    const items = news_json as News[]
    // Merge members by matching presenter/team name key in mapping
    const mapping = team_members_json as Record<string, string[]>
    return items.map(n => {
      let members: string[] | undefined = n.members
      const teamKey = (n.presenters && n.presenters[0]) ? String(n.presenters[0]) : ''
      const fromMap = teamKey && mapping[teamKey]
      if (fromMap && Array.isArray(fromMap)) {
        members = fromMap.slice()
      }
      return members ? { ...n, members } : n
    })
  }

  // Map a fine-grained tag to one of the 10 general categories
  private readonly mapTagToCategory = (tag: string): string => {
    const t = this.normalize(tag)
    // Heuristics-based mapping; adjust keywords as needed
    if (/(ia|ml|aprendizaje|machine|modelo|red(?:es)? neuronales|vision|nlp|chatbot|gpt)/.test(t)) return 'IA y ML'
    if (/(web|frontend|backend|full\s*stack|html|css|javascript|typescript|node|express|react|vue|angular)/.test(t)) return 'Web'
    if (/(movil|móvil|mobile|android|ios|flutter|react\s*native)/.test(t)) return 'Móvil'
    if (/(iot|arduino|raspberry|sensor|embebid|hardware|robot)/.test(t)) return 'IoT/Hardware'
    if (/(juego|game|unity|unreal|gamification)/.test(t)) return 'Juegos'
    if (/(cloud|aws|azure|gcp|devops|docker|kubernetes|ci\/cd|pipeline)/.test(t)) return 'Cloud/DevOps'
    if (/(seguridad|security|ciber|pentest|owasp|hash|encriptaci[oó]n|crypto)/.test(t)) return 'Seguridad'
    if (/(dato|data|bi|etl|analytics|anal[ií]tica|power\s*bi|big\s*data)/.test(t)) return 'Datos/BI'
    if (/(ux|ui|dise[nñ]o|interfaz|prototipo|figma)/.test(t)) return 'UX/UI'
    return 'Otros'
  }

  private readonly categoriesForNews = (n: News): Set<string> => {
    const set = new Set<string>()
    for (const t of (n.tags || [])) {
      set.add(this.mapTagToCategory(String(t)))
    }
    return set
  }

  // Produce a shallow copy of items where tags are replaced by their categories (unique)
  readonly withCategoryTags = (items: News[]): News[] => {
    return items.map(n => {
      const cats = Array.from(this.categoriesForNews(n))
      return { ...n, tags: cats } as News
    })
  }

  readonly getById = (id: string): News | undefined => {
    return this.getAllNews().find(n => n.id === id)
  }

  readonly search = (q: string): News[] => {
    const query = (q || '').trim()
    if (!query) return this.getAllNews()

    const lower = this.normalize(query)
    const all = this.getAllNews()

    // Aggregate many fields for matching: title, summary, content, details, presenters, members, tags, derived categories, jornada
    const aggregate = (n: News): string => {
      const presenters = (n.presenters || []).join(' ')
      const members = (n.members || []).join(' ')
      const rawTags = (n.tags || []).join(' ')
      const cats = Array.from(this.categoriesForNews(n)).join(' ')
      const j = this.jornadaFrom(n.details)
      const jornadaTxt = j ? `jornada ${j}` : ''
      return [n.title, n.summary, n.content, (n.details || ''), presenters, members, rawTags, cats, jornadaTxt].join(' ')
    }

    // First: exact substring matches to keep legacy behavior (and tests) intact
    const includesMatches = all.filter(n => {
      const hay = aggregate(n)
      return this.normalize(hay).includes(lower)
    })

    const qTokens = this.tokenize(query)

    const scoreOf = (n: News) => {
      // Token similarity on the aggregated text
      const text = aggregate(n)
      const tTokens = this.tokenize(text)
      return this.jaccard(qTokens, tTokens)
    }

    if (includesMatches.length > 0) {
      // Rank substring matches by Jaccard score (best first)
      return includesMatches
        .map(n => ({ n, s: scoreOf(n) }))
        .sort((a, b) => b.s - a.s)
        .map(x => x.n)
    }

    // Fallback: no substring matches; return Jaccard matches with score > 0
    return all
      .map(n => ({ n, s: scoreOf(n) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map(x => x.n)
  }

  readonly paginate = (items: News[], page = 1, limit = 8): { data: News[]; page: number; pages: number } => {
    const p = Math.max(1, Number(page) || 1)
    const l = Math.max(1, Number(limit) || 8)
    const total = items.length
    const pages = Math.max(1, Math.ceil(total / l))
    const offset = (p - 1) * l
    const data = items.slice(offset, offset + l)
    return { data, page: p, pages }
  }

  readonly uniquePresenters = (): string[] => {
    const set = new Set<string>()
    for (const n of this.getAllNews()) {
      for (const p of n.presenters || []) set.add(p)
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }

  readonly uniqueTags = (): string[] => {
    // Only expose the 10 general categories
    return [...NewsModel.CATEGORY_SET]
  }

  private readonly jornadaFrom = (details?: string): string => {
    if (!details) return ''
    const m = details.match(/Jornada\s+(\d+)/i)
  return m ? (m[1] ?? '') : ''
  }

  readonly uniqueJornadas = (): string[] => {
    const set = new Set<string>()
    for (const n of this.getAllNews()) {
      const j = this.jornadaFrom(n.details)
      if (j) set.add(j)
    }
    return Array.from(set).sort((a, b) => Number(a) - Number(b))
  }

  readonly applyFilters = (
    items: News[],
    opts: { presenter?: string | string[]; tag?: string | string[]; jornada?: string | string[] }
  ): News[] => {
    let out = items
    const presenters: string[] = Array.isArray(opts.presenter)
      ? opts.presenter.map(s => String(s))
      : (opts.presenter ? [String(opts.presenter)] : [])
    const tags: string[] = Array.isArray(opts.tag)
      ? opts.tag.map(s => String(s))
      : (opts.tag ? [String(opts.tag)] : [])
    const jornadas: string[] = Array.isArray(opts.jornada)
      ? opts.jornada.map(s => String(s))
      : (opts.jornada ? [String(opts.jornada)] : [])

    if (presenters.length) {
      out = out.filter(n => presenters.some(p => (n.presenters || []).includes(p)))
    }
    if (tags.length) {
      // Interpret provided tags as categories and match news by their derived categories
      out = out.filter(n => {
        const cats = this.categoriesForNews(n)
        return tags.some(t => cats.has(this.mapTagToCategory(String(t))))
      })
    }
    if (jornadas.length) {
      out = out.filter(n => {
        const j = this.jornadaFrom(n.details)
        return j && jornadas.includes(j)
      })
    }
    return out
  }
}
