# 💗 Web Tặng Người Yêu

Trang web nhỏ dễ thương để tặng người yêu — phong cách hồng pastel, glassmorphism, tim rơi, nhạc nền và thư tay gõ chữ từng ký tự (giống video TikTok mẫu).

## ✅ Tính năng đã hoàn thành

| Màn hình | Mô tả |
|---|---|
| 🔒 **Màn hình khoá** | Bàn phím số 3x4, 4 chấm biến thành tim khi nhập, gợi ý mật khẩu, rung + báo lỗi khi sai. Hỗ trợ gõ bàn phím trên máy tính. **Mật khẩu: `1234`** |
| 💖 **Intro** | Sau khi mở khoá: tim to đập kèm ảnh người yêu, bung 40 tim/hoa rơi, tự chuyển sang menu sau ~3s. Nhạc nền tự bật. |
| 🏠 **Menu** | 4 nút: Music / Letter / Image / Gift + nút nhạc nhỏ góc phải dưới để bật/tắt nhạc. |
| 🎵 **Music** | Đĩa vinyl xoay khi phát, tên bài **10A3**, thanh tiến trình bấm được, nút play/pause, lùi/tiến 10s, playlist. |
| 📷 **Image** | Lưới 4 ảnh, bấm mở lightbox phóng to có nút trái/phải, đóng, vuốt trên điện thoại, hoa & tim rơi trong lightbox, caption từng ảnh. |
| 💌 **Letter** | Phong bì bay nhẹ, chạm để mở nắp → thư trượt lên với hiệu ứng **typewriter** chữ viết tay. |
| 🎁 **Gift** | Carousel 3D ảnh xoay tròn + các trái tim chứa ảnh bay lên. Chạm vào tim → hiện lời yêu thương ngẫu nhiên + bung tim. Chữ "I love you", "Thinking of you"… bay theo. |

## 🌐 Đường dẫn

- `index.html` — trang duy nhất, tất cả màn hình chuyển bằng JavaScript (không tham số URL).

## 📁 Cấu trúc

```
index.html
css/style.css        # giao diện hồng pastel, animation
js/main.js           # logic mật khẩu, nhạc, gallery, typewriter, gift
images/1.jpg … 4.jpg # ảnh người yêu
audio/10a3.mp3       # nhạc nền
```

## ✏️ Tự chỉnh sửa (trong `js/main.js`)

- `PASSWORD` — đổi mật khẩu.
- `PHOTOS` — thêm/đổi ảnh & caption.
- `LETTER_TEXT` — nội dung thư.
- `FLOAT_TEXTS`, `LOVE_MESSAGES` — chữ bay và lời nhắn khi chạm tim.
- Gợi ý mật khẩu hiển thị: sửa `.lock-hint-value` trong `index.html`.

> ⚠️ Mật khẩu chỉ kiểm tra phía client (ai xem mã nguồn cũng thấy) — đây là hiệu ứng vui, không phải bảo mật thật.

## 🚧 Chưa làm / Gợi ý phát triển

- Thêm nhiều bài hát vào playlist (hiện chỉ có 10A3).
- Đếm ngược ngày kỷ niệm / đếm số ngày yêu nhau.
- Thêm ảnh vào `PHOTOS` và lưới gallery (hiện 4 ảnh).
- Hiệu ứng âm thanh mở phong bì riêng (hiện dùng tiếng "pop" tạo bằng Web Audio).

## 🚀 Xuất bản

Vào tab **Publish** để lấy link gửi cho người yêu 💌

## 💾 Dữ liệu

Không dùng database — toàn bộ nội dung là tĩnh (ảnh, nhạc, text trong JS).
