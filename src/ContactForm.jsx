import { useRef, useState } from 'react'
import { ArrowRight, Check, Copy } from 'lucide-react'
import { asset, contactTopics } from './data'
import { createContactMessage, validateContact } from './contact'

export default function ContactForm({ project = '', onClearProject }) {
  const [values, setValues] = useState({ name: '', phone: '', topic: contactTopics[0], message: '' })
  const [errors, setErrors] = useState({})
  const [draft, setDraft] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const formRef = useRef(null)
  const draftRef = useRef(null)

  // Reset the prepared draft when the selected project changes — React's
  // documented "adjusting state when a prop changes" pattern (no effect).
  const [appliedProject, setAppliedProject] = useState(project)
  if (project !== appliedProject) {
    setAppliedProject(project)
    setDraft('')
    setCopyStatus('')
  }

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setDraft('')
    setCopyStatus('')
  }

  function prepare(event) {
    event.preventDefault()
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      formRef.current.elements.namedItem(firstError)?.focus()
      return
    }
    setDraft(createContactMessage(values, project))
    setCopyStatus('')
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft)
      setCopyStatus('Đã sao chép. Hãy mở Zalo hoặc Messenger, dán nội dung và bấm gửi.')
    } catch {
      draftRef.current?.focus()
      draftRef.current?.select()
      setCopyStatus('Hãy sao chép nội dung đã chọn, sau đó dán và gửi qua Zalo hoặc Messenger.')
    }
  }

  return <form className="contact-form" ref={formRef} onSubmit={prepare} noValidate>
    <div className="contact-form-brand">
      <img src={asset('images/logo-mai-hoang-nhan.svg')} alt="" width="48" height="48"/>
      <span><b>Mai Hoàng Nhân</b><small>Real Estate Advisor</small></span>
    </div>
    <p className="form-note" id="contact-instructions">Soạn yêu cầu bên dưới, sau đó sao chép và gửi cho Nhân qua Zalo hoặc Messenger. Thông tin chỉ được gửi khi bạn gửi tin nhắn.</p>
    {project && <div className="selected-project"><span>Dự án quan tâm: <strong>{project}</strong></span>{onClearProject && <button type="button" onClick={onClearProject} aria-label="Bỏ chọn dự án">Bỏ chọn</button>}</div>}
    <div className="form-field">
      <label htmlFor="contact-name">Họ và tên</label>
      <input id="contact-name" name="name" autoComplete="name" required maxLength={100} value={values.name} onChange={update} placeholder="Nhập họ tên của bạn" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}/>
      {errors.name && <span id="name-error" className="field-error" role="alert">{errors.name}</span>}
    </div>
    <div className="form-field">
      <label htmlFor="contact-phone">Số điện thoại</label>
      <input id="contact-phone" name="phone" autoComplete="tel" inputMode="tel" type="tel" required maxLength={25} value={values.phone} onChange={update} placeholder="Nhập số điện thoại" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined}/>
      {errors.phone && <span id="phone-error" className="field-error" role="alert">{errors.phone}</span>}
    </div>
    <div className="form-field field-wide">
      <label htmlFor="contact-topic">Bạn quan tâm đến</label>
      <select id="contact-topic" name="topic" value={values.topic} onChange={update}>{contactTopics.map((topic) => <option key={topic}>{topic}</option>)}</select>
    </div>
    <div className="form-field field-wide">
      <label htmlFor="contact-message">Lời nhắn</label>
      <textarea id="contact-message" name="message" rows="3" maxLength={1500} value={values.message} onChange={update} placeholder="Chia sẻ nhu cầu của bạn..." aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}/>
      {errors.message && <span id="message-error" className="field-error" role="alert">{errors.message}</span>}
    </div>
    <button className="btn primary" type="submit" aria-describedby="contact-instructions">Soạn yêu cầu tư vấn <ArrowRight size={18}/></button>
    {draft && <div className="contact-draft">
      <p role="status">Nội dung đã sẵn sàng, chưa được gửi. Sao chép và gửi qua kênh bạn chọn:</p>
      <label>Nội dung tin nhắn<textarea ref={draftRef} readOnly rows="7" value={draft}/></label>
      <button type="button" className="btn primary" onClick={copy}>{copyStatus ? <Check size={18}/> : <Copy size={18}/>} Sao chép nội dung</button>
      <div className="contact-channels"><a href="https://zalo.me/0909467505" target="_blank" rel="noreferrer">Mở Zalo ↗</a><a href="https://m.me/MaiHoangNhanbds" target="_blank" rel="noreferrer">Mở Messenger ↗</a></div>
      <p role="status">{copyStatus}</p>
    </div>}
  </form>
}
