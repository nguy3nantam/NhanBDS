import { describe, expect, it } from 'vitest'
import { createContactMessage, normalizePhone, validateContact } from '../src/contact'

const valid = { name: 'Nguyễn An', phone: '0909 467 505', topic: 'Mua để ở', message: '' }

describe('contact validation', () => {
  it.each(['0909467505', '+84 909 467 505', '84 909 467 505', '(0909) 467-505'])('normalizes %s', (phone) => {
    expect(normalizePhone(phone)).toBe('0909467505')
    expect(validateContact({ ...valid, phone })).toEqual({})
  })
  it.each(['abc', '', '0909', '090946750500', '+1 909467505', '0000000000', '09<script>09467505'])('rejects invalid phone %s', (phone) => {
    expect(validateContact({ ...valid, phone }).phone).toBeTruthy()
  })
  it('rejects whitespace names and overlong messages', () => {
    expect(validateContact({ ...valid, name: '  ', message: 'x'.repeat(1501) })).toHaveProperty('name')
    expect(validateContact({ ...valid, message: 'x'.repeat(1501) })).toHaveProperty('message')
  })
  it('keeps project and customer details in the message without inventing data', () => {
    const draft = createContactMessage({ ...valid, name: '  Nguyễn An  ', message: '  Tư vấn buổi chiều  ' }, 'The Opera Residence')
    expect(draft).toContain('Họ tên: Nguyễn An\nSố điện thoại: 0909467505')
    expect(draft).toContain('Dự án quan tâm: The Opera Residence')
    expect(draft).toContain('Lời nhắn: Tư vấn buổi chiều')
    expect(createContactMessage(valid, '')).not.toContain('Dự án quan tâm:')
  })
})
