import { useState } from 'react'
import {
  ArrowRight, Check, ChevronRight, MapPin,
  Menu, MessageCircle, Phone, Quote, ShieldCheck, X
} from 'lucide-react'
import './styles.css'
import { asset, projects } from './data'
import ContactForm from './ContactForm'
import ProjectDialog from './ProjectDialog'
import useDialog from './useDialog'

const services = [
  ['Tư vấn lựa chọn sản phẩm', 'Phân tích nhu cầu, khả năng tài chính và mục tiêu để lựa chọn bất động sản phù hợp.'],
  ['Phân tích đầu tư', 'Đánh giá vị trí, tiềm năng tăng giá, pháp lý và khả năng khai thác dòng tiền.'],
  ['Đồng hành giao dịch', 'Hỗ trợ xuyên suốt từ tham quan, đặt chỗ, thủ tục đến khi nhận bàn giao.'],
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [contactProject, setContactProject] = useState('')
  const menuRef = useDialog(menuOpen)

  const go = (id) => {
    setMenuOpen(false)
    requestAnimationFrame(() => {
      const target = document.querySelector(id)
      target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      target?.focus({ preventScroll: true })
    })
  }

  return <>
    <a className="skip-link" href="#top">Bỏ qua menu, đến nội dung</a>
    <header className="header">
      <a className="brand" href="#top">
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
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={menuOpen} aria-controls="site-menu">
        {menuOpen ? <X/> : <Menu/>}
      </button>
    </header>
      <dialog ref={menuRef} id="site-menu" className="menu-dialog" aria-label="Menu chính" onCancel={() => setMenuOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setMenuOpen(false) }}>
      <nav className="nav" aria-label="Điều hướng chính">
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
            <a href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer" aria-label="Fanpage"><span aria-hidden="true"><svg viewBox="0 0 320 512" width="11" height="11" fill="currentColor" focusable="false"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg></span> Fanpage</a>
          </div>
        </div>
        <div className="offcanvas-foot"><small>MAI HOÀNG NHÂN BĐS</small><span>Chọn đúng hôm nay — vững vàng ngày mai.</span></div>
      </nav>
      </dialog>


    <main id="top" tabIndex={-1}>
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

      <section className="about section" id="about" tabIndex={-1}>
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

      <section className="projects section" id="projects" tabIndex={-1}>
        <div className="section-head">
          <div><p className="section-tag">DỰ ÁN NỔI BẬT</p><h2>Không gian sống<br/><em>xứng tầm giá trị.</em></h2></div>
          <p>Các dự án được chọn lọc dựa trên vị trí, chất lượng phát triển và tiềm năng tăng trưởng dài hạn.</p>
        </div>
        <div className="project-grid">
          {projects.map((p, i) => <article className="project-card" key={p.name}>
            <img src={p.image} alt={p.illustration ? `Không gian sống minh họa cho mục ${p.name}` : `${p.name} – ${p.place}`} width="900" height="600" loading="lazy" decoding="async"/>
            <span className="project-no">0{i + 1}</span>{p.illustration && <span className="illustration-badge">Ảnh minh họa</span>}
            <div className="project-info">
              <p>{p.type}</p><h3>{p.name}</h3>
              <span><MapPin size={15}/> {p.place}</span>
            </div>
            <button aria-label={`Xem ${p.name}`} onClick={() => setSelectedProject(p)}><ArrowRight/></button>
          </article>)}
        </div>
      </section>

      <section className="services section" id="services" tabIndex={-1}>
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
            <img src={asset('images/post-value-guide.jpg')} alt="Không gian nhà ở minh họa" width="900" height="600" loading="lazy" decoding="async"/>
            <div><span>GÓC NHÌN THỊ TRƯỜNG</span><h3>Điều gì tạo nên giá trị của một không gian sống?</h3><p>Cùng Nhân trao đổi về vị trí, tiện ích và nhu cầu khi lựa chọn bất động sản.</p><a className="text-link" href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer">Xem chia sẻ trên Facebook <ArrowRight size={16}/></a></div>
          </article>
          <article className="post video-post">
            <img src={asset('images/nhan-reel.jpg')} alt="The Opera Residence từ Facebook Mai Hoàng Nhân" loading="lazy" decoding="async"/>
            <a aria-label="Mở trang chia sẻ của Nhân trên Facebook" className="play" href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer"><MessageCircle/></a>
            <div><span>CHIA SẺ TRÊN FACEBOOK</span><h3>Cùng Nhân khám phá không gian sống</h3></div>
          </article>
        </div>
      </section>

      <section className="contact" id="contact" tabIndex={-1}>
        <div className="contact-copy">
          <p className="section-tag light">BẮT ĐẦU HÀNH TRÌNH</p>
          <h2>Bạn đang tìm kiếm<br/>một bất động sản <em>phù hợp?</em></h2>
          <p>Soạn nội dung tư vấn và gửi qua Zalo, Messenger hoặc gọi trực tiếp. Tôi sẽ trao đổi cùng bạn về nhu cầu và dự án phù hợp.</p>
          <div className="contact-links">
            <a href="tel:0909467505"><Phone/> <span><small>GỌI TRỰC TIẾP</small>0909 467 505</span></a>
            <a href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer"><MessageCircle/> <span><small>NHẮN TIN FACEBOOK</small>Mai Hoàng Nhân BĐS</span></a>
            <a href="https://zalo.me/0909467505" target="_blank" rel="noreferrer"><b className="zalo-icon">Zalo</b> <span><small>NHẮN TIN ZALO</small>0909 467 505</span></a>
          </div>
        </div>
        <ContactForm project={contactProject} onClearProject={() => setContactProject('')}/>
      </section>
    </main>

    <footer>
      <div className="brand footer-brand"><img className="brand-logo" src={asset('images/logo-mai-hoang-nhan.svg')} alt="Logo Mai Hoàng Nhân BĐS"/><span><strong>MAI HOÀNG NHÂN</strong><small>REAL ESTATE ADVISOR</small></span></div>
      <p>Chuyên viên tư vấn bất động sản tại TP.HCM.<br/>Chọn đúng hôm nay — vững vàng ngày mai.</p>
      <div className="footer-socials">
        <a href="https://www.facebook.com/MaiHoangNhanbds" target="_blank" rel="noreferrer" aria-label="Fanpage Mai Hoàng Nhân">
          <span className="social-icon" aria-hidden="true"><svg viewBox="0 0 320 512" width="11" height="11" fill="currentColor" focusable="false"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg></span><b>Fanpage</b>
        </a>
      </div>
      <small>© {new Date().getFullYear()} Mai Hoàng Nhân. • Design By Tamdev</small>
    </footer>

    <div className={contactOpen ? 'sticky-contact open' : 'sticky-contact'} role="group" aria-label="Liên hệ nhanh">
      <div className="sticky-options" id="quick-contact-options" inert={!contactOpen}>
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
      <button className="contact-toggle" onClick={() => setContactOpen(!contactOpen)} aria-label={contactOpen ? 'Đóng liên hệ nhanh' : 'Mở liên hệ tư vấn'} aria-expanded={contactOpen} aria-controls="quick-contact-options">
        {contactOpen ? <X/> : <MessageCircle/>}<span>{contactOpen ? 'Đóng' : 'Liên hệ tư vấn'}</span>
      </button>
    </div>
    <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} onContact={(name) => {
      setSelectedProject(null)
      setContactProject(name)
      requestAnimationFrame(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
        document.getElementById('contact-name')?.focus({ preventScroll: true })
      })
    }}/>
  </>
}

