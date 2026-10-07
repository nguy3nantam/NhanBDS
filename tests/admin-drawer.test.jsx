import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Admin from '../src/Admin'

describe('admin mobile drawer', () => {
  it('toggles from the hamburger and closes on Escape with focus restored', async () => {
    render(<Admin />)
    const toggle = screen.getByRole('button', { name: 'Mở menu quản trị' })
    expect(toggle.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(toggle.getAttribute('aria-label')).toBe('Đóng menu quản trị')
    expect(document.querySelector('.admin-sidebar').classList.contains('open')).toBe(true)
    expect(document.querySelector('.admin-main').hasAttribute('inert')).toBe(true)
    expect(document.querySelector('.admin-backdrop')).not.toBeNull()

    // Focus lives inside the drawer when the user presses Escape.
    const drawerClose = document.querySelector('.admin-logo button')
    drawerClose.focus()
    fireEvent.keyDown(document, { key: 'Escape' })

    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(document.querySelector('.admin-sidebar').classList.contains('open')).toBe(false)
    expect(document.querySelector('.admin-backdrop')).toBeNull()
    expect(document.querySelector('.admin-main').hasAttribute('inert')).toBe(false)
    await waitFor(() => expect(document.activeElement).toBe(toggle))
  })
})
