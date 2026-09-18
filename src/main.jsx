import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import {
  ArrowRight, Check, ChevronRight, MapPin,
  Menu, MessageCircle, Phone, Play, Quote, ShieldCheck, X
} from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './styles.css'
import Admin from './Admin'
import ProjectDetail from './ProjectDetail'
import { projects, services, siteConfig, posts } from './data'
import { asset, scrollToSection } from './utils'

// GTM Component - dynamically injects GTM scripts from localStorage
function GTM() {
  useEffect(() => {
    const gtmHead = localStorage.getItem('gtm_head')
    const gtmBody = localStorage.getItem('gtm_body')

    // Clear existing GTM scripts
    document.querySelectorAll('[data-gtm]').forEach(el => el.remove())

    // Inject head script
    if (gtmHead && gtmHead.trim()) {
      const script = document.createElement('script')
      script.setAttribute('data-gtm', 'head')
      script.innerHTML = gtmHead
      document.head.appendChild(script)
    }

    // Inject body noscript
    if (gtmBody && gtmBody.trim()) {
      const noscript = document.createElement('noscript')
      noscript.setAttribute('data-gtm', 'body')
      noscript.innerHTML = gtmBody
      document.body.insertBefore(noscript, document.body.firstChild)
    }
  }, [])

  return null
}

function Header({ isOpen, onToggle, contactOpen, setContactOpen, isHome }) {
  const go = (id) => {
    if (isHome) {
      scrollToSection(id)
    } else {
      window.location.href = `/${id}`
    }
    setContactOpen(false)
  }

  return (
    <header className="header">
      <Link className="brand" to="/" aria-label="Trang chủ">
        <img className="brand-logo" src={asset('images/logo-mai-hoang-nhan.svg')} alt="Logo Mai Hoàng Nhân BĐS"/>
        <span><strong>MAI HOÀNG NHÂN</strong><small>REAL ESTATE ADVISOR</small></span>
      </Link>
      <div className="desktop-header-links">
        <button onClick={() => go('#about')}>Về tôi</button>
        <button onClick={() => go('#projects')}>Dự án</button>
        <button onClick={() => go('#services')}>Dịch vụ</button>
        <button onClick={() => go('#contact')}>Liên hệ</button>
        <a href={`tel:${siteConfig.hotline.replace(/\s/g, '')}`}><Phone/> <span><small>HOTLINE</small>{siteConfig.hotline}</span></a>
      </div>
      <nav className={isOpen ? 'nav open' : 'nav'}>
        <div className="offcanvas-head"><span>MENU</span><button onClick={onToggle} aria-label="Đóng menu"><X/></button></div>
        <button onClick={() => go('#about')}>Về tôi</button>
        <button onClick={() => go('#projects')}>Dự án</button>
        <button onClick={() => go('#services')}>Dịch vụ</button>
        <button onClick={() => go('#contact')}>Liên hệ</button>
        <button className="offcanvas-form-cta" onClick={() => go('#contact')}><MessageCircle/> Đăng ký tư vấn <ArrowRight/></button>
        <a className="nav-cta" href={`tel:${siteConfig.hotline.replace(/\s/g, '')}`}><Phone size={16}/> {siteConfig.hotline}</a>
        <div className="offcanvas-socials">
          <p>KẾT NỐI VỚI NHÂN</p>
          <div>
            <a href={siteConfig.facebook} target="_blank" rel="noreferrer" aria-label="Fanpage"><span>f</span> Fanpage</a>
            <a href={siteConfig.tiktok} onClick={(e) => e.preventDefault()} aria-label="TikTok"><span>♪</span> TikTok</a>
            <a href={siteConfig.youtube} onClick={(e) => e.preventDefault()} aria-label="YouTube"><span>▶</span> YouTube</a>
          </div>
        </div>
        <div className="offcanvas-foot"><small>MAI HOÀNG NHÂN BĐS</small><span>Chọn đúng hôm nay — vững vàng ngày mai.</span></div>
      </nav>
      {isOpen && <button className="nav-backdrop" onClick={onToggle} aria-label="Đóng menu"/>}
      <button className="menu" onClick={onToggle} aria-label={isOpen ? "Đóng menu" : "Mở menu"}>
        {isOpen ? <X/> : <Menu/>}
      </button>
    </header>
  )
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    })
    AOS.refresh()
  }, [])

  const go = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    console.log('Contact form submitted:', data)
    alert('Cảm ơn bạn! Anh Nhân sẽ sớm liên hệ lại.')
    e.target.reset()
  }

  return (
    <>
      <Header 
        isOpen={menuOpen} 
        onToggle={setMenuOpen} 
        contactOpen={contactOpen} 
        setContactOpen={setContactOpen}
        isHome={isHome}
      />
      {menuOpen && <button className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-label="Đóng menu"/>}

      <main id="top">
        <section className="hero">
          <div className="hero-photo" />
          <div className="hero-overlay" />
          <div className="hero-content reveal" data-aos="fade-up">
            <p className="eyebrow"><span/> Chuyên viên tư vấn bất động sản TP.HCM</p>
            <h1>Kiến tạo tài sản.<br/><em>Nâng tầm giá trị.</em></h1>
            <p className="hero-copy">Đồng hành cùng bạn tìm kiếm những bất động sản có giá trị, thông tin minh bạch và phù hợp với mục tiêu dài hạn.</p>
            <div className="hero-actions">
              <button className="btn primary" onClick={() => go('#projects')}>Khám phá dự án <ArrowRight size={18}/></button>
              <a className="btn ghost" href={`tel:${siteConfig.hotline.replace(/\s/g, '')}`}><Phone size={18}/> Tư vấn ngay</a>
            </div>
          </div>
          <div className="hero-stats" data-aos="fade-up" data-aos-delay="200">
            <div><b>06+</b><span>Năm kinh nghiệm</span></div>
            <div><b>870+</b><span>Người theo dõi</span></div>
            <div><b>100%</b><span>Tận tâm đồng hành</span></div>
          </div>
          <span className="scroll-label">CUỘN ĐỂ KHÁM PHÁ</span>
        </section>

        <section className="about section" id="about" data-aos="fade-up">
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
            <a className="text-link" href={siteConfig.facebook} target="_blank" rel="noreferrer">Theo dõi câu chuyện của tôi <ArrowRight size={18}/></a>
          </div>
        </section>

        <section className="projects section" id="projects" data-aos="fade-up">
          <div className="section-head">
            <div><p className="section-tag">DỰ ÁN NỔI BẬT</p><h2>Không gian sống<br/><em>xứng tầm giá trị.</em></h2></div>
            <p>Các dự án được chọn lọc dựa trên vị trí, chất lượng phát triển và tiềm năng tăng trưởng dài hạn.</p>
          </div>
          <div className="project-grid">
            {projects.map((p, i) => (
              <Link to={`/projects/${p.id}`} className="project-card" key={p.id}>
                <img src={p.image} alt={`${p.name} – dự án bất động sản tại ${p.place}`} loading="lazy" decoding="async"/>
                <span className="project-no">0{i + 1}</span>
                <div className="project-info">
                  <p>{p.type}</p><h3>{p.name}</h3>
                  <span><MapPin size={15}/> {p.place}</span>
                </div>
                <button aria-label={`Xem ${p.name}`}><ArrowRight/></button>
              </Link>
            ))}
          </div>
        </section>

        <section className="services section" id="services" data-aos="fade-up">
          <div className="service-intro">
            <p className="section-tag">DỊCH VỤ TƯ VẤN</p>
            <h2>Không chỉ là môi giới.<br/><em>Là người đồng hành.</em></h2>
            <p>Mỗi quyết định về bất động sản đều cần kiến thức, dữ liệu và một chuyên viên tư vấn thực sự đặt lợi ích của khách hàng lên hàng đầu.</p>
            <ShieldCheck className="watermark"/>
          </div>
          <div className="service-list">
            {services.map((s, i) => (
              <div className="service-row" key={s.id}>
                <span>0{i + 1}</span><div><h3>{s.title}</h3><p>{s.description}</p></div><ChevronRight/>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonial" data-aos="fade-up">
          <Quote/>
          <blockquote>“Một giao dịch thành công không chỉ được đo bằng giá trị hợp đồng, mà còn bằng sự an tâm và niềm tin của khách hàng.”</blockquote>
          <p>— MAI HOÀNG NHÂN</p>
        </section>

        <section className="content section" data-aos="fade-up">
          <div className="section-head compact">
            <div><p className="section-tag">GÓC CHIA SẺ</p><h2>Kiến thức tạo nên<br/><em>quyết định đúng.</em></h2></div>
            <a href={siteConfig.facebook} target="_blank" rel="noreferrer">Xem tất cả trên Facebook <ArrowRight size={18}/></a>
          </div>
          <div className="posts">
            {posts.map((post, i) => (
              <article className={`post ${post.type === 'video' ? 'video-post' : i === 0 ? 'feature-post' : ''}`} key={post.id} data-aos="fade-up" data-aos-delay={i * 100}>
                <img src={post.image} alt={post.title} loading="lazy" decoding="async"/>
                {post.type === 'video' && (
                  <a className="play" href={post.videoUrl} target="_blank" rel="noreferrer"><Play fill="currentColor"/></a>
                )}
                <div>
                  <span>{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact" data-aos="fade-up">
          <div className="contact-copy">
            <p className="section-tag light">BẮT ĐẦU HÀNH TRÌNH</p>
            <h2>Bạn đang tìm kiếm<br/>một bất động sản <em>phù hợp?</em></h2>
            <p>Hãy để lại thông tin hoặc liên hệ trực tiếp. Tôi sẽ phản hồi và trao đổi cùng bạn trong thời gian sớm nhất.</p>
            <div className="contact-links">
              <a href={`tel:${siteConfig.hotline.replace(/\s/g, '')}`}><Phone/> <span><small>GỌI TRỰC TIẾP</small>{siteConfig.hotline}</span></a>
              <a href={siteConfig.facebook} target="_blank" rel="noreferrer"><MessageCircle/> <span><small>NHẮN TIN FACEBOOK</small>Mai Hoàng Nhân BĐS</span></a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Họ và tên<input required placeholder="Nhập họ tên của bạn"/></label>
            <label>Số điện thoại<input required type="tel" placeholder="Nhập số điện thoại"/></label>
            <label>Bạn quan tâm đến<select>
              <option value="">Chọn nhu cầu</option>
              <option value="consulting">Tư vấn chọn dự án</option>
              <option value="investment">Đầu tư bất động sản</option>
              <option value="living">Mua để ở</option>
            </select></label>
            <label>Lời nhắn<textarea rows="3" placeholder="Chia sẻ nhu cầu của bạn..."/></label>
            <button className="btn primary" type="submit">Gửi yêu cầu tư vấn <ArrowRight size={18}/></button>
          </form>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand"><img className="brand-logo" src={asset('images/logo-mai-hoang-nhan.svg')} alt="Logo Mai Hoàng Nhân BĐS"/><span><strong>MAI HOÀNG NHÂN</strong><small>REAL ESTATE ADVISOR</small></span></div>
        <p>Chuyên viên tư vấn bất động sản tại TP.HCM.<br/>Chọn đúng hôm nay — vững vàng ngày mai.</p>
        <div className="footer-socials">
          <a href={siteConfig.facebook} target="_blank" rel="noreferrer" aria-label="Fanpage Mai Hoàng Nhân"><span className="social-icon">f</span><b>Fanpage</b></a>
          <a href={siteConfig.tiktok} onClick={(e) => e.preventDefault()} aria-label="TikTok"><span className="social-icon tiktok">♪</span><b>TikTok</b></a>
          <a href={siteConfig.youtube} onClick={(e) => e.preventDefault()} aria-label="YouTube"><span className="social-icon youtube">▶</span><b>YouTube</b></a>
        </div>
        <small>© 2026 Mai Hoàng Nhân. Đã đăng ký bản quyền.</small>
      </footer>

      <div className={contactOpen ? 'sticky-contact open' : 'sticky-contact'} aria-label="Liên hệ nhanh">
        <div className="sticky-options">
          <a className="sticky-item messenger" href={siteConfig.messenger} target="_blank" rel="noreferrer" aria-label="Nhắn Messenger"><MessageCircle/><span>Messenger</span></a>
          <a className="sticky-item zalo" href={siteConfig.zalo} target="_blank" rel="noreferrer" aria-label="Nhắn Zalo"><b>Zalo</b><span>Zalo</span></a>
          <a className="sticky-item hotline" href={`tel:${siteConfig.hotline.replace(/\s/g, '')}`} aria-label={`Gọi hotline ${siteConfig.hotline}`}><Phone/><span>{siteConfig.hotline}</span></a>
        </div>
        <button className="contact-toggle" onClick={() => setContactOpen(!contactOpen)} aria-label={contactOpen ? 'Đóng liên hệ nhanh' : 'Mở liên hệ nhanh'} aria-expanded={contactOpen}>
          {contactOpen ? <X/> : <MessageCircle/>}<span>{contactOpen ? 'Đóng' : 'Liên hệ tư vấn'}</span>
        </button>
      </div>
    </>
  )
}

// Projects listing page
function ProjectsList() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    })
    AOS.refresh()
  }, [])

  const go = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <>
      <Header 
        isOpen={menuOpen} 
        onToggle={setMenuOpen} 
        contactOpen={contactOpen} 
        setContactOpen={setContactOpen}
        isHome={false}
      />
      {menuOpen && <button className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-label="Đóng menu"/>}

      <main id="top">
        <section className="projects section" id="projects" data-aos="fade-up">
          <div className="section-head">
            <div><p className="section-tag">TẤT CẢ DỰ ÁN</p><h2>Không gian sống<br/><em>xứng tầm giá trị.</em></h2></div>
            <p>Các dự án được chọn lọc dựa trên vị trí, chất lượng phát triển và tiềm năng tăng trưởng dài hạn.</p>
          </div>
          <div className="project-grid">
            {projects.map((p, i) => (
              <Link to={`/projects/${p.id}`} className="project-card" key={p.id}>
                <img src={p.image} alt={`${p.name} – dự án bất động sản tại ${p.place}`} loading="lazy" decoding="async"/>
                <span className="project-no">0{i + 1}</span>
                <div className="project-info">
                  <p>{p.type}</p><h3>{p.name}</h3>
                  <span><MapPin size={15}/> {p.place}</span>
                </div>
                <button aria-label={`Xem ${p.name}`}><ArrowRight/></button>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand"><img className="brand-logo" src={asset('images/logo-mai-hoang-nhan.svg')} alt="Logo Mai Hoàng Nhân BĐS"/><span><strong>MAI HOÀNG NHÂN</strong><small>REAL ESTATE ADVISOR</small></span></div>
        <p>Chuyên viên tư vấn bất động sản tại TP.HCM.<br/>Chọn đúng hôm nay — vững vàng ngày mai.</p>
        <div className="footer-socials">
          <a href={siteConfig.facebook} target="_blank" rel="noreferrer" aria-label="Fanpage Mai Hoàng Nhân"><span className="social-icon">f</span><b>Fanpage</b></a>
          <a href={siteConfig.tiktok} onClick={(e) => e.preventDefault()} aria-label="TikTok"><span className="social-icon tiktok">♪</span><b>TikTok</b></a>
          <a href={siteConfig.youtube} onClick={(e) => e.preventDefault()} aria-label="YouTube"><span className="social-icon youtube">▶</span><b>YouTube</b></a>
        </div>
        <small>© 2026 Mai Hoàng Nhân. Đã đăng ký bản quyền.</small>
      </footer>

      <div className={contactOpen ? 'sticky-contact open' : 'sticky-contact'} aria-label="Liên hệ nhanh">
        <div className="sticky-options">
          <a className="sticky-item messenger" href={siteConfig.messenger} target="_blank" rel="noreferrer" aria-label="Nhắn Messenger"><MessageCircle/><span>Messenger</span></a>
          <a className="sticky-item zalo" href={siteConfig.zalo} target="_blank" rel="noreferrer" aria-label="Nhắn Zalo"><b>Zalo</b><span>Zalo</span></a>
          <a className="sticky-item hotline" href={`tel:${siteConfig.hotline.replace(/\s/g, '')}`} aria-label={`Gọi hotline ${siteConfig.hotline}`}><Phone/><span>{siteConfig.hotline}</span></a>
        </div>
        <button className="contact-toggle" onClick={() => setContactOpen(!contactOpen)} aria-label={contactOpen ? 'Đóng liên hệ nhanh' : 'Mở liên hệ nhanh'} aria-expanded={contactOpen}>
          {contactOpen ? <X/> : <MessageCircle/>}<span>{contactOpen ? 'Đóng' : 'Liên hệ tư vấn'}</span>
        </button>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <GTM />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)