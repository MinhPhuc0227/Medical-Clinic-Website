import "../css/main.css";
import { loadComponent, getNews, setActiveNav } from "../js/common";
import { createNewsCard } from "../components/NewsCard";
import { initSideBar } from "../components/SideBar";
import { loadSubHeader } from "../components/SubHeader.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { initHeader } from "../components/header.js";

await loadComponent("header", "/components/header.html");
setActiveNav();
initNewsletter();
initHeader();
await loadSubHeader("news");

// load sidebar
await loadComponent("sidebar", "/components/SideBar.html");
// load contact section
await loadComponent("contact-section", "/components/ContactsSection.html");
// lấy dữ liệu
const newsData = await getNews();
localStorage.setItem("newsData", JSON.stringify(newsData));
// Pagination
const newsPerPage = 4;
let currentPage = 1;
let filteredNews = [...newsData];

const searchInput = document.getElementById("news-search");
let selectedCategory = "All";
let searchKeyword = "";

function getTotalPages() {
  return Math.ceil(filteredNews.length / newsPerPage);
}

function renderNews() {
  const newsList = document.getElementById("news-list");
  const paginationWrapper = document.getElementById("pagination-wrapper");

  newsList.innerHTML = "";

  // Không có bài viết
  if (filteredNews.length === 0) {
    newsList.innerHTML = `
      <p class="body text-center text-gray-500 py-[40px]">
        No articles are available in this category yet.
      </p>
    `;

    paginationWrapper.classList.add("hidden");
    return;
  }

  // Có bài thì hiện pagination lại
  paginationWrapper.classList.remove("hidden");

  const start = (currentPage - 1) * newsPerPage;
  const end = start + newsPerPage;

  const pageNews = filteredNews.slice(start, end);

  pageNews.forEach((item) => {
    newsList.innerHTML += createNewsCard(item);
  });

  renderPagination();
}

//nút số
function renderPagination() {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  const totalPages = getTotalPages();

  for (let i = 1; i <= totalPages; i++) {
    container.innerHTML += `
      <button
        class="page-btn py-2 rounded transition ${
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
//lọc news card
function applyNewsFilters() {
  filteredNews = newsData.filter((news) => {
    const matchCategory =
      selectedCategory === "All" || news.category === selectedCategory;

    const matchSearch = news.title.toLowerCase().includes(searchKeyword);

    return matchCategory && matchSearch;
  });

  currentPage = 1;
  renderNews();
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
  if (currentPage < getTotalPages()) {
    currentPage++;
    renderNews();
  }
};

await initSideBar(newsData);

document.addEventListener("newsCategoryChange", (e) => {
  selectedCategory = e.detail;

  applyNewsFilters();
});

searchInput.addEventListener("input", () => {
  searchKeyword = searchInput.value.trim().toLowerCase();

  applyNewsFilters();
});

// kéo lên đầu trang khi chuyển bài
window.scrollTo({
  top: 0,
  behavior: "smooth",
});
// Hiện trang
document.getElementById("page-content").classList.remove("hidden");
await loadComponent("footer", "/components/footer.html");
