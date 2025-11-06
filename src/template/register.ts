import { head, footer, renderMenu, svgCheck, escapeHtml } from './layout'

export function renderRegisterForm() {
  return head('Register') + renderMenu() + `
    <main class="container register-page">
      <section class="section-intro" aria-labelledby="reg-title">
        <h1 id="reg-title" class="section-title">Registro</h1>
        <p class="section-sub">Completa tus datos para unirte a las jornadas y recibir novedades. No compartiremos tu información.</p>
      </section>

      <form class="form form-card" method="post" action="/users/v1.0/register" novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="nombres">Nombres</label>
            <input class="input" id="nombres" name="nombres" placeholder="Ej: Daenerys" required>
          </div>
          <div class="field">
            <label for="apellidos">Apellidos</label>
            <input class="input" id="apellidos" name="apellidos" placeholder="Ej: Targaryen" required>
          </div>
          <div class="field">
            <label for="cedula">Cédula</label>
            <input class="input" id="cedula" name="cedula" inputmode="numeric" pattern="\\d{6,}" placeholder="Solo números" required>
            <small class="help">Mínimo 6 dígitos.</small>
          </div>
          <div class="field">
            <label for="telefono">Teléfono</label>
            <input class="input" id="telefono" name="telefono" type="tel" pattern="[0-9+\-\s]{7,}" placeholder="Ej: +57 300 123 4567" required>
            <small class="help">Acepta números, espacios y + -</small>
          </div>
          <div class="field field-span2">
            <label for="direccion">Dirección</label>
            <input class="input" id="direccion" name="direccion" placeholder="Calle 123 #45-67, Ciudad" required>
          </div>
        </div>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Registrar</button>
          <a class="btn" href="/">Cancelar</a>
        </div>
      </form>
    </main>` + footer();
}

export function renderUser(user: any) {
  if (!user) return head('Error') + renderMenu() + `<main><h1>Usuario no encontrado</h1></main>` + footer();
  return head('User') + renderMenu() + `
    <main class="container">
      <section class="success-card" role="status" aria-live="polite">
        <div class="success-icon" aria-hidden="true">${svgCheck()}</div>
        <h1 class="success-title">Registro exitoso</h1>
        <p class="success-sub">¡Gracias! Tus datos se enviaron correctamente.</p>
        <div class="user-summary">
          <p><strong>Nombres:</strong> ${escapeHtml(user.nombres)}</p>
          <p><strong>Apellidos:</strong> ${escapeHtml(user.apellidos)}</p>
          <p><strong>Cédula:</strong> ${escapeHtml(user.cedula)}</p>
          <p><strong>Dirección:</strong> ${escapeHtml(user.direccion)}</p>
          <p><strong>Teléfono:</strong> ${escapeHtml(user.telefono)}</p>
        </div>
        <div class="actions">
          <a class="btn btn-primary" href="/news/v1.0/list">Ver noticias</a>
          <a class="btn" href="/">Volver al inicio</a>
        </div>
      </section>
    </main>` + footer();
}

export default { renderRegisterForm, renderUser }
