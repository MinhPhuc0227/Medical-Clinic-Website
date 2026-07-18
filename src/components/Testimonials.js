import { fetchJson } from "../js/common.js";
let currentIndex = 0;
let slideInterval = null;
const INTERVAL_TIME = 5000; // 5 giây

export async function initTesti() {
  const testimonials = await fetchJson("/testi.json");
  // Sử dụng setInterval để kiểm tra liên tục xem HTML đã được load xong chưa
  const checkExist = setInterval(() => {
    const sectionEl = document.querySelector(".testimonial-section");
    const quoteEl = document.querySelector(
      ".testimonial-section blockquote.testi",
    );
    const authorEl = document.querySelector(".testimonial-section cite.testi");

    // Sử dụng bộ chọn cực kỳ đơn giản và an toàn
    const dots = document.querySelectorAll(".testimonial-section ul li");

    // Khi nào tìm thấy đầy đủ các phần tử thì mới bắt đầu chạy code
    if (sectionEl && quoteEl && authorEl && dots.length > 0) {
      clearInterval(checkExist); // Dừng việc kiểm tra lại

      // 1. Hàm cập nhật giao diện khi chuyển slide
      function updateSlide(index) {
        currentIndex = index;
        const currentData = testimonials[currentIndex];

        // Thay đổi nội dung chữ & tác giả
        quoteEl.textContent = currentData.quote;
        authorEl.textContent = currentData.author;

        // Thay đổi ảnh nền
        sectionEl.style.backgroundImage = `url('${currentData.bg}')`;

        // Cập nhật màu sắc của các chấm (dots)
        dots.forEach((dot, idx) => {
          if (idx === currentIndex) {
            dot.classList.remove("bg-white");
            dot.classList.add("bg-accent");
          } else {
            dot.classList.remove("bg-accent");
            dot.classList.add("bg-white");
          }
        });
      }

      // 2. Hàm tự động chuyển sang slide tiếp theo
      function nextSlide() {
        let nextIndex = (currentIndex + 1) % testimonials.length;
        updateSlide(nextIndex);
      }

      // 3. Quản lý bộ đếm tự động
      function startAutoSlide() {
        stopAutoSlide();
        slideInterval = setInterval(nextSlide, INTERVAL_TIME);
      }

      function stopAutoSlide() {
        if (slideInterval) {
          clearInterval(slideInterval);
        }
      }

      // 4. Lắng nghe sự kiện click thủ công vào các dấu chấm
      dots.forEach((dot, index) => {
        dot.classList.add("cursor-pointer", "transition-all", "duration-300");

        dot.addEventListener("click", () => {
          updateSlide(index);
          startAutoSlide(); // Reset lại bộ đếm khi bấm thủ công
        });
      });

      // Khởi động chạy lần đầu
      updateSlide(0);
      startAutoSlide();
    }
  }, 100); // Cứ mỗi 100ms sẽ kiểm tra 1 lần cho đến khi tìm thấy HTML
}
