import "../css/main.css";
import { createMiniNews } from "./MiniNews.js";

export async function initSideBar(newsList) {
  const container = document.querySelector(".mini-news-list");
  container.innerHTML = "";

  const latestNews = newsList.slice(-6).reverse();

  latestNews.forEach((news) => {
    container.innerHTML += createMiniNews(news);
  }); //lấy 6 bài mới nhất
  const categoryCount = {
    Surgery: 0,
    "Health Care": 0,
    Medical: 0,
    Professional: 0,
  };

  newsList.forEach((item) => {
    if (!item.category) return;
    categoryCount[item.category]++;
  });
  const categories = document.querySelector(".category-list");

  categories.innerHTML = "";

  for (const name in categoryCount) {
    categories.innerHTML += `
    <div class="flex justify-between items-center lg:w-[274px] lg:h-[50px] px-[20px]">
      <p class="body-2 leading-[25px] ">${name}</p>
      <span class="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center ">
        ${categoryCount[name]}
      </span>
    </div>
  `;
  }
}
