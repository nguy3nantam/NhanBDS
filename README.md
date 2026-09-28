# NhanBDS

Website thương hiệu cá nhân cho **Mai Hoàng Nhân BĐS**, xây dựng bằng React và Vite.

## Chạy dự án

```bash
npm install
npm run dev
```

- Website: `http://localhost:5173/`
- Trang quản trị mẫu: `http://localhost:5173/admin`

## Build

```bash
npm run build
```

## Chạy bằng Docker

Docker image này dùng image nền cục bộ `kimsonauto:local`.

```bash
docker build -t nhanbds:latest .
docker run --rm --name nhanbds -p 8080:80 nhanbds:latest
```

Mở `http://localhost:8080/` để xem website và `http://localhost:8080/admin` để xem trang quản trị mẫu.

## Công nghệ

- React
- Vite
- Lucide React
- CSS responsive
