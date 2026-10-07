import { expect, it } from 'vitest'
import { resolveRoute } from '../src/routing'

it.each(['/', '/NhanBDS/'])('supports root and project hosting at %s', (base) => {
  expect(resolveRoute(base, base)).toBe('home')
  expect(resolveRoute(`${base}index.html`, base)).toBe('home')
  for (const suffix of ['admin', 'admin/', 'admin/index.html']) {
    expect(resolveRoute(`${base}${suffix}`, base)).toBe('admin')
  }
  expect(resolveRoute(`${base}missing`, base)).toBe('not-found')
  expect(resolveRoute(`${base}other/admin`, base)).toBe('not-found')
})
