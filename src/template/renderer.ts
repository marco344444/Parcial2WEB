// Facade: re-export modules
export { renderNewsListHtml, renderNewsDetailHtml } from './news'
export { renderHome } from './home'
export { renderRegisterForm, renderUser } from './register'
export { renderError } from './error'
export { head, footer, renderMenu } from './layout'

import { head, footer, renderMenu } from './layout'
import { renderNewsListHtml, renderNewsDetailHtml } from './news'
import { renderHome } from './home'
import { renderRegisterForm, renderUser } from './register'
import { renderError } from './error'

export default { head, footer, renderMenu, renderNewsListHtml, renderNewsDetailHtml, renderError, renderRegisterForm, renderUser, renderHome };

