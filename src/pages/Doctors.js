import "../css/main.css";
import { loadComponent, setActiveNav, fetchJson } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initTesti } from "../components/Testimonials";
import { initNewsSection } from "../components/NewsSection";
import { initNewsletter } from "../components/NewsLetter.js";
import { createDoctorCard } from "../components/DoctorCard.js";
import { initHeader } from "../components/header.js";

await loadComponent("header", "/components/header.html");
setActiveNav();
initNewsletter();
initHeader();
await loadComponent("footer", "/components/footer.html");
await loadSubHeader("doctors");
await loadComponent("newsSection", "/components/NewsSection.html");
await loadComponent("testi", "/components/Testimonials.html");
await loadComponent("contactSection", "/components/ContactsSection.html");

export async function initDoctorPage() {
  const loading = document.getElementById("loading");
  loading.classList.remove("hidden");
  const doctors = await fetchJson("/Doctors.json");
  loading.classList.add("hidden");
  
  const select = document.getElementById("specialty-filter");
  const searchInput = document.getElementById("doctor-search");
  // lấy danh sách specialty không trùng
  const specialties = [...new Set(doctors.map((d) => d.specialty))];

  specialties.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
  // nút search
  let filteredDoctors = [...doctors];
  let searchKeyword = "";

  select.addEventListener("change", () => {
    filterDoctors(select.value);
  });

  searchInput.addEventListener("input", () => {
    searchKeyword = searchInput.value.trim().toLowerCase();

    filterDoctors(select.value);
  });
  const track = document.getElementById("doctor-track");
  const dotsContainer = document.getElementById("doctor-dots");
  const prevBtn = document.getElementById("doctor-prev");
  const nextBtn = document.getElementById("doctor-next");

  function getCardsPerSlide() {
    if (window.innerWidth < 640) {
      // Mobile
      return 2;
    } else if (window.innerWidth < 1024) {
      // Tablet (sm -> trước lg)
      return 4;
    } else {
      // Laptop/Desktop
      return 6;
    }
  }

  window.addEventListener("resize", () => {
    const newCardsPerSlide = getCardsPerSlide();

    if (newCardsPerSlide !== cardsPerSlide) {
      cardsPerSlide = newCardsPerSlide;
      totalSlides = Math.ceil(filteredDoctors.length / cardsPerSlide);
      currentSlide = 0;
      renderSlide(0);
    }
  });

  let cardsPerSlide = getCardsPerSlide();
  let totalSlides = Math.ceil(filteredDoctors.length / cardsPerSlide);
  let currentSlide = 0;

  function renderSlide(index) {
    currentSlide = index;

    const start = index * cardsPerSlide;
    const end = start + cardsPerSlide;

    const currentDoctors = filteredDoctors.slice(start, end);

    track.innerHTML = currentDoctors
      .map((doctor) => createDoctorCard(doctor, index))
      .join("");

    updateDots();
    updateButtons();
  }
  function filterDoctors(specialty) {
    filteredDoctors = doctors.filter((doctor) => {
      // Lọc chuyên khoa
      const matchSpecialty =
        specialty === "all" || doctor.specialty === specialty;

      // Tìm kiếm tên
      const matchName = doctor.name.toLowerCase().includes(searchKeyword);

      return matchSpecialty && matchName;
    });

    cardsPerSlide = getCardsPerSlide();
    totalSlides = Math.ceil(filteredDoctors.length / cardsPerSlide);
    currentSlide = 0;

    renderSlide(0);
  }

  function updateDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");

      dot.className = "w-11 h-11 flex items-center justify-center";

      dot.setAttribute("aria-label", `Go to doctors page ${i + 1}`);

      dot.innerHTML = `
      <span class="
        w-3 h-3 md:w-5 md:h-h rounded-full
        ${i === currentSlide ? "bg-primary" : "bg-accent"}
      "></span>
    `;

      dot.addEventListener("click", () => renderSlide(i));

      dotsContainer.appendChild(dot);
    }
  }

  function updateButtons() {
    if (currentSlide === 0) {
      prevBtn.classList.add("opacity-50", "cursor-not-allowed");
    } else {
      prevBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }

    if (currentSlide === totalSlides - 1) {
      nextBtn.classList.add("opacity-50", "cursor-not-allowed");
    } else {
      nextBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }
  }

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      renderSlide(currentSlide - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentSlide < totalSlides - 1) {
      renderSlide(currentSlide + 1);
    }
  });

  renderSlide(0);
}

initDoctorPage();
await initTesti();
await initNewsSection();
// kéo lên đầu trang khi chuyển bài
window.scrollTo({
  top: 0,
  behavior: "smooth",
});
