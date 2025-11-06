import { escapeHtml, head, footer, renderMenu } from './layout'

export function renderNewsListHtml(
  news: any[] = [],
  page = 1,
  pages = 1,
  q = '',
  limit = 8,
  filters?: { tags?: string[]; selectedTags?: string[]; jornadas?: string[]; selectedJornadas?: string[] }
) {
  function jornadaFrom(details?: string): string | '' {
    if (!details) return ''
    const m = details.match(/Jornada\s+(\d+)/i)
    return m ? `Jornada ${m[1]}` : ''
  }

  const slides = news.map(n => {
    const img = (n.images && n.images[0]) ? n.images[0] : ''
    const imgTag = img ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(n.title)}">` : ''
    const j = jornadaFrom(n.details)
    const badge = j ? `<span class="badge">${escapeHtml(j)}</span>` : ''
    return `
      <div class="slide" data-title="${escapeHtml(n.title)}">
        <a href="/news/v1.0/detail/${escapeHtml(n.id)}">${imgTag}${badge}<div class="caption">${escapeHtml(n.title)}</div></a>
      </div>
    `
  }).join('')

  const cards = news.map(n => `
    <article class="card">
      <div class="media">
        ${ (n.images && n.images[0]) ? `<img src="${escapeHtml(n.images[0])}" alt="${escapeHtml(n.title)}">` : '' }
        ${ (()=>{ const j=jornadaFrom(n.details); return j ? `<span class=\"badge\">${escapeHtml(j)}</span>` : '' })() }
      </div>
      <div class="card-body">
        <h2><a href="/news/v1.0/detail/${escapeHtml(n.id)}">${escapeHtml(n.title)}</a></h2>
        <p class="summary">${escapeHtml(n.summary)}</p>
        ${ (n.tags && n.tags.length) ? `<div class="tags">${n.tags.map((t: string)=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>` : '' }
      </div>
    </article>
  `).join('')

  const selTags = (filters?.selectedTags || []) as string[]
  const selJornadas = (filters?.selectedJornadas || []) as string[]
  const tagsOpen = selTags.length ? ' open' : ''
  const jornadasOpen = selJornadas.length ? ' open' : ''

  const search = `
    <section class="filter-panel">
      <form class="search-form" method="get" action="/news/v1.0/list">
        <input type="hidden" name="limit" value="${limit}">
        <div class="filters-row">
          <div class="filter-groups filters-left">
            <details class="filter-group" data-filter="tags"${tagsOpen}>
              <summary>Etiquetas${selTags.length ? ` (${selTags.length} seleccionadas)` : ''}<span class="caret" aria-hidden="true"></span></summary>
              <div class="popover">
                <div class="checkbox-list tags-list" data-paginate="true" data-page-size="4">
                  ${(filters?.tags || []).map(t => `
                    <label class="checkbox"><input type="checkbox" name="tag" value="${escapeHtml(t)}" ${selTags.includes(t) ? 'checked' : ''}><span>${escapeHtml(t)}</span></label>
                  `).join('')}
                </div>
              </div>
            </details>
            <details class="filter-group" data-filter="jornadas"${jornadasOpen}>
              <summary>Jornadas${selJornadas.length ? ` (${selJornadas.length} seleccionadas)` : ''}<span class="caret" aria-hidden="true"></span></summary>
              <div class="popover">
                <div class="checkbox-list" data-paginate="true" data-page-size="4">
                  ${(filters?.jornadas || []).map(j => `
                    <label class="checkbox"><input type="checkbox" name="jornada" value="${escapeHtml(j)}" ${selJornadas.includes(j) ? 'checked' : ''}><span>Jornada ${escapeHtml(j)}</span></label>
                  `).join('')}
                </div>
              </div>
            </details>
          </div>
          <div class="filters-center">
            <div class="filter-actions">
              <input type="search" name="q" value="${escapeHtml(q)}" placeholder="Buscar por título, etiqueta, jornada o expositor...">
              <button type="submit" class="filter-btn">Filtrar</button>
              <a class="btn clear-filters" title="Limpiar filtros" href="/news/v1.0/list?limit=${limit}">Limpiar</a>
            </div>
          </div>
        </div>
      </form>
    </section>`

  const filterEnhancements = `
    <script>(function(){
      function positionPopover(group){
        var summary = group.querySelector('summary');
        var pop = group.querySelector('.popover');
        if(!summary || !pop) return;
        var rect = summary.getBoundingClientRect();
        var pad = 8;
        var maxW = Math.min(560, Math.floor(window.innerWidth * 0.92));
        pop.style.position = 'fixed';
        pop.style.top = (rect.bottom + pad) + 'px';
        var width = Math.min(pop.offsetWidth || maxW, maxW);
        var left = rect.left;
        if (left + width + 8 > window.innerWidth) {
          left = Math.max(8, window.innerWidth - width - 8);
        }
        pop.style.left = left + 'px';
        pop.style.maxWidth = maxW + 'px';
        pop.style.zIndex = '10000';
      }
      function closeOthers(current){
        document.querySelectorAll('.filter-group[open]').forEach(function(d){ if(d!==current) d.removeAttribute('open'); });
      }
      document.querySelectorAll('.filter-group').forEach(function(group){
        group.addEventListener('toggle', function(){
          if(group.hasAttribute('open')){ closeOthers(group); positionPopover(group); }
        });
      });
      window.addEventListener('resize', function(){
        document.querySelectorAll('.filter-group[open]').forEach(function(g){ positionPopover(g); });
      });
      window.addEventListener('scroll', function(){
        document.querySelectorAll('.filter-group[open]').forEach(function(g){ positionPopover(g); });
      }, { passive: true });
      document.addEventListener('click', function(e){
        var t = e.target; if(!(t instanceof Element)) return;
        if(!t.closest('.filter-group')){
          document.querySelectorAll('.filter-group[open]').forEach(function(d){ d.removeAttribute('open'); });
        }
      });
      // Clear filters handler (JS-enhanced): reset and submit
      document.querySelectorAll('.clear-filters').forEach(function(link){
        link.addEventListener('click', function(e){
          var a = link as HTMLAnchorElement;
          var form = link.closest('form');
          if(!form){ return; }
          e.preventDefault();
          var q = form.querySelector('input[name="q"]'); if(q) (q as HTMLInputElement).value = '';
          form.querySelectorAll('input[type="checkbox"]').forEach(function(ch){ (ch as HTMLInputElement).checked = false; });
          // Navigate to clean URL to ensure server-side state resets as well
          if(a && a.href){ window.location.assign(a.href); }
          else { form.submit(); }
        });
      });
      document.querySelectorAll('.checkbox-list[data-paginate="true"]').forEach(function(list){
        var container = list;
        var items = Array.prototype.slice.call(container.children);
        var pageSize = parseInt(container.getAttribute('data-page-size') || '4', 10);
        var page = 0; var totalPages = Math.max(1, Math.ceil(items.length / pageSize));
        var pager = document.createElement('div');
        pager.className = 'pager';
        pager.innerHTML = '<button type="button" class="pager-prev" aria-label="Anterior">◀</button>'+
                          '<span class="pager-indicator">1 / '+totalPages+'</span>'+
                          '<button type="button" class="pager-next" aria-label="Siguiente">▶</button>';
        var prevBtn = pager.querySelector('.pager-prev');
        var nextBtn = pager.querySelector('.pager-next');
        function update(){
          items.forEach(function(el, idx){
            var show = idx >= page*pageSize && idx < (page+1)*pageSize;
            el.style.display = show ? '' : 'none';
          });
          pager.querySelector('.pager-indicator').textContent = (page+1)+' / '+totalPages;
          if(prevBtn) prevBtn.disabled = page===0;
          if(nextBtn) nextBtn.disabled = page>=totalPages-1;
        }
        if(prevBtn) prevBtn.addEventListener('click', function(){ page = Math.max(0, page-1); update(); });
        if(nextBtn) nextBtn.addEventListener('click', function(){ page = Math.min(totalPages-1, page+1); update(); });
        container.parentElement!.appendChild(pager);
        update();
      });
    })();</script>
  `

  const mkUrl = (p: number) => {
    const params: string[] = []
    params.push(`page=${p}`)
    params.push(`limit=${limit}`)
    if (q) params.push(`q=${encodeURIComponent(q)}`)
    for (const tg of (filters?.selectedTags || [])) params.push(`tag=${encodeURIComponent(tg)}`)
    for (const j of (filters?.selectedJornadas || [])) params.push(`jornada=${encodeURIComponent(j)}`)
    return `/news/v1.0/list?${params.join('&')}`
  }

  const prev = page > 1
    ? `<a class="page" href="${mkUrl(page - 1)}" aria-label="Página anterior">«</a>`
    : `<span class="page disabled" aria-disabled="true">«</span>`
  const next = page < pages
    ? `<a class="page" href="${mkUrl(page + 1)}" aria-label="Página siguiente">»</a>`
    : `<span class="page disabled" aria-disabled="true">»</span>`
  const numbers = Array.from({ length: pages }, (_, i) => i + 1)
    .map(n => n === page
      ? `<span class="page active" aria-current="page">${n}</span>`
      : `<a class="page" href="${mkUrl(n)}">${n}</a>`)
    .join('')
  const pager = `<nav class="pagination" aria-label="Paginación">${prev}${numbers}${next}</nav>`

  const carousel = `
    <section class="carousel flat-peek">
      <div class="track">${slides}</div>
      <button class="nav prev" aria-label="Anterior">&#8249;</button>
      <button class="nav next" aria-label="Siguiente">&#8250;</button>
    </section>
    <script>(function(){
      const root=document.querySelector('.carousel.flat-peek');
      if(!root) return; const track=root.querySelector('.track');
      const slides=[...track.children]; let i=0;
      track.style.position='relative';
      slides.forEach(s=>{ s.style.position='absolute'; s.style.left='50%'; s.style.top='0'; s.style.willChange='transform'; });
      const indicators=[];
      const peekPrev=document.createElement('div'); peekPrev.className='peek prev'; root.appendChild(peekPrev);
      const peekNext=document.createElement('div'); peekNext.className='peek next'; root.appendChild(peekNext);
      function layout(){
        slides.forEach((el, idx)=>{
          const delta = idx - i; const abs = Math.abs(delta);
          if (abs>4){
            el.style.opacity='0'; el.style.pointerEvents='none'; el.style.transform='translateX(-50%)'; el.style.zIndex='0';
            return;
          }
          const x = delta*360; const scale = abs===0?1: (abs===1?0.86:0.78);
          el.style.opacity = abs>3 ? '0' : (abs>=2 ? '0.7' : '1');
          el.style.pointerEvents = (abs===0) ? 'auto' : 'none';
          el.style.transform = 'translateX(calc(-50% + ' + x + 'px)) scale(' + scale + ')';
          el.style.zIndex = String(100 - abs);
          el.classList.toggle('active', idx===i);
        });
        indicators.forEach((d, idx)=> d.classList.toggle('active', idx===i));
        const prevIndex=(i-1+slides.length)%slides.length; const nextIndex=(i+1)%slides.length;
        const prevTitle=slides[prevIndex].getAttribute('data-title')||'';
        const nextTitle=slides[nextIndex].getAttribute('data-title')||'';
        peekPrev.textContent = '‹ ' + prevTitle;
        peekNext.textContent = nextTitle + ' ›';
      }
      let scheduled=false; function go(d){ i=(i+d+slides.length)%slides.length; if(!scheduled){ scheduled=true; requestAnimationFrame(()=>{ layout(); scheduled=false; }); } }
      root.querySelector('.prev').addEventListener('click',()=>go(-1));
      root.querySelector('.next').addEventListener('click',()=>go(1));
      let t=setInterval(()=>go(1),5000);
      root.addEventListener('mouseenter',()=>clearInterval(t));
      root.addEventListener('mouseleave',()=>t=setInterval(()=>go(1),5000));
      root.setAttribute('tabindex','0');
      root.addEventListener('keydown', (e)=>{ if(e.key==='ArrowLeft') go(-1); if(e.key==='ArrowRight') go(1); });
      let startX=null; root.addEventListener('touchstart',(e)=>{ startX=e.touches[0].clientX; }, {passive:true});
      root.addEventListener('touchend',(e)=>{ if(startX==null) return; const dx=e.changedTouches[0].clientX-startX; if(Math.abs(dx)>30){ go(dx>0?-1:1) } startX=null; }, {passive:true});
      const indWrap=document.createElement('div'); indWrap.className='indicators';
      slides.forEach((_, idx)=>{ const b=document.createElement('button'); b.className='dot'; b.setAttribute('aria-label','Ir a slide '+(idx+1)); b.addEventListener('click',()=>{ i=idx; layout(); }); indWrap.appendChild(b); indicators.push(b); });
      root.appendChild(indWrap);
      layout();
    })();</script>
  `

  return head('Noticias') + renderMenu() + `<main class="container news-list"><h1>Noticias</h1>${search}${filterEnhancements}${carousel}<section class="cards">${cards}</section>${pager}</main>` + footer();
}

export function renderNewsDetailHtml(n: any) {
  if (!n) return head('Not found') + renderMenu() + `<main><h1>Not found</h1></main>` + footer();
  const title = escapeHtml(n.title)
  const presenters = (n.presenters || []).join(', ')
  const date = escapeHtml(n.date)
  const firstImg = escapeHtml(((n.images && n.images[0]) ? n.images[0] : '/images/Default.webp'))
  const restImgs = (n.images || []).slice(1)
  const gallery = restImgs.length
      ? `<div class="gallery news-gallery">${restImgs.map((src: string) => `<img src="${escapeHtml(src)}" alt="${title}">`).join('')}</div>`
    : ''
  const tags = (n.tags && n.tags.length)
    ? `<div class="tags">${n.tags.map((t: string)=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`
    : ''
  const members = (n.members && n.members.length)
    ? `<section class="news-members"><h3>Integrantes</h3><ul>${n.members.map((m: string)=>`<li>${escapeHtml(m)}</li>`).join('')}</ul></section>`
    : ''
  const hero = `
    <section class="news-hero">
      <img src="${firstImg}" alt="${title}">
      <div class="overlay"></div>
      <h1 class="hero-title">${title}</h1>
    </section>`
  const meta = `
    <p class="news-meta">${date}${presenters ? ` · Expositor: ${escapeHtml(presenters)}` : ''}</p>`
  const content = `<article class="news-content"><p>${escapeHtml(n.content)}</p>${tags}${members}</article>`
  return head(title)
    + renderMenu()
    + `<main class="container news-detail-page">${hero}<section class="news-article">${meta}${content}${gallery}</section></main>`
    + footer();
}

export default { renderNewsListHtml, renderNewsDetailHtml }
