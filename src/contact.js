export function normalizePhone(value) {
  const compact = value.trim().replace(/[\s().-]/g, '')
  return compact.replace(/^\+?84(?=\d)/, '0')
}

export function validateContact(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Vui lòng nhập họ tên có ít nhất 2 ký tự.'
  if (values.name.trim().length > 100) errors.name = 'Họ tên không được vượt quá 100 ký tự.'
  if (!/^0(?:[35789]\d{8}|2\d{9})$/.test(normalizePhone(values.phone))) {
    errors.phone = 'Vui lòng nhập số điện thoại Việt Nam hợp lệ, ví dụ 0909 467 505.'
  }
  if (values.message.length > 1500) errors.message = 'Lời nhắn không được vượt quá 1.500 ký tự.'
  return errors
}

export function createContactMessage(values, project) {
  return [
    'Chào anh Nhân, tôi muốn được tư vấn bất động sản.',
    `Họ tên: ${values.name.trim()}`,
    `Số điện thoại: ${normalizePhone(values.phone)}`,
    `Nhu cầu: ${values.topic}`,
    project ? `Dự án quan tâm: ${project}` : '',
    values.message.trim() ? `Lời nhắn: ${values.message.trim()}` : '',
  ].filter(Boolean).join('\n')
}
