import "../css/main.css";
import { loadComponent, setActiveNav, fetchJson } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initTesti } from "../components/Testimonials";
import { initNewsSection } from "../components/NewsSection";
import { initNewsletter } from "../components/NewsLetter.js";
import { createDoctorCard } from "../components/DoctorCard.js";

await loadComponent("header", "/src/components/header.html");
setActiveNav();
initNewsletter();
await loadComponent("footer", "/src/components/footer.html");
await loadSubHeader("doctors");
await loadComponent("newsSection", "/src/components/NewsSection.html");
await loadComponent("testi", "/src/components/Testimonials.html");
await loadComponent("contactSection", "/src/components/ContactsSection.html");

export async function initDoctorPage() {
  const doctors = await fetchJson("/Doctors.json");
  const select = document.getElementById("specialty-filter");

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

  select.addEventListener("click", () => {
    filterDoctors(select.value);
  });
  const track = document.getElementById("doctor-track");
  const dotsContainer = document.getElementById("doctor-dots");
  const prevBtn = document.getElementById("doctor-prev");
  const nextBtn = document.getElementById("doctor-next");

  const cardsPerSlide = 6;
  let totalSlides = Math.ceil(filteredDoctors.length / cardsPerSlide);

  let currentSlide = 0;

  function renderSlide(index) {
    currentSlide = index;

    const start = index * cardsPerSlide;
    const end = start + cardsPerSlide;

    const currentDoctors = filteredDoctors.slice(start, end);

    track.innerHTML = currentDoctors
      .map((doctor) => createDoctorCard(doctor))
      .join("");

    updateDots();
    updateButtons();
  }
  function filterDoctors(specialty) {
    if (specialty === "all") {
      filteredDoctors = [...doctors];
    } else {
      filteredDoctors = doctors.filter(
        (doctor) => doctor.specialty === specialty,
      );
    }

    currentSlide = 0;

    totalSlides = Math.ceil(filteredDoctors.length / cardsPerSlide);

    renderSlide(0);
  }

  // thêm search text thì xài
  /*select.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();

    filteredDoctors = doctors.filter(
      (doctor) =>
        doctor.specialty.toLowerCase().includes(keyword) ||
        doctor.name.toLowerCase().includes(keyword),
    );

    currentSlide = 0;
    totalSlides = Math.ceil(filteredDoctors.length / cardsPerSlide);

    renderSlide(0);
  });*/

  function updateDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");

      dot.className =
        i === currentSlide
          ? "w-3 h-3 rounded-full bg-primary"
          : "w-3 h-3 rounded-full bg-accent";

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
