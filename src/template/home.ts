import { head, footer, renderMenu, svgNewspaper, svgUserPlus, svgBot, svgLaptop, svgUsers, svgRocket } from './layout'

export function renderHome() {
  return head('Noticias y Proyectos UPB · Jornada de Proyectos Integradores 2025-II') + renderMenu() + `
    <main class="container">
      <!-- Hero principal -->
      <section class="home-hero" role="banner">
        <h1 class="home-hero-title">Noticias y Proyectos UPB</h1>
        <p class="home-hero-sub">Explora lo mejor de la <strong>Jornada de Proyectos Integradores 2025-II</strong>: prototipos, soluciones tecnológicas e innovaciones desarrolladas por nuestros equipos.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/news/v1.0/list">
            <span class="icon" aria-hidden="true">${svgNewspaper()}</span>
            Ver noticias
          </a>
          <a class="btn" href="/users/v1.0/register">
            <span class="icon" aria-hidden="true">${svgUserPlus()}</span>
            Registrarse
          </a>
        </div>
      </section>

      <!-- ¿Qué encontrarás aquí? -->
      <section class="home-features" aria-labelledby="what-title">
        <h2 id="what-title">¿Qué encontrarás aquí?</h2>
        <p class="lead">Este portal reúne las presentaciones y proyectos más destacados de la Jornada de Proyectos Integradores 2025-II. Descubre avances tecnológicos, herramientas educativas, soluciones con inteligencia artificial y mucho más.</p>

        <div class="features-grid">
          <article class="feature">
            <div class="icon big" aria-hidden="true">${svgBot()}</div>
            <h3>Innovación en IA</h3>
            <p>Proyectos que integran modelos de lenguaje, aprendizaje automático y automatización.</p>
          </article>
          <article class="feature">
            <div class="icon big" aria-hidden="true">${svgLaptop()}</div>
            <h3>Desarrollo web</h3>
            <p>Aplicaciones con arquitectura moderna, responsive y centradas en la experiencia de usuario.</p>
          </article>
          <article class="feature">
            <div class="icon big" aria-hidden="true">${svgUsers()}</div>
            <h3>Trabajo en equipo</h3>
            <p>Conoce cómo los grupos superaron retos técnicos y lograron resultados en equipo.</p>
          </article>
        </div>
      </section>

      <!-- CTA final -->
      <section class="home-cta" aria-labelledby="cta-title">
        <h2 id="cta-title">Únete a la comunidad de proyectos</h2>
        <p class="lead">Regístrate para comentar, calificar proyectos o enviar tus propios avances.</p>
        <a class="btn btn-primary" href="/users/v1.0/register">
          <span class="icon" aria-hidden="true">${svgRocket()}</span>
          Empezar ahora
        </a>
      </section>
    </main>` + footer();
}

export default { renderHome }
