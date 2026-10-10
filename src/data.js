export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const projects = projectContent.map((project) => ({ ...project, image: asset(project.imagePath) }))

export const contactTopics = ['Tư vấn chọn dự án', 'Đầu tư bất động sản', 'Mua để ở']
import { projectContent } from './projects'
