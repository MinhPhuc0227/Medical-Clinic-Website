import "../css/main.css";
import { getNews, loadComponent, setActiveNav } from "../js/common.js";
import { initSideBar } from "../components/SideBar";
import { loadNewsSubHeader } from "../components/SubHeader.js";

await loadComponent("header", "/src/components/header.html");
await setActiveNav();
await loadComponent("footer", "/src/components/footer.html");
const news = await getNews();
await loadComponent("sidebar", "/src/components/SideBar.html");
await loadComponent("contact-section", "/src/components/ContactsSection.html");
await initSideBar(news);

// Lấy id từ URL
const params = new URLSearchParams(window.location.hash.split("?")[1]);
const id = Number(params.get("id"));
// Tìm bài viết
const currentIndex = news.findIndex((item) => item.id === id);
const article = news[currentIndex];
await loadNewsSubHeader(article);
if (!article) {
  document.getElementById("news-detail").innerHTML = `
      <h2 class="display-2 text-primary">Article not found</h2>
    `;
  return;
}
// Render bài viết
document.getElementById("detail-image").src = article.image;

document.getElementById("detail-title").textContent = article.title;

document.getElementById("detail-description").innerHTML = `
  <p>${article.description}</p>
  <p>${article.content}</p>
`;
// sự kiện click button
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    const prevArticle = news[currentIndex - 1];
    location.hash = `#/news-detail?id=${prevArticle.id}`;
  }
});
nextBtn.addEventListener("click", () => {
  if (currentIndex < news.length - 1) {
    const nextArticle = news[currentIndex + 1];
    location.hash = `#/news-detail?id=${nextArticle.id}`;
  }
});
//ẩn button nếu không có bài viết trước hoặc sau
prevBtn.disabled = currentIndex === 0;
nextBtn.disabled = currentIndex === news.length - 1;
if (prevBtn.disabled) {
  prevBtn.classList.add("opacity-50", "cursor-not-allowed");
}

if (nextBtn.disabled) {
  nextBtn.classList.add("opacity-50", "cursor-not-allowed");
}
