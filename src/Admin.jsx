import { useEffect, useState } from 'react'
import {
  BarChart3, Bell, ChevronDown, Eye, FileText, FolderKanban,
  Globe2, Home, Image, LayoutDashboard, Menu, MessageSquare,
  MoreHorizontal, Pencil, Plus, Search, Settings, Users, X
} from 'lucide-react'
import './admin.css'

const projects = [
  { name: 'The Opera Residence', location: 'Thủ Thiêm, TP. Thủ Đức', image: '/images/nhan-reel.jpg', status: 'Đang hiển thị' },
  { name: 'Sun Thủ Thiêm', location: 'Khu đô thị Thủ Thiêm', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80', status: 'Đang hiển thị' },
  { name: 'GS Metrocity', location: 'Nhà Bè, TP.HCM', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80', status: 'Bản nháp' },
]

const nav = [
  ['Tổng quan', LayoutDashboard], ['Lead khách hàng', Users],
  ['Slider trang chủ', Image], ['Bài viết', FileText], ['Thư viện ảnh', Image],
  ['Liên hệ', MessageSquare], ['SEO website', Search], ['Cài đặt', Settings],
]

const leads = [
  ['Nguyễn Minh Tuấn', '0912 345 678', 'Tư vấn chọn dự án', 'Hôm nay, 09:24', 'Mới'],
  ['Trần Ngọc Anh', '0988 221 456', 'Đầu tư bất động sản', 'Hôm qua, 16:40', 'Đã liên hệ'],
  ['Lê Hoàng Nam', '0903 754 821', 'Mua để ở', '16/09/2026', 'Đang tư vấn'],
]

function SectionView({ active }) {
  if (active === 'Lead khách hàng') return <section className="panel admin-section">
    <SectionHeader title="Lead khách hàng" description="Khách hàng đăng ký tư vấn từ biểu mẫu trên website" button="Xuất danh sách"/>
    <div className="lead-table">
      <div className="lead-row lead-head"><span>KHÁCH HÀNG</span><span>SỐ ĐIỆN THOẠI</span><span>NHU CẦU</span><span>THỜI GIAN</span><span>TRẠNG THÁI</span></div>
      {leads.map((lead) => <div className="lead-row" key={lead[1]}>{lead.map((v,i)=><span className={i===4?'lead-status':''} key={i}>{v}</span>)}</div>)}
    </div>
  </section>

  if (active === 'Slider trang chủ') return <section className="panel admin-section">
    <SectionHeader title="Slider trang chủ" description="Quản lý hình ảnh và thông điệp nổi bật trên đầu trang" button="Thêm slide"/>
    <div className="slider-admin-grid">
      <article className="slide-admin-card"><img src="/images/nhan-reel.jpg" alt="Slide trang chủ"/><div><span>SLIDE 01 • ĐANG HIỂN THỊ</span><h3>Kiến tạo tài sản. Nâng tầm giá trị.</h3><p>Đồng hành cùng khách hàng tìm kiếm bất động sản phù hợp.</p><button><Pencil/> Chỉnh sửa</button></div></article>
      <button className="add-slide"><Plus/><b>Thêm slide mới</b><small>JPG, PNG hoặc WebP</small></button>
    </div>
  </section>

  if (active === 'Bài viết') return <section className="panel admin-section">
    <SectionHeader title="Bài viết" description="Quản lý nội dung trong mục Góc chia sẻ" button="Viết bài mới"/>
    <div className="content-list">
      {['Vì sao bất động sản ven sông luôn giữ giá trị?', 'Sun Thủ Thiêm — quỹ đất ven sông cuối cùng', 'Kinh nghiệm lựa chọn căn hộ để đầu tư'].map((title,i)=><article key={title}><span className="doc-icon"><FileText/></span><div><h3>{title}</h3><p>{i===2?'Bản nháp':'Đã đăng'} • Cập nhật {i+1} ngày trước</p></div><button><MoreHorizontal/></button></article>)}
    </div>
  </section>

  if (active === 'Thư viện ảnh') return <section className="panel admin-section">
    <SectionHeader title="Thư viện ảnh" description="Hình ảnh cá nhân, dự án và bài viết trên website" button="Tải ảnh lên"/>
    <div className="media-grid">
      {['/images/nhan-profile.jpg','/images/nhan-reel.jpg','https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=500&q=80'].map((src,i)=><div key={src}><img src={src} alt={`Ảnh thư viện ${i+1}`}/><button><MoreHorizontal/></button></div>)}
      <button className="media-upload"><Plus/><span>Thêm hình ảnh</span></button>
    </div>
  </section>

  if (active === 'Liên hệ') return <section className="panel admin-section">
    <SectionHeader title="Thông tin liên hệ" description="Thông tin hiển thị trên website và các kênh mạng xã hội" button="Lưu thay đổi"/>
    <div className="admin-form-grid">
      <AdminField label="Số hotline" value="0909 467 505"/><AdminField label="Địa điểm" value="Thành phố Hồ Chí Minh"/>
      <AdminField label="Fanpage" value="facebook.com/MaiHoangNhanbds"/><AdminField label="Zalo" value="zalo.me/0909467505"/>
      <AdminField label="TikTok" value="Chưa thiết lập"/><AdminField label="YouTube" value="Chưa thiết lập"/>
    </div>
  </section>

  if (active === 'SEO website') return <section className="panel admin-section">
    <SectionHeader title="SEO website" description="Tối ưu thông tin hiển thị trên Google và công cụ tìm kiếm" button="Lưu cấu hình SEO"/>
    <div className="seo-layout"><div className="admin-form-grid one-col">
      <AdminField label="Tiêu đề SEO" value="Mai Hoàng Nhân | Tư vấn bất động sản TP.HCM"/>
      <label>Mô tả website<textarea defaultValue="Mai Hoàng Nhân – Chuyên viên tư vấn bất động sản cao cấp tại Thành phố Hồ Chí Minh."/></label>
      <AdminField label="Từ khóa chính" value="bất động sản TP.HCM, tư vấn căn hộ, Mai Hoàng Nhân BĐS"/>
    </div><div className="google-preview"><small>XEM TRƯỚC TRÊN GOOGLE</small><div><span>maihoangnhanbds.com</span><h3>Mai Hoàng Nhân | Tư vấn bất động sản TP.HCM</h3><p>Mai Hoàng Nhân – Chuyên viên tư vấn bất động sản cao cấp tại Thành phố Hồ Chí Minh.</p></div></div></div>
  </section>

  if (active === 'Cài đặt') return <section className="panel admin-section">
    <SectionHeader title="Cài đặt website" description="Thiết lập thông tin chung và trạng thái hoạt động" button="Lưu cài đặt"/>
    <div className="admin-form-grid"><AdminField label="Tên website" value="Mai Hoàng Nhân BĐS"/><AdminField label="Tên miền" value="maihoangnhanbds.com"/><AdminField label="Ngôn ngữ" value="Tiếng Việt"/><AdminField label="Múi giờ" value="Việt Nam (GMT+7)"/></div>
    <div className="setting-toggles"><label><span><b>Hiển thị nút liên hệ nhanh</b><small>Hotline, Zalo và Messenger</small></span><input type="checkbox" defaultChecked/></label><label><span><b>Thông báo khi có lead mới</b><small>Nhận thông báo từ biểu mẫu tư vấn</small></span><input type="checkbox" defaultChecked/></label></div>
  </section>
  return null
}

function SectionHeader({ title, description, button }) {
  return <div className="section-admin-head"><div><p>QUẢN LÝ NỘI DUNG</p><h2>{title}</h2><span>{description}</span></div><button><Plus/> {button}</button></div>
}

function AdminField({ label, value }) { return <label>{label}<input defaultValue={value}/></label> }

export default function Admin() {
  const [active, setActive] = useState('Tổng quan')
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]')
    const previous = robots?.content
    if (robots) robots.content = 'noindex, nofollow'
    document.title = 'Trang quản trị | Mai Hoàng Nhân BĐS'
    return () => {
      if (robots && previous) robots.content = previous
      document.title = 'Mai Hoàng Nhân BĐS | Tư vấn bất động sản TP.HCM'
    }
  }, [])

  return <div className="admin-shell">
    <aside className={mobileMenu ? 'admin-sidebar open' : 'admin-sidebar'}>
      <div className="admin-logo">
        <img src="/images/logo-mai-hoang-nhan.svg" alt="Logo Mai Hoàng Nhân BĐS"/><div><b>NHÂN BĐS</b><small>TRANG QUẢN TRỊ</small></div>
        <button onClick={() => setMobileMenu(false)}><X/></button>
      </div>
      <p className="nav-caption">QUẢN LÝ WEBSITE</p>
      <nav>
        {nav.map(([label, Icon]) => <button className={active === label ? 'active' : ''} onClick={() => { setActive(label); setMobileMenu(false) }} key={label}>
          <Icon/><span>{label}</span>{label === 'Lead khách hàng' && <em>3</em>}
        </button>)}
      </nav>
      <div className="site-status"><span/><div><small>TRẠNG THÁI WEBSITE</small><b>Đang hoạt động</b></div></div>
      <a className="view-site" href="/"><Globe2/> Xem website</a>
    </aside>

    <div className="admin-main">
      <header className="admin-topbar">
        <button className="admin-menu" onClick={() => setMobileMenu(true)}><Menu/></button>
        <div className="admin-search"><Search/><input placeholder="Tìm kiếm nội dung..."/></div>
        <div className="top-actions">
          <button className="notification"><Bell/><span>3</span></button>
          <div className="admin-user"><img src="/images/nhan-profile.jpg" alt="Mai Hoàng Nhân"/><div><b>Mai Hoàng Nhân</b><small>Quản trị viên</small></div><ChevronDown/></div>
        </div>
      </header>

      <main className="admin-content">
        <div className="admin-title">
          <div><p>TRANG QUẢN TRỊ</p><h1>Xin chào, anh Nhân!</h1><span>Tổng quan hoạt động website của anh hôm nay.</span></div>
          <div><a href="/" className="outline-button"><Eye/> Xem website</a><button className="gold-button"><Plus/> Tạo nội dung</button></div>
        </div>

        <section className="metric-grid">
          <article><div className="metric-icon"><Eye/></div><p>LƯỢT XEM WEBSITE</p><strong>2.486</strong><span className="up">↑ 12,5% <i>so với tháng trước</i></span></article>
          <article><div className="metric-icon"><MessageSquare/></div><p>YÊU CẦU TƯ VẤN</p><strong>38</strong><span className="up">↑ 8,2% <i>so với tháng trước</i></span></article>
          <article><div className="metric-icon"><FolderKanban/></div><p>DỰ ÁN ĐANG HIỂN THỊ</p><strong>03</strong><span><i>1 dự án bản nháp</i></span></article>
          <article><div className="metric-icon"><FileText/></div><p>BÀI VIẾT ĐÃ ĐĂNG</p><strong>12</strong><span><i>Cập nhật 3 ngày trước</i></span></article>
        </section>

        <section className="admin-grid">
          <article className="panel performance">
            <div className="panel-head"><div><h2>Hiệu suất website</h2><p>Lượt truy cập trong 7 ngày gần nhất</p></div><button>7 ngày qua <ChevronDown/></button></div>
            <div className="chart-wrap">
              <div className="y-labels"><span>600</span><span>450</span><span>300</span><span>150</span><span>0</span></div>
              <div className="chart">
                {[38,55,43,72,64,86,76].map((h,i)=><div className="bar-col" key={i}><div style={{height:`${h}%`}}><span>{Math.round(h*6.1)}</span></div><small>{['T2','T3','T4','T5','T6','T7','CN'][i]}</small></div>)}
              </div>
            </div>
          </article>

          <article className="panel quick-actions">
            <div className="panel-head"><div><h2>Thao tác nhanh</h2><p>Quản lý nội dung thường dùng</p></div></div>
            <button><span><FolderKanban/></span><div><b>Thêm dự án mới</b><small>Tạo thông tin dự án bất động sản</small></div><Plus/></button>
            <button><span><FileText/></span><div><b>Viết bài chia sẻ</b><small>Thêm bài viết vào góc chia sẻ</small></div><Plus/></button>
            <button><span><Image/></span><div><b>Tải hình ảnh lên</b><small>Quản lý thư viện hình ảnh</small></div><Plus/></button>
          </article>
        </section>

        <section className="panel project-panel">
          <div className="panel-head"><div><h2>Dự án gần đây</h2><p>Quản lý các dự án đang hiển thị trên website</p></div><button className="plain-link">Xem tất cả →</button></div>
          <div className="project-table">
            <div className="table-head"><span>DỰ ÁN</span><span>VỊ TRÍ</span><span>TRẠNG THÁI</span><span>CẬP NHẬT</span><span/></div>
            {projects.map((p,i)=><div className="table-row" key={p.name}>
              <div className="project-name"><img src={p.image} alt=""/><b>{p.name}</b></div>
              <span>{p.location}</span><span className={p.status === 'Bản nháp' ? 'status draft' : 'status'}>{p.status}</span>
              <span>{i === 0 ? 'Hôm nay' : i === 1 ? '2 ngày trước' : '5 ngày trước'}</span><button><MoreHorizontal/></button>
            </div>)}
          </div>
        </section>
        {active !== 'Tổng quan' && <div className="section-overlay"><SectionView active={active}/></div>}
      </main>
    </div>
  </div>
}
