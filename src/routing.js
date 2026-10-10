import { projectContent } from './projects'

export function resolveProject(pathname, base = '/') {
  const path = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '')
  const root = base.replace(/\/+$/, '')
  return projectContent.find((project) => path === `${root}/du-an/${project.slug}`)
}

export function resolveRoute(pathname, base = '/') {
  const root = base.replace(/\/+$/, '')
  const path = pathname.replace(/\/+$/, '')
  if (path === root || path === `${root}/index.html`) return 'home'
  if (path === `${root}/admin` || path === `${root}/admin/index.html`) return 'admin'
  if (resolveProject(pathname, base)) return 'project'
  return 'not-found'
}
