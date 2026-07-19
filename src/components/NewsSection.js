import "../css/main.css";
import { getNews } from "../js/common.js";
import { createSmallNews } from "../components/SmallNews.js";
let news = [];
export async function initNewsSection() {
  const news = await getNews();

  const track = document.getElementById("news-track");
  const dotsContainer = document.getElementById("news-dots");
  const cardsPerSlide = 4;
  const totalSlides = Math.ceil(news.length / cardsPerSlide);

  let currentSlide = 0;

  for (let i = 0; i < totalSlides; i++) {
    const slide = document.createElement("div");
    slide.className =
      "min-w-full grid grid-cols-2 gap-x-8 gap-y-6 place-items-center";
    const start = i * cardsPerSlide;
    const end = start + cardsPerSlide;
    news.slice(start, end).forEach((item) => {
      slide.innerHTML += createSmallNews(item);
    });
    track.appendChild(slide);
  }

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.className = "w-3 h-3 rounded-full bg-accent";
    if (i === 0) {
      dot.classList.replace("bg-accent", "bg-primary");
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
  }, 4000);

  updateSlider();
}
