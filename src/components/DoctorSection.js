import "../css/main.css";
import { fetchJson } from "../js/common";
import { createDoctorCard } from "../components/DoctorCard";

export async function initDoctorSection() {
  const doctors = await fetchJson("/Doctors.json");

  const track = document.getElementById("doctor-track");
  const dotsContainer = document.getElementById("doctor-dots");

  if (!track || !dotsContainer || !doctors || doctors.length === 0) return;

  let currentSlide = 0;
  let autoPlayTimer = null;

  // 1. Xác định số card/slide theo thiết bị (ĐÃ ĐỔI MỐC 1024px)
  function getCardsPerSlide() {
    const width = window.innerWidth;
    if (width < 768) return 1;    // Mobile: 1 card
    if (width < 1024) return 2;   // Tablet (768px - 1023px): 2 cards
    return 3;                     // Laptop (>= 1024px): 3 cards
  }

  // 2. Render Slide & Card
  function renderSlider() {
    track.innerHTML = "";
    dotsContainer.innerHTML = "";
    const cardsPerSlide = getCardsPerSlide();

    if (cardsPerSlide === 1) {
      // --- LOGIC MOBILE ---
      doctors.forEach((doctor) => {
        const wrapper = document.createElement("div");
        wrapper.className = "shrink-0 w-[270px] transition-all duration-300 ease-in-out";
        wrapper.innerHTML = createDoctorCard(doctor);
        track.appendChild(wrapper);
      });

      for (let i = 0; i < doctors.length; i++) {
        createDot(i);
      }
    } else {
      // --- LOGIC TABLET & LAPTOP (SỬA ĐOẠN NÀY ĐỂ CARD KHÔNG BỊ TRÀN) ---
      const totalSlides = Math.ceil(doctors.length / cardsPerSlide);

      for (let i = 0; i < totalSlides; i++) {
        const slide = document.createElement("div");
        slide.classList.add(
  "min-w-full",
  "flex",
  "justify-center",
  "gap-6"
);
        
        const start = i * cardsPerSlide;
        const end = start + cardsPerSlide;
        
        doctors.slice(start, end).forEach((doctor) => {
  const wrapper = document.createElement("div");
  wrapper.className = "shrink-0 w-[317px]";

  wrapper.innerHTML = createDoctorCard(doctor);

  slide.appendChild(wrapper);
});
        
        track.appendChild(slide);
      }

      for (let i = 0; i < totalSlides; i++) {
        createDot(i);
      }
    }

    bindDotEvents();
  }

  // Tạo thẻ Dot
  function createDot(index) {
    const dot = document.createElement("button");
    dot.classList.add("w-3", "h-3", "rounded-full", "transition-colors", "duration-300");
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  }

  // Sự kiện Click Dot
  function bindDotEvents() {
    const dots = dotsContainer.querySelectorAll("button");
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        currentSlide = Number(dot.dataset.index);
        updateSlider();
        resetAutoplay();
      });
    });
  }

  // 3. Hàm Update Slider
  function updateSlider() {
    const cardsPerSlide = getCardsPerSlide();
    const dots = dotsContainer.querySelectorAll("button");

    if (cardsPerSlide === 1) {
      const cards = Array.from(track.children);
      if (!cards.length) return;

      const targetCard = cards[currentSlide];
const containerWidth = track.parentElement.offsetWidth;
const cardWidth = targetCard.offsetWidth;

const centerOffset = (containerWidth - cardWidth) / 2;
const translateX = centerOffset - targetCard.offsetLeft;

track.style.transform = `translateX(${translateX}px)`;

      cards.forEach((card, idx) => {
        if (idx === currentSlide) {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        } else {
          card.style.opacity = "0.5";
          card.style.transform = "scale(0.95)";
        }
      });
    } else {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach((dot, index) => {
      dot.classList.remove("bg-primary", "bg-accent");
      if (index === currentSlide) {
        dot.classList.add("bg-primary");
      } else {
        dot.classList.add("bg-accent");
      }
    });
  }

  // Autoplay
  function startAutoplay() {
    autoPlayTimer = setInterval(() => {
      const cardsPerSlide = getCardsPerSlide();
      const totalSlides = cardsPerSlide === 1 
        ? doctors.length 
        : Math.ceil(doctors.length / cardsPerSlide);

      currentSlide++;
      if (currentSlide >= totalSlides) {
        currentSlide = 0;
      }
      updateSlider();
    }, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoPlayTimer);
    startAutoplay();
  }

  // Resize Listener
  window.addEventListener("resize", () => {
  clearInterval(autoPlayTimer);
  currentSlide = 0;
  renderSlider();
  updateSlider();
  startAutoplay();
});

  // Khởi tạo
  renderSlider();
  updateSlider();
  startAutoplay();
}