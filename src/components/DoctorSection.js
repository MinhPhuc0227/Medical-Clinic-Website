import "../css/main.css";

import { fetchJson } from "../js/common";
import { createDoctorCard } from "../components/DoctorCard";

let doctors = [];

export async function initDoctorSection() {
  const doctors = await fetchJson("/Doctors.json");

  const track = document.getElementById("doctor-track");
  const dotsContainer = document.getElementById("doctor-dots");
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(doctors.length / cardsPerSlide);
  let currentSlide = 0;

  for (let i = 0; i < totalSlides; i++) {
    const slide = document.createElement("div");
    slide.classList.add("min-w-full", "flex", "justify-center", "gap-8");
    const start = i * cardsPerSlide;
    const end = start + cardsPerSlide;
    //muốn n card thì slice(start, end) => slice(i, i + 1)
    doctors.slice(start, end).forEach((doctor) => {
      slide.innerHTML += createDoctorCard(doctor);
    });
    track.appendChild(slide);
  }

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.classList.add("w-3", "h-3", "rounded-full");
    if (i === 0) {
      dot.classList.add("bg-primary");
    } else {
      dot.classList.add("bg-accent");
    }
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    const dots = dotsContainer.querySelectorAll("button");
    dots.forEach((dot, index) => {
      dot.classList.remove("bg-primary", "bg-accent");
      if (index === currentSlide) {
        dot.classList.add("bg-primary");
      } else {
        dot.classList.add("bg-accent");
      }
    });
  }

  const dots = dotsContainer.querySelectorAll("button");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentSlide = Number(dot.dataset.index);
      updateSlider();
    });
  });

  setInterval(() => {
    currentSlide++;
    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }
    updateSlider();
  }, 4000); // thời gian chuyển slide tự động (4 giây)

  updateSlider();
}
