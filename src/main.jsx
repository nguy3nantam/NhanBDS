import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, Check, ChevronRight, MapPin,
  Menu, MessageCircle, Phone, Play, Quote, ShieldCheck, X
} from 'lucide-react'
import './styles.css'
import Admin from './Admin'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const projects = [
  {
    name: 'The Opera Residence',
    place: 'Thủ Thiêm, TP. Thủ Đức',
    type: 'Căn hộ hạng sang',
    image: asset('images/nhan-reel.jpg'),
  },
  {
    name: 'Sun Thủ Thiêm',
    place: 'Khu đô thị Thủ Thiêm',
    type: 'Bất động sản ven sông',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'GS Metrocity',
    place: 'Nhà Bè, TP.HCM',
    type: 'Khu đô thị tích hợp',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
  },
]

const services = [
  ['Tư vấn lựa chọn sản phẩm', 'Phân tích nhu cầu, khả năng tài chính và mục tiêu để lựa chọn bất động sản phù hợp.'],
  ['Phân tích đầu tư', 'Đánh giá vị trí, tiềm năng tăng giá, pháp lý và khả năng khai thác dòng tiền.'],
  ['Đồng hành giao dịch', 'Hỗ trợ xuyên suốt từ tham quan, đặt chỗ, thủ tục đến khi nhận bàn giao.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const go = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return <>
    <header className="header">
      <a className="brand" href="#top" aria-label="Trang chủ">
        <img className="brand-logo" src={asset('images/logo-mai-hoang-nhan.svg')} alt="Logo Mai Hoàng Nhân BĐS"/>
        <span><strong>MAI HOÀNG NHÂN</strong><small>REAL ESTATE ADVISOR</small></span>
      </a>
      <div className="desktop-header-links">
        <button onClick={() => go('#about')}>Về tôi</button>
        <button onClick={() => go('#projects')}>Dự án</button>
        <button onClick={() => go('#services')}>Dịch vụ</button>
        <button onClick={() => go('#contact')}>Liên hệ</button>
        <a href="tel:0909467505"><Phone/> <span><small>HOTLINE</small>0909 467 505</span></a>
      </div>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        <div className="offcanvas-head"><span>MENU</span><button onClick={() => setMenuOpen(false)} aria-label="Đóng menu"><X/></button></div>
        <button onClick={() => go('#about')}>Về tôi</button>
        <button onClick={() => go('#projects')}>Dự án</button>
        <button onClick={() => go('#services')}>Dịch vụ</button>
        <button onClick={() => go('#contact')}>Liên hệ</button>
        <button className="offcanvas-form-cta" onClick={() => go('#contact')}><MessageCircle/> Đăng ký tư vấn <ArrowRight/></button>
        <a className="nav-cta" href="tel:0909467505"><Phone size={16}/> 0909 467 505</a>
        <div className="offcanvas-socials">
          <p>KẾT NỐI VỚI NHÂN</p>
          <div>
            <a href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer" aria-label="Fanpage"><span>f</span> Fanpage</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="TikTok - đường dẫn sẽ được cập nhật"><span>♪</span> TikTok</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube - đường dẫn sẽ được cập nhật"><span>▶</span> YouTube</a>
          </div>
        </div>
        <div className="offcanvas-foot"><small>MAI HOÀNG NHÂN BĐS</small><span>Chọn đúng hôm nay — vững vàng ngày mai.</span></div>
      </nav>
      {menuOpen && <button className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-label="Đóng menu"/>}
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu">
        {menuOpen ? <X/> : <Menu/>}
      </button>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-photo" />
        <div className="hero-overlay" />
        <div className="hero-content reveal">
          <p className="eyebrow"><span/> Chuyên viên tư vấn bất động sản TP.HCM</p>
          <h1>Kiến tạo tài sản.<br/><em>Nâng tầm giá trị.</em></h1>
          <p className="hero-copy">Đồng hành cùng bạn tìm kiếm những bất động sản có giá trị, thông tin minh bạch và phù hợp với mục tiêu dài hạn.</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => go('#projects')}>Khám phá dự án <ArrowRight size={18}/></button>
            <a className="btn ghost" href="tel:0909467505"><Phone size={18}/> Tư vấn ngay</a>
          </div>
        </div>
        <div className="hero-stats">
          <div><b>06+</b><span>Năm kinh nghiệm</span></div>
          <div><b>870+</b><span>Người theo dõi</span></div>
          <div><b>100%</b><span>Tận tâm đồng hành</span></div>
        </div>
        <span className="scroll-label">CUỘN ĐỂ KHÁM PHÁ</span>
      </section>

      <section className="about section" id="about">
        <div className="about-image-wrap">
          <div className="about-image" />
          <div className="experience"><b>06</b><span>Năm thấu hiểu<br/>thị trường</span></div>
        </div>
        <div className="about-content">
          <p className="section-tag">VỀ MAI HOÀNG NHÂN</p>
          <h2>Mỗi lựa chọn đúng hôm nay sẽ trở thành <em>tài sản giá trị</em> trong tương lai.</h2>
          <p>Tôi là Mai Hoàng Nhân, chuyên viên tư vấn các dự án bất động sản tại Thành phố Hồ Chí Minh. Với tôi, tư vấn không chỉ là giới thiệu sản phẩm mà còn là lắng nghe, phân tích và đồng hành cùng khách hàng để đưa ra quyết định đúng đắn.</p>
          <p>Tôi tập trung vào các dự án có giá trị thực, pháp lý rõ ràng và tiềm năng phát triển bền vững.</p>
          <div className="checks">
            <span><Check/> Thông tin minh bạch</span>
            <span><Check/> Phân tích khách quan</span>
            <span><Check/> Đồng hành lâu dài</span>
          </div>
          <a className="text-link" href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer">Theo dõi câu chuyện của tôi <ArrowRight size={18}/></a>
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="section-head">
          <div><p className="section-tag">DỰ ÁN NỔI BẬT</p><h2>Không gian sống<br/><em>xứng tầm giá trị.</em></h2></div>
          <p>Các dự án được chọn lọc dựa trên vị trí, chất lượng phát triển và tiềm năng tăng trưởng dài hạn.</p>
        </div>
        <div className="project-grid">
          {projects.map((p, i) => <article className="project-card" key={p.name}>
            <img src={p.image} alt={`${p.name} – dự án bất động sản tại ${p.place}`} loading="lazy" decoding="async"/>
            <span className="project-no">0{i + 1}</span>
            <div className="project-info">
              <p>{p.type}</p><h3>{p.name}</h3>
              <span><MapPin size={15}/> {p.place}</span>
            </div>
            <button aria-label={`Xem ${p.name}`}><ArrowRight/></button>
          </article>)}
        </div>
      </section>

      <section className="services section" id="services">
        <div className="service-intro">
          <p className="section-tag">DỊCH VỤ TƯ VẤN</p>
          <h2>Không chỉ là môi giới.<br/><em>Là người đồng hành.</em></h2>
          <p>Mỗi quyết định về bất động sản đều cần kiến thức, dữ liệu và một chuyên viên tư vấn thực sự đặt lợi ích của khách hàng lên hàng đầu.</p>
          <ShieldCheck className="watermark"/>
        </div>
        <div className="service-list">
          {services.map((s, i) => <div className="service-row" key={s[0]}>
            <span>0{i + 1}</span><div><h3>{s[0]}</h3><p>{s[1]}</p></div><ChevronRight/>
          </div>)}
        </div>
      </section>

      <section className="testimonial">
        <Quote/>
        <blockquote>“Một giao dịch thành công không chỉ được đo bằng giá trị hợp đồng, mà còn bằng sự an tâm và niềm tin của khách hàng.”</blockquote>
        <p>— MAI HOÀNG NHÂN</p>
      </section>

      <section className="content section">
        <div className="section-head compact">
          <div><p className="section-tag">GÓC CHIA SẺ</p><h2>Kiến thức tạo nên<br/><em>quyết định đúng.</em></h2></div>
          <a href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer">Xem tất cả trên Facebook <ArrowRight size={18}/></a>
        </div>
        <div className="posts">
          <article className="post feature-post">
            <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85" alt="Bất động sản ven sông tại Thành phố Hồ Chí Minh" loading="lazy" decoding="async"/>
            <div><span>PHÂN TÍCH THỊ TRƯỜNG</span><h3>Vì sao bất động sản ven sông luôn giữ giá trị vượt thời gian?</h3><p>Khám phá những yếu tố tạo nên sức hút bền vững của các dự án ven sông tại TP.HCM.</p></div>
          </article>
          <article className="post video-post">
            <img src={asset('images/nhan-reel.jpg')} alt="The Opera Residence từ Facebook Mai Hoàng Nhân" loading="lazy" decoding="async"/>
            <a className="play" href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer"><Play fill="currentColor"/></a>
            <div><span>VIDEO • THỦ THIÊM</span><h3>Sun Thủ Thiêm — quỹ đất ven sông cuối cùng</h3></div>
          </article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-copy">
          <p className="section-tag light">BẮT ĐẦU HÀNH TRÌNH</p>
          <h2>Bạn đang tìm kiếm<br/>một bất động sản <em>phù hợp?</em></h2>
          <p>Hãy để lại thông tin hoặc liên hệ trực tiếp. Tôi sẽ phản hồi và trao đổi cùng bạn trong thời gian sớm nhất.</p>
          <div className="contact-links">
            <a href="tel:0909467505"><Phone/> <span><small>GỌI TRỰC TIẾP</small>0909 467 505</span></a>
            <a href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer"><MessageCircle/> <span><small>NHẮN TIN FACEBOOK</small>Mai Hoàng Nhân BĐS</span></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn! Anh Nhân sẽ sớm liên hệ lại.') }}>
          <label>Họ và tên<input required placeholder="Nhập họ tên của bạn"/></label>
          <label>Số điện thoại<input required type="tel" placeholder="Nhập số điện thoại"/></label>
          <label>Bạn quan tâm đến<select><option>Tư vấn chọn dự án</option><option>Đầu tư bất động sản</option><option>Mua để ở</option></select></label>
          <label>Lời nhắn<textarea rows="3" placeholder="Chia sẻ nhu cầu của bạn..."/></label>
          <button className="btn primary" type="submit">Gửi yêu cầu tư vấn <ArrowRight size={18}/></button>
        </form>
      </section>
    </main>

    <footer>
      <div className="brand footer-brand"><img className="brand-logo" src={asset('images/logo-mai-hoang-nhan.svg')} alt="Logo Mai Hoàng Nhân BĐS"/><span><strong>MAI HOÀNG NHÂN</strong><small>REAL ESTATE ADVISOR</small></span></div>
      <p>Chuyên viên tư vấn bất động sản tại TP.HCM.<br/>Chọn đúng hôm nay — vững vàng ngày mai.</p>
      <div className="footer-socials">
        <a href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer" aria-label="Fanpage Mai Hoàng Nhân">
          <span className="social-icon">f</span><b>Fanpage</b>
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} aria-label="TikTok - đường dẫn sẽ được cập nhật">
          <span className="social-icon tiktok">♪</span><b>TikTok</b>
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube - đường dẫn sẽ được cập nhật">
          <span className="social-icon youtube">▶</span><b>YouTube</b>
        </a>
      </div>
      <small>© 2026 Mai Hoàng Nhân. Đã đăng ký bản quyền.</small>
    </footer>

    <div className={contactOpen ? 'sticky-contact open' : 'sticky-contact'} aria-label="Liên hệ nhanh">
      <div className="sticky-options">
        <a className="sticky-item messenger" href="https://m.me/MaiHoangNhanbds" target="_blank" rel="noreferrer" aria-label="Nhắn Messenger">
          <MessageCircle/><span>Messenger</span>
        </a>
        <a className="sticky-item zalo" href="https://zalo.me/0909467505" target="_blank" rel="noreferrer" aria-label="Nhắn Zalo">
          <b>Zalo</b><span>Zalo</span>
        </a>
        <a className="sticky-item hotline" href="tel:0909467505" aria-label="Gọi hotline 0909 467 505">
          <Phone/><span>0909 467 505</span>
        </a>
      </div>
      <button className="contact-toggle" onClick={() => setContactOpen(!contactOpen)} aria-label={contactOpen ? 'Đóng liên hệ nhanh' : 'Mở liên hệ nhanh'} aria-expanded={contactOpen}>
        {contactOpen ? <X/> : <MessageCircle/>}<span>{contactOpen ? 'Đóng' : 'Liên hệ tư vấn'}</span>
      </button>
    </div>
  </>
}

createRoot(document.getElementById('root')).render(
  window.location.pathname.endsWith('/admin') ? <Admin /> : <App />
)
