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

## Công nghệ

- React 19
- Vite
- Vitest + Testing Library
- ESLint
- Lucide React
- CSS responsive
