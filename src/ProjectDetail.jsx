import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, MapPin, Home, Building, Calendar, ChevronRight,
  ChevronLeft, X, Share2, Phone, MessageCircle, Heart
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { projects, siteConfig } from './data';
import { asset } from './utils';
import './styles.css';
import 'aos/dist/aos.css';

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  if (!project) {
    return (
      <div className="not-found" data-aos="fade-up">
        <ArrowLeft className="back-btn" onClick={() => window.history.back()} />
        <h1>Không tìm thấy dự án</h1>
        <p>Dự án bạn tìm kiếm không tồn tại hoặc đã được gỡ bỏ.</p>
        <Link to="/projects" className="btn primary">Quay lại danh sách</Link>
      </div>
    );
  }

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % project.gallery.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);

  useEffect(() => {
    document.title = `${project.name} | ${siteConfig.name}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', project.description);
  }, [project]);

  return (
    <>
      <header className="header">
        <button className="menu back-btn" onClick={() => window.history.back()} aria-label="Quay lại">
          <ArrowLeft />
        </button>
        <a className="brand" href="/" aria-label="Trang chủ">
          <img className="brand-logo" src={asset('images/logo-mai-hoang-nhan.svg')} alt="Logo Mai Hoàng Nhân BĐS"/>
          <span><strong>MAI HOÀNG NHÂN</strong><small>REAL ESTATE ADVISOR</small></span>
        </a>
        <div className="desktop-header-links">
                  <a href="/#about">Về tôi</a>
                  <a href="/#projects">Dự án</a>
                  <a href="/#services">Dịch vụ</a>
                  <a href="/#contact">Liên hệ</a>
          <a href={`tel:${siteConfig.hotline.replace(/\s/g, '')}`}><Phone/> <span><small>HOTLINE</small>{siteConfig.hotline}</span></a>
        </div>
        <button className="menu" aria-label="Menu"><span></span></button>
      </header>

      <main>
        <section className="project-hero" data-aos="fade-up">
          <div className="project-hero-gallery">
            <button className="gallery-nav prev" onClick={prevImage} aria-label="Ảnh trước"><ChevronLeft/></button>
            <div className="gallery-main">
              <img src={project.gallery[currentImage]} alt={`${project.name} - Ảnh ${currentImage + 1}`} />
            </div>
            <button className="gallery-nav next" onClick={nextImage} aria-label="Ảnh sau"><ChevronRight/></button>
            <button className="gallery-expand" onClick={() => setShowGallery(true)} aria-label="Xem thư viện ảnh đầy đủ">
              <span>{currentImage + 1} / {project.gallery.length}</span>
            </button>
          </div>
          <div className="gallery-thumbs">
            {project.gallery.map((img, i) => (
              <button
                key={img}
                className={`thumb ${i === currentImage ? 'active' : ''}`}
                onClick={() => setCurrentImage(i)}
                aria-label={`Xem ảnh ${i + 1}`}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>

          <div className="project-hero-info" data-aos="fade-up" data-aos-delay="200">
            <span className="project-type">{project.type}</span>
            <h1>{project.name}</h1>
            <div className="project-location">
              <MapPin size={18} /> {project.place}
            </div>
            <div className="project-actions">
              <a href={`tel:${siteConfig.hotline.replace(/\s/g, '')}`} className="btn primary"><Phone size={18}/> Gọi tư vấn</a>
              <a href={siteConfig.messenger} target="_blank" rel="noreferrer" className="btn ghost"><MessageCircle size={18}/> Nhắn tin</a>
            </div>
          </div>
        </section>

        {showGallery && (
          <div className="gallery-modal" onClick={() => setShowGallery(false)} role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setShowGallery(false)} aria-label="Đóng"><X/></button>
            <button className="modal-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Ảnh trước"><ChevronLeft/></button>
            <img src={project.gallery[currentImage]} alt={`${project.name} - Ảnh ${currentImage + 1}`} />
            <button className="modal-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Ảnh sau"><ChevronRight/></button>
            <div className="modal-counter">{currentImage + 1} / {project.gallery.length}</div>
          </div>
        )}

        <section className="project-overview section" data-aos="fade-up">
          <div className="container">
            <div className="overview-grid">
              <div className="overview-content">
                <h2>Tổng quan dự án</h2>
                <p>{project.description}</p>
                <div className="project-highlights">
                  <h3>Điểm nổi bật</h3>
                  <ul>
                    {project.highlights.map((highlight, i) => (
                      <li key={i}><span className="bullet"/> {highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="overview-features">
                <h3>Thông số kỹ thuật</h3>
                <div className="features-grid">
                  {project.features.map((f, i) => (
                    <div key={i} className="feature-item">
                      <span className="feature-label">{f.label}</span>
                      <span className="feature-value">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="project-location section" style={{ background: 'var(--cream)' }} data-aos="fade-up">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="section-tag">VỊ TRÍ & TIỆN ÍCH</p>
                <h2>Kết nối mọi <em>không gian sống</em>.</h2>
              </div>
            </div>
            <div className="location-content">
              <div className="map-wrapper">
                <iframe
                  title={`Bản đồ vị trí ${project.name}`}
                  src={`https://maps.google.com/maps?q=${project.location.lat},${project.location.lng}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="location-info">
                <h3>Vị trí chiến lược</h3>
                <p>{project.name} tọa lạc tại {project.place} - vị trí vàng với kết nối giao thông thuận tiện, gần các trục đường chính và các tiện ích sinh hoạt thiết yếu.</p>
                <div className="nearby">
                  <h4>Tiện ích xung quanh</h4>
                  <ul>
                    <li>Trung tâm thương mại, siêu thị</li>
                    <li>Trường học, bệnh viện uy tín</li>
                    <li>Công viên, hồ bơi, trung tâm thể thao</li>
                    <li>Kết nối Metro, đường vành đai</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="project-cta section" data-aos="fade-up">
          <div className="container">
            <div className="cta-card">
              <div className="cta-content">
                <h2>Sẵn sàng tìm hiểu <em>chi tiết?</em></h2>
                <p>Để lại thông tin, anh Nhân sẽ liên hệ gửi bản đồ vị trí, bảng giá và brochure dự án mới nhất trong thời gian sớm nhất.</p>
              </div>
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn! Anh Nhân sẽ sớm liên hệ gửi tài liệu chi tiết.'); }}>
                <label>Họ và tên<input required placeholder="Nhập họ tên của bạn"/></label>
                <label>Số điện thoại<input required type="tel" placeholder="Nhập số điện thoại"/></label>
                <label>Dự án quan tâm<select defaultValue={project.id}><option value={project.id}>{project.name}</option>{projects.filter(p => p.id !== project.id).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
                <label>Lời nhắn<textarea rows="3" placeholder="Nhập yêu cầu cụ thể (ví dụ: gửi bảng giá, brochure, đặt lịch xem thực tế...)"/></label>
                <button className="btn primary" type="submit">Nhận tư vấn miễn phí <ArrowRight size={18}/></button>
              </form>
            </div>
          </div>
        </section>

        <section className="related-projects section" style={{ background: 'var(--cream)' }} data-aos="fade-up">
          <div className="container">
            <div className="section-head">
              <div><p className="section-tag">DỰ ÁN KHÁC</p><h2>Khám phá thêm <em>cơ hội đầu tư</em>.</h2></div>
            </div>
            <div className="project-grid">
              {projects.filter(p => p.id !== project.id).map((p, i) => (
                <Link to={`/projects/${p.id}`} className="project-card" key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
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

      <div className="sticky-contact" aria-label="Liên hệ nhanh">
        <div className="sticky-options">
          <a className="sticky-item messenger" href={siteConfig.messenger} target="_blank" rel="noreferrer" aria-label="Nhắn Messenger"><MessageCircle/><span>Messenger</span></a>
          <a className="sticky-item zalo" href={siteConfig.zalo} target="_blank" rel="noreferrer" aria-label="Nhắn Zalo"><b>Zalo</b><span>Zalo</span></a>
          <a className="sticky-item hotline" href={`tel:${siteConfig.hotline.replace(/\s/g, '')}`} aria-label={`Gọi hotline ${siteConfig.hotline}`}><Phone/><span>{siteConfig.hotline}</span></a>
        </div>
        <button className="contact-toggle" aria-label="Mở liên hệ nhanh" aria-expanded="false"><MessageCircle/><span>Liên hệ tư vấn</span></button>
      </div>

      <style jsx>{`
        .not-found { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center; padding:2rem; }
        .not-found h1 { font-family:'Noto Serif',serif; font-size:clamp(32px,5vw,56px); margin:1rem 0; }
        .not-found p { color:var(--muted); max-width:400px; }
        .back-btn { position:absolute; top:2rem; left:2rem; z-index:10; }
        .project-hero { position:relative; min-height:70vh; display:flex; flex-direction:column; }
        .project-hero-gallery { position:relative; flex:1; min-height:500px; }
        .gallery-main { width:100%; height:100%; position:relative; }
        .gallery-main img { width:100%; height:100%; object-fit:cover; }
        .gallery-nav { position:absolute; top:50%; transform:translateY(-50%); width:56px; height:56px; border-radius:50%; border:1px solid rgba(255,255,255,.3); background:rgba(7,23,35,.6); color:#fff; display:grid; place-items:center; cursor:pointer; transition:.2s; z-index:2; }
        .gallery-nav:hover { background:var(--gold); border-color:var(--gold); color:var(--deep); }
        .gallery-nav.prev { left:2rem; } .gallery-nav.next { right:2rem; }
        .gallery-expand { position:absolute; bottom:1.5rem; right:2rem; z-index:2; padding:8px 14px; background:rgba(7,23,35,.8); border:1px solid rgba(198,155,88,.5); color:var(--gold); font-size:11px; font-weight:600; letter-spacing:.5px; border-radius:4px; cursor:pointer; }
        .gallery-thumbs { display:flex; gap:10px; padding:1.5rem 2rem; overflow-x:auto; background:#06141e; border-top:1px solid rgba(255,255,255,.05); }
        .thumb { flex-shrink:0; width:80px; height:60px; border-radius:6px; overflow:hidden; border:2px solid transparent; cursor:pointer; transition:.2s; background:none; padding:0; }
        .thumb:hover, .thumb.active { border-color:var(--gold); transform:scale(1.05); }
        .thumb img { width:100%; height:100%; object-fit:cover; }
        .project-hero-info { position:absolute; bottom:0; left:0; right:0; padding:3rem 2rem 2rem; background:linear-gradient(0deg,rgba(5,19,29,.95),transparent); color:#fff; }
        .project-type { color:var(--gold); font-size:10px; font-weight:600; letter-spacing:2px; text-transform:uppercase; }
        .project-hero-info h1 { font-family:'Noto Serif',serif; font-size:clamp(36px,5vw,64px); margin:1rem 0; }
        .project-location { display:flex; align-items:center; gap:8px; color:#c7d0d5; font-size:13px; margin-bottom:1.5rem; }
        .project-actions { display:flex; gap:12px; flex-wrap:wrap; }
        .gallery-modal { position:fixed; inset:0; z-index:100; background:rgba(2,12,19,.98); display:flex; align-items:center; justify-content:center; flex-direction:column; }
        .modal-close { position:absolute; top:2rem; right:2rem; width:48px; height:48px; border-radius:50%; border:1px solid rgba(255,255,255,.2); background:transparent; color:#fff; display:grid; place-items:center; cursor:pointer; z-index:10; }
        .modal-nav { position:absolute; top:50%; transform:translateY(-50%); width:64px; height:64px; border-radius:50%; border:1px solid rgba(255,255,255,.3); background:rgba(7,23,35,.6); color:#fff; display:grid; place-items:center; cursor:pointer; }
        .modal-nav.prev { left:2rem; } .modal-nav.next { right:2rem; }
        .modal-nav:hover { background:var(--gold); border-color:var(--gold); color:var(--deep); }
        .modal-counter { position:absolute; bottom:2rem; color:#fff; font-size:14px; font-weight:500; }
        .project-overview .container, .project-location .container, .project-cta .container, .related-projects .container { max-width:1280px; margin:0 auto; padding:0 2rem; }
        .overview-grid { display:grid; grid-template-columns:1.5fr 1fr; gap:4rem; }
        .overview-content h2 { font-family:'Noto Serif',serif; font-size:clamp(28px,3.5vw,42px); margin-bottom:1.5rem; }
        .overview-content > p { color:var(--muted); line-height:1.9; font-size:15px; margin-bottom:2rem; max-width:700px; }
        .project-highlights h3 { font-family:'Noto Serif',serif; font-size:22px; margin-bottom:1rem; }
        .project-highlights ul { list-style:none; padding:0; margin:0; display:grid; gap:12px; }
        .project-highlights li { display:flex; align-items:flex-start; gap:12px; color:var(--ink); line-height:1.7; }
        .bullet { width:8px; height:8px; border-radius:50%; background:var(--gold); flex-shrink:0; margin-top:6px; }
        .overview-features h3 { font-family:'Noto Serif',serif; font-size:22px; margin-bottom:1rem; }
        .features-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .feature-item { padding:16px; background:#fff; border:1px solid #e6e1d8; border-radius:8px; }
        .feature-label { display:block; font-size:10px; color:var(--gold); font-weight:600; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px; }
        .feature-value { font-size:14px; color:var(--ink); font-weight:500; }
        .location-content { display:grid; grid-template-columns:1.2fr 1fr; gap:3rem; margin-top:3rem; }
        .map-wrapper { border-radius:12px; overflow:hidden; height:450px; box-shadow:0 20px 50px rgba(2,13,21,.15); }
        .map-wrapper iframe { width:100%; height:100%; border:0; }
        .location-info h3 { font-family:'Noto Serif',serif; font-size:28px; margin-bottom:1rem; }
        .location-info > p { color:var(--muted); line-height:1.9; margin-bottom:2rem; }
        .nearby h4 { font-size:14px; font-weight:600; margin-bottom:1rem; color:var(--ink); }
        .nearby ul { list-style:none; padding:0; margin:0; display:grid; gap:10px; }
        .nearby li { display:flex; align-items:center; gap:10px; color:var(--muted); font-size:13px; }
        .nearby li::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--gold); }
        .cta-card { display:grid; grid-template-columns:1fr 1fr; gap:3rem; background:var(--deep); color:#fff; padding:4rem; border-radius:16px; border:1px solid rgba(198,155,88,.3); }
        .cta-content h2 { font-family:'Noto Serif',serif; font-size:clamp(28px,3.5vw,42px); line-height:1.2; margin-bottom:1rem; }
        .cta-content p { color:#b4bec5; line-height:1.8; }
        @media (max-width: 900px) {
          .overview-grid, .location-content, .cta-card { grid-template-columns:1fr; gap:2rem; }
          .features-grid { grid-template-columns:1fr; }
          .map-wrapper { height:350px; }
          .cta-card { padding:2.5rem; }
          .gallery-nav { width:44px; height:44px; }
          .gallery-nav.prev { left:1rem; } .gallery-nav.next { right:1rem; }
          .gallery-expand { bottom:1rem; right:1rem; font-size:10px; padding:6px 10px; }
          .project-hero-info { padding:2rem 1.5rem 1.5rem; }
        }
        @media (max-width: 560px) {
          .gallery-thumbs { padding:1rem; }
          .thumb { width:70px; height:50px; }
          .cta-card .contact-form { grid-template-columns:1fr; }
        }
      `}</style>
    </>
  );
}

export default ProjectDetail;