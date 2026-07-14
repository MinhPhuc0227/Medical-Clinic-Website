import { fetchJson, loadComponent } from "../js/common";
import { createNewsCard } from "../components/NewsCard";
import { initSlideBar } from "../components/SlideBar";

export async function loadNews() {
  // load layout
  await loadComponent("app", "/src/pages/News.html");

  // load sidebar
  await loadComponent("sidebar", "/src/components/SlideBar.html");

  // lấy dữ liệu
  const news = await fetchJson("/News.json");

  const container = document.getElementById("news-list");

  container.innerHTML = "";

  news.forEach((item) => {
    container.innerHTML += createNewsCard(item);
  });

  await initSlideBar();
}
