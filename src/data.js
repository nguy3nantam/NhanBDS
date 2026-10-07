export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const projects = [
  { name: 'The Opera Residence', place: 'Thủ Thiêm, TP. Thủ Đức', type: 'Căn hộ hạng sang', image: asset('images/nhan-reel.webp'), illustration: false },
  { name: 'Sun Thủ Thiêm', place: 'Khu đô thị Thủ Thiêm', type: 'Bất động sản ven sông', image: asset('images/project-sun-thu-thiem.webp'), illustration: true },
  { name: 'GS Metrocity', place: 'Nhà Bè, TP.HCM', type: 'Khu đô thị tích hợp', image: asset('images/project-gs-metrocity.webp'), illustration: true },
]

export const contactTopics = ['Tư vấn chọn dự án', 'Đầu tư bất động sản', 'Mua để ở']
