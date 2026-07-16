import { fetchJson, loadComponent } from "../js/common";
import { createNewsCard } from "../components/NewsCard";
import { initSlideBar } from "../components/SlideBar";

export async function loadNews() {
  // load layout
  await loadComponent("app", "/src/pages/News.html");

  // load sidebar
  await loadComponent("sidebar", "/src/components/SlideBar.html");

  // lấy dữ liệu
  const newsData = await fetchJson("/News.json");
  // Pagination
  const newsPerPage = 4;
  let currentPage = 1;

  function renderNews() {
    const start = (currentPage - 1) * newsPerPage;
    const end = start + newsPerPage;
    const pageNews = newsData.slice(start, end);
    const newsList = document.getElementById("news-list");
    newsList.innerHTML = "";
    pageNews.forEach((item) => {
      newsList.innerHTML += createNewsCard(item);
    });
    renderPagination();
  }

  const totalPages = Math.ceil(newsData.length / newsPerPage);
  //nút số
  function renderPagination() {
    const container = document.getElementById("pagination");
    container.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      container.innerHTML += `
      <button
        class="page-btn px-2 py-1 rounded transition ${
          i === currentPage
            ? "text-primary"
            : "text-secondary hover:text-accent"
        }"
        data-page="${i}"
      >
        ${i}
      </button>
    `;
      // Thêm dấu "-" nếu chưa phải số cuối
      if (i < totalPages) {
        container.innerHTML += `
        <span class="text-primary">-</span>
      `;
      }
    }
  }
  renderNews();
  renderPagination();
  //click số trang
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".page-btn");
    if (!btn) return;
    currentPage = Number(btn.dataset.page);
    renderNews();
  });
  //nút previous
  document.getElementById("prev").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderNews();
    }
  };
  //nút next
  document.getElementById("next").onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderNews();
    }
  };

  await initSlideBar();
}
