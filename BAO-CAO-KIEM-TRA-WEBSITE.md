# Báo cáo kiểm tra website NhanBDS

> **Lưu ý:** Đây là báo cáo lịch sử ngày 07/10/2026. Nhiều phát hiện bên dưới đã
> được xử lý; hãy chạy lại `npm test`, `npm run lint`, `npm run build` và
> `npm audit` để đánh giá mã nguồn hiện tại.

Ngày kiểm tra: 07/10/2026 (Việt Nam).

## Kết luận

Website hiện là landing page React/Vite với trang quản trị mẫu. Build chạy được, nhưng chưa sẵn sàng nhận và quản lý khách hàng thực tế: form không gửi/lưu dữ liệu, các thao tác quản trị chưa được triển khai và chưa có xác thực.

Không thay đổi mã nguồn ứng dụng hoặc dependency trong lần kiểm tra này.

## Phạm vi và bằng chứng

- Đọc toàn bộ mã nguồn React, CSS, metadata, sitemap, robots, manifest, Dockerfile và workflow triển khai.
- `npm run build`: thành công; JS 260,23 kB (gzip 79,62 kB), CSS 32,72 kB (gzip 7,51 kB).
- Build với `GITHUB_ACTIONS=true`: thành công. Vite chuyển đúng favicon, manifest và ảnh nền CSS sang prefix `/NhanBDS/`; không ghi nhận lỗi đường dẫn asset này.
- `npm audit --json`: 1 lỗ hổng high, 0 critical. `npm ls source-map-js`: vite → postcss → source-map-js@1.2.1.
- Trình duyệt Edge: xem trang chủ, thử nút dự án, biểu mẫu, truy cập admin, sửa/lưu hotline rồi reload, kiểm tra `/admin/`, menu và kích thước màn hình.
- Trang chủ: không tràn ngang tại viewport 390, 768 và 1024 px; tại 320 px, chiều rộng nội dung là 311 px so với clientWidth 305 px. Admin tổng quan không tràn tại 320 px.
- Log trình duyệt được thu trong phiên kiểm tra không có warning/error; đây không phải bảo đảm cho tất cả điều kiện chạy.
- HTTP HEAD bản công khai: trang chủ `https://nguy3nantam.github.io/NhanBDS/` trả 200; `/NhanBDS/admin` trả 404; `/robots.txt` ở gốc tên miền trả 404.
- Không thực hiện giao dịch/liên hệ thật qua điện thoại, Facebook, Messenger hoặc Zalo. Nội dung kinh doanh, quyền sử dụng ảnh và các số liệu quảng bá chưa được xác minh độc lập.
- Chưa chạy Lighthouse/Core Web Vitals, kiểm thử thiết bị thật, audit WCAG đầy đủ hoặc build Docker. Không suy ra điểm hiệu năng hay khả năng an toàn toàn hệ thống từ kết quả build.

## Phát hiện theo ưu tiên

### 1. Cao — Form báo thành công nhưng không nhận yêu cầu tư vấn

Vị trí: `src/main.jsx:192`.

`onSubmit` chỉ gọi `preventDefault()` và `alert()`. Không đọc dữ liệu, không API, không lưu trữ và không chuyển thông tin tới người tư vấn. Khách có thể tưởng đã đăng ký thành công trong khi chủ website không nhận được yêu cầu.

Xử lý: kết nối dịch vụ tiếp nhận/API và cơ sở dữ liệu; chỉ báo thành công sau khi phía nhận xác nhận; bổ sung trạng thái đang gửi, lỗi và chống gửi trùng.

### 2. Cao — Trang quản trị chưa có chức năng lưu/quản lý dữ liệu

Vị trí: `src/Admin.jsx:29`, `:87`, `:91`, `:137`, `:160`.

Các nút lưu liên hệ/SEO/cài đặt, thêm slide/bài viết/ảnh/dự án, xuất lead, tìm kiếm và lọc biểu đồ chưa có logic xử lý. `SectionHeader` tạo nút không có `onClick`. Các ô nhập dùng `defaultValue`. Kiểm tra thực tế: đổi hotline, bấm Lưu thay đổi, tải lại và mở Liên hệ thì hotline trở về `0909 467 505`.

Xử lý: triển khai CRUD và lưu trữ dùng chung cho website/admin; hiển thị rõ trạng thái demo khi chức năng chưa hoàn thiện. README đã gọi đây là trang quản trị mẫu, nhưng giao diện chưa giải thích điều đó.

### 3. Cao trước khi dùng dữ liệu thật — Admin không có đăng nhập hoặc phân quyền

Vị trí: `src/main.jsx:242`, `src/Admin.jsx:93`.

Truy cập trực tiếp `/admin` mở giao diện quản trị. Hiện chỉ có dữ liệu mẫu hard-code nên chưa có bằng chứng lộ cơ sở dữ liệu khách hàng thật. Cần xác thực và kiểm tra quyền tại backend trước khi kết nối dữ liệu thật; `noindex` không thay thế kiểm soát truy cập.

### 4. Trung bình — Các nút dự án và nội dung chưa dẫn tới chi tiết

Vị trí: `src/main.jsx:138`, phần Góc chia sẻ và các liên kết TikTok/YouTube.

Ba nút Xem dự án không có handler/link; đã thử nút The Opera Residence mà không mở chi tiết. Bài phân tích chỉ là thẻ nội dung, chưa có bài đầy đủ. Nút play dẫn tới trang Facebook chung. TikTok và YouTube trỏ `#` và bị `preventDefault()`.

Xử lý: tạo trang chi tiết hoặc liên kết đúng nội dung; chỉ hiển thị kênh đã có địa chỉ thực.

### 5. Trung bình — Định tuyến admin không nhất quán

Vị trí: `src/main.jsx:243`, `.github/workflows/deploy.yml` bước Add SPA fallback.

Điều kiện `pathname.endsWith('/admin')` không nhận `/admin/`: thử thực tế thấy trang chủ. Các đường dẫn lạ cũng hiển thị trang chủ thay vì trang không tìm thấy. Bản GitHub Pages trả HTTP 404 cho `/NhanBDS/admin`; workflow dùng bản sao `404.html` nên có thể vẫn render ứng dụng, nhưng không biến HTTP status thành 200.

Xử lý: chuẩn hóa đường dẫn hoặc dùng router với trang 404; cấu hình static entry/rewrite phù hợp hosting.

### 6. Trung bình — Lớp phủ menu không che toàn màn hình

Vị trí: `src/styles.css:10`, `:45`.

Tại viewport cao 844 px, đo `.nav-backdrop` chỉ cao khoảng 71,2 px. Header có `backdrop-filter`, trong khi backdrop fixed được đặt bên trong header. Vùng bên ngoài menu phía dưới header không được phủ theo thiết kế dự kiến.

Xử lý: đưa drawer/backdrop ra ngoài header (hoặc portal) và kiểm tra lại toàn bộ vùng bấm đóng menu.

### 7. Trung bình — Form thiếu xác thực số điện thoại

Vị trí: `src/main.jsx`, ô Số điện thoại trong form liên hệ.

Chỉ có `required` và `type="tel"`, không có pattern/validator. Phiên thử điền `abc` vẫn mở alert khi gửi. Công cụ điều khiển bị timeout khi thao tác với alert, nên kết luận về việc không lưu dựa thêm trên handler nguồn đã kiểm tra rõ ràng.

Xử lý: kiểm tra tên sau khi trim, chuẩn hóa số điện thoại, báo lỗi tại ô nhập và xác thực lại tại backend.

### 8. Trung bình — Dependency có cảnh báo high

Vị trí: `package-lock.json:755`.

`source-map-js@1.2.1` bị ảnh hưởng bởi GHSA-68fv-2mgg-jv7q, liên quan đến chặn event loop khi xử lý source map có section offset bất thường. Bản vá được công bố là 1.2.2. Đây là dependency qua Vite/PostCSS; chưa chứng minh có đường khai thác trực tiếp từ website tĩnh công khai.

Xử lý: cập nhật dependency/lockfile có kiểm soát, chạy lại audit và build. Không chạy tự động `audit fix --force` trong lần kiểm tra.

Nguồn: https://github.com/advisories/GHSA-68fv-2mgg-jv7q

### 9. Trung bình — Thống kê và trạng thái nội dung không phản ánh dữ liệu thật

Vị trí: `src/Admin.jsx:11`, `:23`, `:140`, `:153`; `src/main.jsx:12`.

Lượt xem, yêu cầu tư vấn, số bài, biểu đồ và lead đều được khai báo cứng. GS Metrocity mang nhãn Bản nháp trong admin nhưng vẫn xuất hiện trên trang chủ. Hai nơi dùng hai bộ dữ liệu riêng nên thay đổi admin không thể điều khiển trạng thái xuất bản.

Xử lý: thống nhất nguồn dữ liệu, trạng thái xuất bản và thống kê thật; gắn nhãn dữ liệu minh họa cho demo.

### 10. Trung bình — Cấu hình robots chưa phù hợp GitHub Pages project site

Vị trí: `public/robots.txt`, `src/Admin.jsx:97`, `index.html:9`.

File nằm ở `/NhanBDS/robots.txt`, trong khi file robots tại gốc tên miền trả 404. Quy tắc `Disallow: /admin` cũng không khớp đường dẫn `/NhanBDS/admin`. HTML ban đầu có `index, follow`; admin chỉ thay thành `noindex, nofollow` sau khi React chạy.

Xử lý: đặt robots đúng gốc origin khi kiểm soát hosting và trả noindex phù hợp cho admin ngay từ response/HTML. Giữ xác thực độc lập với cấu hình crawler.

### 11. Trung bình — Docker dùng preview server và image nền riêng

Vị trí: `Dockerfile:1`, `:14`.

Image nền `kimsonauto:local` không được định nghĩa trong repository; máy khác cần có image này trước. Container chạy `vite preview`, vốn được Vite hướng dẫn là công cụ xem thử bản build, không phải production server.

Xử lý: build nhiều giai đoạn với image nền tái lập được; phục vụ `dist` bằng static server phù hợp và cấu hình route. Chưa xác minh image nền hiện có hay build Docker thực tế.

Nguồn: https://vite.dev/guide/static-deploy.html

### 12. Thấp — Tràn ngang trên màn hình 320 px

Vị trí: `src/styles.css:142`, `:144`, `:145`.

Footer bị vượt bề rộng nội dung khoảng 6 px trong phép đo. Cụm social dùng flex không wrap và mỗi liên kết có min-width. Cần cho phép xuống dòng, giảm khoảng cách hoặc điều chỉnh min-width tại breakpoint nhỏ. Không thấy tràn ngang toàn trang ở 390, 768, 1024 px.

### 13. Trung bình — Khả năng dùng bàn phím và trình đọc màn hình còn thiếu

Vị trí: `src/main.jsx` phần menu và nút video; `src/Admin.jsx:112`, `:126`, `:129`, `:177`; `src/styles.css:140`; `src/admin.css:50`.

- Menu không có xử lý Escape (đã thử và vẫn mở), không quản lý focus hoặc trạng thái `aria-expanded` ở nút mở menu.
- Nút video và nhiều nút chỉ có icon trong admin thiếu tên truy cập rõ ràng.
- Các ô nhập xóa outline mà chưa có trạng thái focus thay thế.
- Các mục admin được vẽ đè bằng `.section-overlay`; dashboard phía dưới vẫn hiện trong accessibility tree khi mở Liên hệ, tạo nội dung thừa cho trình đọc màn hình/bàn phím.
- Nhiều nhãn chỉ 7–9 px, cần xem lại khả năng đọc trên thiết bị thật.

Xử lý: bổ sung nhãn/focus, Escape và focus management; render riêng nội dung mục đang chọn thay vì chỉ phủ lên dashboard.

### 14. Thấp — Cần hoàn thiện hiệu năng, nội dung và quy trình kiểm tra

- Admin được import trực tiếp trong entry của trang chủ; mã/CSS quản trị nằm chung bundle. Có thể tách lazy route.
- Ảnh Unsplash và font Google là tài nguyên ngoài; cần đo tải trên mạng chậm và xác nhận ảnh nào là minh họa. Alt text hiện mô tả chúng như ảnh dự án/địa điểm cụ thể mà repository không có bằng chứng xác thực.
- Các số liệu 06+ năm, 870+ người theo dõi và thông điệp về dự án cần được chủ website xác nhận/cập nhật trước khi xuất bản chính thức.
- Metadata, Open Graph, Twitter card, JSON-LD, sitemap, manifest đã có. Canonical dùng GitHub Pages trong khi admin hiển thị tên miền `maihoangnhanbds.com`; cần thống nhất theo tên miền triển khai cuối cùng.
- Có lazy loading cho ảnh nội dung. Chưa có số đo LCP/CLS/INP để kết luận đạt hay không đạt Core Web Vitals.
- `package.json` dùng `latest` cho các dependency và chưa có script test/lint. Lockfile hiện có và CI dùng `npm ci`, giúp tái lập bản đang khóa; cần kiểm soát việc cập nhật và thêm kiểm thử các luồng nghiệp vụ sau khi triển khai.

## Thứ tự xử lý đề xuất

1. Làm luồng tiếp nhận lead thật, xác thực form và phản hồi đúng trạng thái.
2. Xây dựng xác thực admin, lưu trữ và các thao tác quản trị thật.
3. Hoàn thiện trang dự án/bài viết, thống nhất dữ liệu xuất bản và sửa routing.
4. Vá dependency, sửa menu/mobile/accessibility và cấu hình hosting/SEO.
5. Đo Lighthouse, kiểm thử thiết bị thật và kiểm tra hồi quy trước khi dùng website để nhận khách.
