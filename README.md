# NhanBDS

Website thương hiệu cá nhân cho **Mai Hoàng Nhân BĐS**, xây dựng bằng React và Vite.

## Chạy dự án

```bash
npm install
npm run dev
```

- Website: `http://localhost:5173/`
- Trang quản trị mẫu: `http://localhost:5173/admin` (chỉ có trong môi trường dev)

## Build

```bash
npm run build
npm test
npm run lint
```

Bản build ghi thư mục `dist/`, kèm `dist/admin/index.html` và `dist/404.html` (đều `noindex`).

> Lưu ý: trang quản trị chỉ được nạp trong bản dev. Khi mở `/admin` trên bản build
> production (Docker, GitHub Pages) sẽ hiển thị trang "Quản trị chưa được kích hoạt"
> — đây là thiết kế an toàn, admin mẫu chưa kết nối dữ liệu thật.

Đổi đường dẫn gốc khi build (tên repo khác, tên miền riêng, thư mục con khác):

```bash
BASE_PATH=/ten-repo/ npm run build
```

## Chạy bằng Docker

Build đa giai đoạn: `node:22-alpine` để build, `nginx:stable-alpine` để phục vụ `dist/`.
Không cần image nền cục bộ nào khác.

```bash
docker build -t nhanbds:latest .
docker run --rm --name nhanbds -p 8080:80 nhanbds:latest
```

Mở `http://localhost:8080/` để xem website (trang `/admin` trên bản production hiển thị
trang "chưa kích hoạt").

## Triển khai GitHub Pages

Workflow `.github/workflows/deploy.yml` tự build với base `/NhanBDS/` rồi publish `dist/`.

Lưu ý SEO: GitHub Pages project site không cho đặt `robots.txt` ở gốc tên miền
(`github.io/robots.txt` trả 404), nên `public/robots.txt` chỉ tham khảo. Các trang riêng
(admin, 404) được đánh `noindex` ngay trong HTML sinh ra lúc build.

## SEO và chia sẻ dự án

- Ba URL riêng: `du-an/the-opera-residence/`, `du-an/sun-thu-thiem/`, `du-an/gs-metrocity/`.
- Build tạo HTML cho từng URL với title, description, canonical, Open Graph,
  Twitter Card và WebPage JSON-LD riêng; ảnh chia sẻ dùng ảnh dự án hiện có.
- Nội dung chung nằm tại [src/projects.js](src/projects.js). Ảnh minh họa được ghi rõ.
- Sitemap được sinh từ danh sách dự án; không dùng ngày build làm ngày cập nhật nội dung.
- Admin/404 không có metadata chia sẻ của trang chủ và vẫn `noindex`.
- Đổi tên miền: `SITE_URL=https://example.com/ BASE_PATH=/ npm run build`.
  `SITE_URL` là URL public đầy đủ, gồm thư mục con nếu có; `BASE_PATH` phải khớp.
- Kiểm tra preview chia sẻ trên HTML production, không dùng metadata của Vite dev server.
  Facebook/Zalo chỉ lấy được ảnh sau khi deploy public; có thể còn cache preview cũ.
- Thumbnail tự cập nhật mỗi lần build: trang chủ lấy `public/images/social-thumbnail.jpg`,
  trang dự án lấy `imagePath` trong [src/projects.js](src/projects.js).
  Build thêm tham số `?v=` theo SHA-256 của nội dung ảnh vào URL ảnh gốc (không tạo bản sao),
  rồi cập nhật URL ảnh trong Open Graph, Twitter Card và JSON-LD.
  Đổi ảnh sẽ đổi URL thumbnail; ảnh không đổi giữ nguyên URL. Không cần sửa meta thủ công.
  Cơ chế này không ép Facebook/Zalo tải lại metadata của link đã được chia sẻ trước đó.

## Công nghệ sử dụng

- React 19
- Vite
- Vitest + Testing Library
- ESLint
- Lucide React
- CSS responsive

## Tối ưu hiệu năng

- **Tách theo trang**: trang chủ và trang dự án tải module riêng; admin/404 không tải
  module giao diện trang chủ. React và form được dùng chung giữa các trang.
- **Không nhân đôi ảnh thumbnail**: URL phiên bản dùng ảnh gốc, giảm dung lượng bản build.
  Vite tự dọn output cũ khi build lại; không cần xóa ảnh nguồn hoặc font đang sử dụng.

- **Font tự host**: Be Vietnam Pro & Noto Serif (giấy phép OFL, xem `src/fonts/LICENSE-OFL.txt`)
  nằm trong bundle ở `src/fonts/`, subset `latin` + `vietnamese` — trang không request
  `fonts.googleapis.com` nữa và bỏ được ~300KB latin-ext không dùng.
- **Ảnh WebP**: `nhan-reel`, `post-value-guide`, `project-sun-thu-thiem`, `project-gs-metrocity`
  đã nén WebP (524KB → 302KB). `social-thumbnail.jpg` và `nhan-profile.jpg` giữ JPEG cho
  OG tag / JSON-LD.
- **LCP và CLS**: ảnh hero được ưu tiên tải bằng `fetchpriority="high"`; ảnh chân dung và
  nội dung dưới màn hình đầu dùng lazy loading, khai báo kích thước để hạn chế xê dịch bố cục.
- **Cache**: nginx phục vụ `/assets/` (đã hash) `immutable` 1 năm, `/images/` 7 ngày.
