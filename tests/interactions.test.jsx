import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ContactForm from '../src/ContactForm'
import App from '../src/App'
import Admin from '../src/Admin'

async function fillContact(user) {
  await user.type(screen.getByLabelText('Họ và tên'), 'Nguyễn An')
  await user.type(screen.getByLabelText('Số điện thoại'), '+84 909 467 505')
}

describe('contact flow', () => {
  it('shows inline errors and focuses the first invalid field', async () => {
    const user = userEvent.setup()
    render(<ContactForm/>)
    await user.click(screen.getByRole('button', { name: 'Soạn yêu cầu tư vấn' }))
    expect(screen.getAllByRole('alert')).toHaveLength(2)
    expect(screen.getByLabelText('Họ và tên')).toHaveFocus()
    expect(screen.queryByLabelText('Nội dung tin nhắn')).not.toBeInTheDocument()
  })

  it('prepares a draft, explicitly says it is unsent, and copies only on request', async () => {
    const user = userEvent.setup()
    const copy = vi.spyOn(navigator.clipboard, 'writeText')
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    render(<ContactForm project="The Opera Residence"/>)
    await fillContact(user)
    await user.click(screen.getByRole('button', { name: 'Soạn yêu cầu tư vấn' }))
    expect(screen.getByText(/Nội dung đã sẵn sàng, chưa được gửi/)).toBeInTheDocument()
    expect(screen.getByLabelText('Nội dung tin nhắn').value).toContain('Dự án quan tâm: The Opera Residence')
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(copy).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Sao chép nội dung' }))
    expect(copy).toHaveBeenCalledOnce()
    expect(screen.getByText(/Đã sao chép/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Mở Zalo/ })).toHaveAttribute('href', 'https://zalo.me/0909467505')
  })

  it('offers manual copy if clipboard access is refused', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Permission denied'))
    render(<ContactForm/>)
    await fillContact(user)
    await user.click(screen.getByRole('button', { name: 'Soạn yêu cầu tư vấn' }))
    await user.click(screen.getByRole('button', { name: 'Sao chép nội dung' }))
    expect(screen.getByText(/Hãy sao chép nội dung đã chọn/)).toBeInTheDocument()
    expect(screen.getByLabelText('Nội dung tin nhắn')).toHaveFocus()
  })

  it('invalidates stale drafts after edits or project changes, preserving customer fields', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<ContactForm project="Sun Thủ Thiêm"/>)
    await fillContact(user)
    await user.click(screen.getByRole('button', { name: 'Soạn yêu cầu tư vấn' }))
    await user.type(screen.getByLabelText('Lời nhắn'), 'Buổi chiều')
    expect(screen.queryByLabelText('Nội dung tin nhắn')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Soạn yêu cầu tư vấn' }))
    rerender(<ContactForm project="GS Metrocity"/>)
    expect(screen.queryByLabelText('Nội dung tin nhắn')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Họ và tên')).toHaveValue('Nguyễn An')
    await user.click(screen.getByRole('button', { name: 'Soạn yêu cầu tư vấn' }))
    expect(screen.getByLabelText('Nội dung tin nhắn').value).toContain('GS Metrocity')
  })
})

describe('navigation', () => {
  it('uses an eager high-priority hero image and lazy-loads below-the-fold imagery', () => {
    render(<App/>)
    const hero = document.querySelector('.hero-photo')
    const profile = screen.getByAltText('Mai Hoàng Nhân, chuyên viên tư vấn bất động sản')
    expect(hero).toHaveAttribute('fetchpriority', 'high')
    expect(hero).not.toHaveAttribute('loading', 'lazy')
    expect(profile).toHaveAttribute('loading', 'lazy')
    expect(profile).toHaveAttribute('width', '540')
    expect(profile).toHaveAttribute('height', '960')
  })

  it('closes quick contact on Escape', async () => {
    const user = userEvent.setup()
    render(<App/>)
    const toggle = screen.getByRole('button', { name: 'Mở liên hệ tư vấn' })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Mở liên hệ tư vấn' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the menu on native cancel and restores focus and page scrolling', async () => {
    const user = userEvent.setup()
    render(<App/>)
    const trigger = screen.getByRole('button', { name: 'Mở menu' })
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const menu = screen.getByRole('dialog', { name: 'Menu chính' })
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent(menu, new Event('cancel', { bubbles: true }))
    expect(screen.queryByRole('dialog', { name: 'Menu chính' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })

  it('opens project details and transfers the chosen project into consultation', async () => {
    const user = userEvent.setup()
    render(<App/>)
    await user.click(screen.getByRole('button', { name: 'Xem Sun Thủ Thiêm' }))
    const dialog = screen.getByRole('dialog', { name: 'Sun Thủ Thiêm' })
    expect(within(dialog).getByText(/Hình ảnh minh họa/)).toBeInTheDocument()
    await user.click(within(dialog).getByRole('button', { name: 'Tư vấn về dự án này' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByText('Dự án quan tâm:')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByLabelText('Họ và tên')).toHaveFocus())
  })

  it('removes dashboard content from the accessibility tree when switching admin sections', async () => {
    const user = userEvent.setup()
    render(<Admin/>)
    expect(screen.getByText(/Giao diện mẫu — chỉ xem/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Liên hệ', exact: true }))
    expect(screen.queryByRole('heading', { name: 'Xin chào, anh Nhân!' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Lưu thay đổi' })).toBeDisabled()
    expect(screen.getByLabelText('Số hotline')).toHaveAttribute('readonly')
    await user.click(screen.getByRole('button', { name: 'Tổng quan', exact: true }))
    expect(screen.getByRole('heading', { name: 'Xin chào, anh Nhân!' })).toBeInTheDocument()
  })
})
