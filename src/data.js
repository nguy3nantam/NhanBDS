import { asset } from './utils';

export const projects = [
  {
    id: 'the-opera-residence',
    name: 'The Opera Residence',
    place: 'Thủ Thiêm, TP. Thủ Đức',
    type: 'Căn hộ hạng sang',
    image: asset('images/nhan-reel.jpg'),
    gallery: [
      asset('images/nhan-reel.jpg'),
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'The Opera Residence là dự án căn hộ hạng sang tại trung tâm Thủ Thiêm, sở hữu vị trí đắc địa ven sông Sài Gòn với tầm nhìn panoramic tuyệt đẹp.',
    features: [
      { icon: 'MapPin', label: 'Vị trí', value: 'Thủ Thiêm, TP. Thủ Đức' },
      { icon: 'Home', label: 'Loại hình', value: 'Căn hộ hạng sang' },
      { icon: 'Building', label: 'Quy mô', value: '2 tháp, 35 tầng' },
      { icon: 'Calendar', label: 'Bàn giao', value: 'Quý 4/2026' },
    ],
    highlights: [
      'Vị trí trung tâm CBD Thủ Thiêm',
      'Tầm nhìn sông Sài Gòn 180 độ',
      'Tiện ích 5 sao: hồ bơi, gym, spa, sky garden',
      'Pháp lý sổ đỏ lâu dài',
    ],
    location: { lat: 10.7769, lng: 106.7381 },
  },
  {
    id: 'sun-thu-thiem',
    name: 'Sun Thủ Thiêm',
    place: 'Khu đô thị Thủ Thiêm',
    type: 'Bất động sản ven sông',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
      asset('images/nhan-reel.jpg'),
    ],
    description: 'Sun Thủ Thiêm sở hữu quỹ đất ven sông cuối cùng tại Thủ Thiêm, là cơ hội đầu tư hiếm có với tiềm năng tăng giá trị vượt trội.',
    features: [
      { icon: 'MapPin', label: 'Vị trí', value: 'Khu đô thị Thủ Thiêm' },
      { icon: 'Home', label: 'Loại hình', value: 'Biệt thự & Shophouse' },
      { icon: 'Building', label: 'Quy mô', value: 'Khu đô thị tích hợp' },
      { icon: 'Calendar', label: 'Bàn giao', value: 'Quý 2/2027' },
    ],
    highlights: [
      'Quỹ đất ven sông hiếm có cuối cùng',
      'Kết nối trực tiếp với trung tâm TP.HCM',
      'Cộng đồng văn minh, tiện ích đồng bộ',
      'Cam kết pháp lý minh bạch',
    ],
    location: { lat: 10.7721, lng: 106.7423 },
  },
  {
    id: 'gs-metrocity',
    name: 'GS Metrocity',
    place: 'Nhà Bè, TP.HCM',
    type: 'Khu đô thị tích hợp',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
      asset('images/nhan-reel.jpg'),
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'GS Metrocity là khu đô thị tích hợp quy mô lớn tại Nhà Bè, kết nối thuận tiện với trung thành phố qua đường vành đai 2 và tuyến metro số 2.',
    features: [
      { icon: 'MapPin', label: 'Vị trí', value: 'Nhà Bè, TP.HCM' },
      { icon: 'Home', label: 'Loại hình', value: 'Căn hộ, biệt thự, shophouse' },
      { icon: 'Building', label: 'Quy mô', value: '200 ha, 10.000+ hộ dân' },
      { icon: 'Calendar', label: 'Bàn giao', value: 'Đang phân kỳ' },
    ],
    highlights: [
      'Khu đô thị tự chủ, tiện ích toàn diện',
      'Gần trạm Metro số 2 (đang xây dựng)',
      'Hệ thống công viên, hồ nhân tạo lớn',
      'Giá cạnh tranh, phù hợp đầu tư dài hạn',
    ],
    location: { lat: 10.6682, lng: 106.6845 },
  },
];

export const services = [
  {
    id: 1,
    title: 'Tư vấn lựa chọn sản phẩm',
    description: 'Phân tích nhu cầu, khả năng tài chính và mục tiêu để lựa chọn bất động sản phù hợp nhất.',
    icon: 'Search',
  },
  {
    id: 2,
    title: 'Phân tích đầu tư',
    description: 'Đánh giá vị trí, tiềm năng tăng giá, pháp lý và khả năng khai thác dòng tiền hiệu quả.',
    icon: 'BarChart3',
  },
  {
    id: 3,
    title: 'Đồng hành giao dịch',
    description: 'Hỗ trợ xuyên suốt từ tham quan, đặt chỗ, thủ tục pháp lý đến khi nhận bàn giao nhà.',
    icon: 'ShieldCheck',
  },
];

export const leads = [
  { id: 1, name: 'Nguyễn Minh Tuấn', phone: '0912 345 678', need: 'Tư vấn chọn dự án', time: 'Hôm nay, 09:24', status: 'Mới' },
  { id: 2, name: 'Trần Ngọc Anh', phone: '0988 221 456', need: 'Đầu tư bất động sản', time: 'Hôm qua, 16:40', status: 'Đã liên hệ' },
  { id: 3, name: 'Lê Hoàng Nam', phone: '0903 754 821', need: 'Mua để ở', time: '16/09/2026', status: 'Đang tư vấn' },
];

export const siteConfig = {
  name: 'Mai Hoàng Nhân BĐS',
  tagline: 'Tư vấn Bất Động sản – Chọn đúng, đầu tư thông minh',
  hotline: '0909 467 505',
  email: 'nhan@maihoangnhanbds.com',
  address: 'Thành phố Hồ Chí Minh',
  facebook: 'https://www.facebook.com/MaiHoangNhanbds',
  zalo: 'https://zalo.me/0909467505',
  messenger: 'https://m.me/MaiHoangNhanbds',
  tiktok: '#',
  youtube: '#',
  seo: {
    title: 'Mai Hoàng Nhân | Tư vấn bất động sản TP.HCM',
    description: 'Mai Hoàng Nhân – Chuyên viên tư vấn bất động sản cao cấp tại Thành phố Hồ Chí Minh. Đồng hành chọn đúng, đầu tư thông minh.',
    keywords: 'bất động sản TP.HCM, tư vấn căn hộ, Mai Hoàng Nhân BĐS, đầu tư bất động sản',
    ogImage: asset('images/og-image.jpg'),
  },
};

export const posts = [
  {
    id: 1,
    title: 'Vì sao bất động sản ven sông luôn giữ giá trị vượt thời gian?',
    excerpt: 'Khám phá những yếu tố tạo nên sức hút bền vững của các dự án ven sông tại TP.HCM.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85',
    category: 'PHÂN TÍCH THỊ TRƯỜNG',
    type: 'article',
    date: '2026-09-15',
  },
  {
    id: 2,
    title: 'Sun Thủ Thiêm — quỹ đất ven sông cuối cùng',
    excerpt: 'Cơ hội đầu tư hiếm có tại quỹ đất ven sông cuối cùng của Thủ Thiêm.',
    image: asset('images/nhan-reel.jpg'),
    category: 'VIDEO • THỦ THIÊM',
    type: 'video',
    date: '2026-09-10',
    videoUrl: 'https://www.facebook.com/MaiHoangNhanbds',
  },
  {
    id: 3,
    title: 'Kinh nghiệm lựa chọn căn hộ để đầu tư sinh lời',
    excerpt: 'Những tiêu chí quan trọng khi chọn căn hộ đầu tư tại TP.HCM năm 2026.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
    category: 'KINH NGHIỆM',
    type: 'article',
    date: '2026-09-05',
  },
];