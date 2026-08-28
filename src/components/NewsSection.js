import "../css/main.css";
import { getNews } from "../js/common.js";
import { createSmallNews } from "../components/SmallNews.js";
let news = [];
export async function initNewsSection() {
  const news = await getNews();

  const track = document.getElementById("news-track");
  const dotsContainer = document.getElementById("news-dots");
  function getCardsPerSlide() {
    return window.innerWidth < 768 ? 2 : 4;
  }
  let currentSlide = 0;
  function renderSlider() {
    const cardsPerSlide = getCardsPerSlide();
    const totalSlides = Math.ceil(news.length / cardsPerSlide);

    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    // Render slides
    for (let i = 0; i < totalSlides; i++) {
      const slide = document.createElement("div");
      slide.className = "min-w-full flex justify-center";

      const grid = document.createElement("div");
      grid.className =
        "w-fit grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-5 md:gap-y-5";

      const start = i * cardsPerSlide;
      const end = start + cardsPerSlide;

      news.slice(start, end).forEach((item) => {
        grid.innerHTML += createSmallNews(item);
      });

      slide.appendChild(grid);
      track.appendChild(slide);
    }

    // Render dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = "w-[10px] h-[10px] sm:w-[18px] sm:h-[18px] rounded-full bg-accent";

      if (i === currentSlide) {
        dot.classList.replace("bg-accent", "bg-primary");
      }

      dot.dataset.index = i;

      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

      dot.addEventListener("click", () => {
        currentSlide = i;
        updateSlider();
      });

      dotsContainer.appendChild(dot);
    }

    if (currentSlide >= totalSlides) {
      currentSlide = totalSlides - 1;
    }

    updateSlider();
  }

  function updateSlider() {
    const totalSlides = Math.ceil(news.length / getCardsPerSlide());

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    const dots = dotsContainer.querySelectorAll("button");

    dots.forEach((dot, index) => {
      dot.classList.remove("bg-primary", "bg-accent");
      dot.classList.add(index === currentSlide ? "bg-primary" : "bg-accent");
    });
  }

  window.addEventListener("resize", () => {
    renderSlider();
  });

  setInterval(() => {
    const totalSlides = Math.ceil(news.length / getCardsPerSlide());

    currentSlide++;

    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }

    updateSlider();
  }, 4000);
  renderSlider();
}
