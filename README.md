# 🎬 RGB → YUV

> Công cụ web minh họa quá trình chuyển đổi **không gian màu RGB sang YUV** cho học tập xử lý ảnh/video số.

## ✨ Điểm chính

- Nhập các thành phần màu RGB theo ma trận N × N.
- Tính toán Y, U, V bằng số thực với độ chính xác cao hơn.
- Chỉ làm tròn **kết quả cuối cùng đến 2 chữ số thập phân**; không làm tròn các giá trị trung gian.
- Quan sát kết quả ngay trên trình duyệt.
- Giao diện nhẹ, không cần backend.

## 🧮 Công thức RGB → YUV

Dự án sử dụng công thức trong tài liệu tham khảo:

```text
Y = 0.299R + 0.587G + 0.114B
U = (B - Y) / 2.03
V = (R - Y) / 1.14
```

Lưu ý: không thay `1/2.03` và `1/1.14` bằng các hệ số đã làm tròn như `0.492` và `0.877`, vì điều đó làm tăng sai số tính toán.

Ví dụ hiển thị:

```text
2.6578918 → 2.66
```

RGB đầu vào được kiểm tra là số nguyên trong khoảng `0–255`.

## 🧱 Cấu trúc

```text
rgb-to-yuv/
├── index.html      # Giao diện
├── script.js       # Chuyển đổi RGB → YUV và xử lý ma trận
├── style.css       # UI
└── README.md
```

## 🚀 Chạy

Mở `index.html` bằng trình duyệt hiện đại hoặc phục vụ thư mục bằng static web server.

## 🛠️ Công nghệ

`HTML5` · `CSS3` · `JavaScript`

## 🎓 Mục đích

Dùng để trực quan hóa mối quan hệ giữa RGB và YUV, hỗ trợ học các khái niệm nền tảng trong xử lý ảnh, video và truyền thông đa phương tiện.

## 📚 Tài liệu tham khảo

- Tài liệu bài giảng Audio–Video / truyền hình số được cung cấp cho dự án.
- Repository tham khảo: https://github.com/NguyenHung952/rgb-to-yuv-converter

## 📌 Trạng thái

**DSP / Multimedia Learning Tool** — tập trung vào tính toán RGB → YUV chính xác và hiển thị kết quả ở 2 chữ số thập phân.

---

**Nguyễn Ngọc Hùng · IUH**
