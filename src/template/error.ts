import { head, footer, renderMenu, escapeHtml } from './layout'

export function renderError(message = 'Error') {
  // Derive a friendly status code based on message (keeps API backwards-compatible)
  const status = /not\s*found/i.test(message) ? 404 : 500
  const title = status === 404 ? 'No encontrado' : 'Algo salió mal'
  const hint = status === 404
    ? 'La página que buscas no existe, cambió de lugar o el enlace está roto.'
    : 'Hemos tenido un problema procesando tu solicitud. Inténtalo de nuevo en unos segundos.'

  return (
    head(`${status} · ${title}`) +
    renderMenu() +
    `<main class="error-page">
      <div class="container">
        <section class="error-card" aria-labelledby="error-title">
          <div class="error-illustration" aria-hidden="true">
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decoración">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stop-color="#60a5fa"/>
                  <stop offset="100%" stop-color="#3b82f6"/>
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="44" fill="url(#g)" opacity="0.12" />
              <circle cx="60" cy="60" r="36" fill="none" stroke="url(#g)" stroke-width="2" opacity="0.35" />
              <path d="M45 50h18M45 62h30M45 74h22" stroke="#93c5fd" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
              <circle cx="86" cy="88" r="10" fill="none" stroke="#93c5fd" stroke-width="3"/>
              <path d="M92 94l8 8" stroke="#93c5fd" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <h1 id="error-title" class="error-title"><span class="error-code">${status}</span> ${escapeHtml(title)}</h1>
          <p class="error-sub">${escapeHtml(hint)}</p>
          <p class="error-msg">${escapeHtml(message)}</p>
          <div class="error-actions">
            <a class="btn btn-primary" href="/">Volver al inicio</a>
            <a class="btn" href="/news/v1.0/list">Ver noticias</a>
            <button class="btn" onclick="history.back()" type="button">Regresar</button>
          </div>
        </section>
      </div>
    </main>` +
    footer()
  );
}

export default { renderError }
