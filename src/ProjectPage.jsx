import ContactForm from './ContactForm'
import { asset } from './data'

export default function ProjectPage({ project }) {
  useEffect(() => {
    document.title = `${project.name} | Mai Hoàng Nhân BĐS`
  }, [project.name])
  return <main className="status-page">
    <a className="text-link" href={import.meta.env.BASE_URL}>← Về trang chủ</a>
    <p className="section-tag">{project.type}</p><h1>{project.name}</h1><p>{project.place}</p>
    <img src={asset(project.imagePath)} alt={project.illustration ? `Ảnh minh họa cho ${project.name}` : project.name} width="900" height="600" fetchPriority="high" style={{ width: '100%', height: 'auto' }}/>
    {project.illustration && <p>Ảnh minh họa, không phải ảnh xác nhận của dự án.</p>}
    <p>{project.description}</p>
    <h2>Trao đổi nhu cầu của bạn</h2>
    <p>Chia sẻ mục tiêu mua để ở hoặc đầu tư, ngân sách dự kiến và thời gian mong muốn. Nhân sẽ trao đổi về sản phẩm đang có và các thông tin cần xác nhận như giá, pháp lý, tiến độ và lịch tham quan.</p>
    <ContactForm project={project.name}/>
  </main>
}
import { useEffect } from 'react'
