export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const projects = [
  { name: 'The Opera Residence', place: 'Thủ Thiêm, TP. Thủ Đức', type: 'Căn hộ hạng sang', image: asset('images/nhan-reel.jpg'), illustration: false },
  { name: 'Sun Thủ Thiêm', place: 'Khu đô thị Thủ Thiêm', type: 'Bất động sản ven sông', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=75', illustration: true },
  { name: 'GS Metrocity', place: 'Nhà Bè, TP.HCM', type: 'Khu đô thị tích hợp', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=75', illustration: true },
]

export const contactTopics = ['Tư vấn chọn dự án', 'Đầu tư bất động sản', 'Mua để ở']
