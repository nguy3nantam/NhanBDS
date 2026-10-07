import { ArrowRight, MapPin, X } from 'lucide-react'
import useDialog from './useDialog'

export default function ProjectDialog({ project, onClose, onContact }) {
  const ref = useDialog(!!project)
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-title" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    {project && <div className="project-dialog-content">
      <button className="dialog-close" onClick={onClose} aria-label="Đóng thông tin dự án" autoFocus><X/></button>
      <img src={project.image} alt={project.illustration ? 'Hình ảnh không gian sống minh họa' : project.name} width="900" height="500"/>
      {project.illustration && <small className="image-caption">Hình ảnh minh họa, không phải ảnh xác nhận của dự án.</small>}
      <div className="project-dialog-copy"><p className="section-tag">{project.type}</p><h2 id="project-title">{project.name}</h2><p className="project-place"><MapPin size={18}/>{project.place}</p>
        <p>Liên hệ Nhân để trao đổi về nhu cầu, sản phẩm đang có và thông tin cập nhật của dự án.</p>
        <button className="btn primary" onClick={() => onContact(project.name)}>Tư vấn về dự án này <ArrowRight size={18}/></button>
      </div>
    </div>}
  </dialog>
}
