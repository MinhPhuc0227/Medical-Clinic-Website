import { fetchJson, loadComponent, loadSubHeader } from "../js/common";
import { createNewsCard } from "../components/NewsCard";
import { initSlideBar } from "../components/SlideBar";

function getCategory(title) {
  const t = title.toLowerCase();

  if (
    t.includes("surgery") ||
    t.includes("operation") ||
    t.includes("transplant")
  ) {
    return "Surgery";
  }

  if (
    t.includes("doctor") ||
    t.includes("nurse") ||
    t.includes("hospital") ||
    t.includes("clinic")
  ) {
    return "Professional";
  }

  if (
    t.includes("medicine") ||
    t.includes("medical") ||
    t.includes("treatment") ||
    t.includes("therapy") ||
    t.includes("patient")
  ) {
    return "Medical";
  }

  return "Health Care";
}

export async function loadNews() {
  // load layout
  await loadComponent("app", "/src/pages/News.html");
  await loadComponent("subheader", "/src/components/subhead.html");
  const subHeaders = await fetchJson("/subheader.json");
  await loadSubHeader(subHeaders.news);

  // load sidebar
  await loadComponent("sidebar", "/src/components/SlideBar.html");
  // load contact section
  await loadComponent(
    "contact-section",
    "/src/components/Contacts Section.html",
  );
  // lấy dữ liệu
  const API_KEY = "393286089051475a92bee89d2e60bea3";
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${API_KEY}`,
  );

  const data = await response.json();
  const newsData = data.articles.map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    image: item.urlToImage,
    date: item.publishedAt,
    content: item.content,
    url: item.url,
    views: Math.floor(Math.random() * 5000),
    comments: Math.floor(Math.random() * 200),
    category: getCategory(item.title),
  }));
  console.log(data);
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
