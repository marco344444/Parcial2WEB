// Shared layout utilities and partials

export function escapeHtml(str: string | undefined) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function head(title = 'App') {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><link rel="stylesheet" href="/css/app.css"></head><body>`;
}

export function footer() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container">
        <p class="muted">© ${year} UPBnews · Construido con Express + TypeScript</p>
      </div>
    </footer>
  </body></html>`;
}

export function renderMenu() {
  return `
    <header class="site-header" role="banner">
      <div class="container header-inner">
  <a class="brand" href="/">UPBnews</a>
        <nav class="primary-nav" aria-label="Primary">
          <a class="btn nav-link" href="/">Inicio</a>
          <a class="btn nav-link" href="/news/v1.0/list">Noticias</a>
          <a class="btn btn-primary" href="/users/v1.0/register">Registro</a>
        </nav>
      </div>
    </header>
  `;
}

// Inline minimal icons (no extra deps)
export function svgNewspaper(){
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 20H5a2 2 0 0 1-2-2V7"/><path d="M21 8v9a2 2 0 0 1-2 2"/><path d="M3 7V6a2 2 0 0 1 2-2h12v4"/><path d="M7 12h10"/><path d="M7 16h10"/><path d="M7 8h3"/></svg>`
}
export function svgUserPlus(){
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`
}
export function svgBot(){
  return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M12 7V3"/><circle cx="12" cy="3" r="1"/><path d="M7 17v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"/><path d="M8 10h.01"/><path d="M16 10h.01"/></svg>`
}
export function svgLaptop(){
  return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>`
}
export function svgUsers(){
  return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
}
export function svgRocket(){
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4"/><path d="M15 3l6 6-8 8-6-6z"/><path d="M9 7l-4 4"/><path d="M7 17l-3 3"/></svg>`
}

export function svgCheck(){
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>`
}

export default {
  escapeHtml,
  head,
  footer,
  renderMenu,
  svgNewspaper,
  svgUserPlus,
  svgBot,
  svgLaptop,
  svgUsers,
  svgRocket,
  svgCheck,
};
