# API Documentation

## Test Endpoints
Các endpoint này dùng để kiểm tra hoạt động của API và kết nối cơ sở dữ liệu.

| Endpoint       | Method | Description                |
|----------------|--------|----------------------------|
| `/api/test`    | GET    | Kiểm tra hoạt động của API |
| `/api/db`      | GET    | Kiểm tra kết nối cơ sở dữ liệu |

---

## Auth Endpoints
Các endpoint liên quan đến xác thực người dùng.

| Endpoint                   | Method | Description                           |
|----------------------------|--------|---------------------------------------|
| `/api/auth/sign-in`        | POST   | Đăng nhập người dùng                 |
| `/api/auth/sign-up`        | POST   | Đăng ký tài khoản mới                |
| `/api/auth/callback`       | GET    | Callback cho login bằng Google       |
| `/api/auth/forgotpassword` | POST   | Quên mật khẩu và yêu cầu đặt lại mật khẩu |


## Product Endpoints
Các endpoint liên quan đến sản phẩm và danh mục, cung cấp chức năng quản lý và truy xuất dữ liệu sản phẩm.

| Endpoint            | Method | Description                        |
|---------------------|--------|------------------------------------|
| `/api/products`     | GET    | Lấy danh sách tất cả sản phẩm      |
| `/api/product/{id}` | GET    | Lấy thông tin chi tiết của sản phẩm theo ID |
| `/api/categories`   | GET    | Lấy danh sách tất cả danh mục      |


---

## Notes
- **Base URL**: Tất cả các endpoint đều được gọi từ đường dẫn cơ sở (ví dụ: `https://apt3233.id.vn`).
- **Response Format**: API trả về dữ liệu dạng JSON với mã trạng thái HTTP phù hợp (200 OK, 500 Internal Server Error, v.v.).
- **Authentication**: Hiện tại chưa yêu cầu xác thực (nếu có, sẽ được cập nhật sau).