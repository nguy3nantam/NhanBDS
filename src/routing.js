export function resolveRoute(pathname, base = '/') {
  const root = base.replace(/\/+$/, '')
  const path = pathname.replace(/\/+$/, '')
  if (path === root || path === `${root}/index.html`) return 'home'
  if (path === `${root}/admin` || path === `${root}/admin/index.html`) return 'admin'
  return 'not-found'
}
