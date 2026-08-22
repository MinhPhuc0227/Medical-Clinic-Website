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
    All: newsList.length,
    Surgery: 0,
    "Health Care": 0, 
    Medical: 0,
    Professional: 0,
  };

  newsList.forEach((item) => {
  if (!item.category) return;

  if (categoryCount[item.category] !== undefined) {
    categoryCount[item.category]++;
  }
});

  const categories = document.querySelector(".category-list");

  categories.innerHTML = "";

  for (const name in categoryCount) {
  categories.innerHTML += `
    <button
      type="button"
      class="
        category-item
        flex justify-between items-center
        w-full lg:w-[274px]
        h-[50px]
        px-[16px]
        transition
      "
      data-category="${name}"
    >
      <span class="body-2 leading-[25px]">
        ${name}
      </span>

      <span
        class="
          w-6 h-6 rounded-full
          bg-secondary text-white
          flex items-center justify-center
        "
      >
        ${categoryCount[name]}
      </span>
    </button>
  `;
}

const categoryButtons = categories.querySelectorAll(".category-item");
// đặt trạng thái mặc định mới vào là all
const allButton = categories.querySelector(
  '[data-category="All"]'
);

allButton?.classList.add(
  "border",
  "border-gray-300",
  "rounded-[5px]"
);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    // 1. Bỏ trạng thái active của tất cả category
    categoryButtons.forEach((item) => {
      item.classList.remove(
        "border",
        "border-gray-300",
        "rounded-[5px]"
      );
    });

    // 2. Thêm trạng thái active cho category vừa click
    button.classList.add(
      "border",
      "border-gray-300",
      "rounded-[5px]"
    );

    // 3. Gửi category sang News.js để filter
    document.dispatchEvent(
      new CustomEvent("newsCategoryChange", {
        detail: category,
      }),
    );
  });
});

}
