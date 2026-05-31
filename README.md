# Vietcombank-Digital-Interface

Đây là một giao diện frontend tĩnh mô phỏng Vietcombank, tập trung vào các trang ngân hàng cơ bản như đăng nhập, đăng ký, nạp tiền, chuyển tiền, tra cứu thẻ và liên hệ.

## Danh sách trang và xử lý JS

| Trang               | Chức năng xử lý JS                                                                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`        | Kiểm tra người dùng đang đăng nhập qua `localStorage`, hiển thị/ẩn khu vực tài khoản và các nút đăng nhập/đăng xuất, cập nhật tên và số dư của khách hàng.           |
| `login.html`        | Kiểm tra form đăng nhập, validate số điện thoại và mật khẩu, đối chiếu dữ liệu trong `localStorage` (`userinfo`), sau đó lưu `currentUser` khi đăng nhập thành công. |
| `signup.html`       | Kiểm tra form đăng ký, validate các trường bắt buộc, kiểm tra trùng số điện thoại và số tài khoản, tạo người dùng mới và lưu vào `localStorage`.                     |
| `profile.html`      | Lấy thông tin người dùng hiện tại từ `localStorage`, hiển thị hồ sơ cá nhân, số dư, thời điểm tạo tài khoản và xử lý đăng xuất.                                      |
| `deposit.html`      | Kiểm tra số tiền nạp hợp lệ, cộng tiền vào số dư của người dùng hiện tại, cập nhật lại `userinfo` và `currentUser` trong `localStorage`.                             |
| `transfer.html`     | Kiểm tra số tài khoản người nhận, kiểm tra số tiền chuyển, đảm bảo đủ số dư, trừ/cộng tiền cho 2 tài khoản và cập nhật dữ liệu trong `localStorage`.                 |
| `cards.html`        | Lọc danh sách thẻ theo từ khóa tìm kiếm, đếm số thẻ đang hiển thị và xử lý nút xóa tìm kiếm.                                                                         |
| `card-request.html` | Xử lý form yêu cầu mở thẻ, kiểm tra dữ liệu đầu vào, gửi yêu cầu qua EmailJS nếu đã cấu hình; nếu chưa có cấu hình thì chuyển sang `mailto:` dự phòng.               |
| `contact.html`      | Xử lý form liên hệ, kiểm tra dữ liệu và gửi nội dung qua EmailJS.                                                                                                    |
| `news.html`         | Trang tin tức tĩnh, chỉ dùng Bootstrap, không có xử lý JS riêng.                                                                                                     |
| `404.html`          | Trang lỗi 404 tĩnh, không có xử lý JS.                                                                                                                               |

## File cấu hình dùng chung

- `config.js`: chứa cấu hình EmailJS dùng chung cho `contact.html` và `card-request.html`.

## Ghi chú

- Dữ liệu người dùng được lưu tạm trong `localStorage`.
- Dự án không có backend; toàn bộ logic đang chạy ở phía trình duyệt.
