import "../css/main.css";
import { createMiniNews } from "../components/MiniNews.js";
import { fetchJson } from "../js/common";

export async function initSlideBar() {
  const newsList = await fetchJson("/News.json");
  const container = document.querySelector(".mini-news-list");
  container.innerHTML = "";
  // sắp xếp data theo date
  //     newsList
  //   .sort((a, b) => new Date(b.date) - new Date(a.date))
  //   .slice(0, 6)
  //   .forEach((news) => {
  //     container.innerHTML += createMiniNews(news);
  //   });

  const latestNews = newsList.slice(-6).reverse(); //lấy 6 bài mới nhất
  latestNews.forEach((news) => {
    container.innerHTML += createMiniNews(news);

    const categoryCount = {
      Surgery: 0,
      "Health Care": 0,
      Medical: 0,
      Professional: 0,
    };

    newsList.forEach((item) => {
      categoryCount[item.category]++;
    });
    const categories = document.querySelector(".category-list");

    categories.innerHTML = "";

    for (const name in categoryCount) {
      categories.innerHTML += `
    <div class="flex justify-between items-center">
      <p>${name}</p>
      <span class="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center">
        ${categoryCount[name]}
      </span>
    </div>
  `;
    }
  });
}
