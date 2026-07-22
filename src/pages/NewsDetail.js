import "../css/main.css";
import { getNews, loadComponent, setActiveNav } from "../js/common.js";
import { initSideBar } from "../components/SideBar";
import { loadNewsSubHeader } from "../components/SubHeader.js";
import { initNewsletter } from "../components/NewsLetter.js";

await loadComponent("header", "/src/components/header.html");
setActiveNav();
initNewsletter();

const news = await getNews();

await loadComponent("sidebar", "/src/components/SideBar.html");
await loadComponent("contact-section", "/src/components/ContactsSection.html");
await initSideBar(news);

// Lấy id từ URL
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
// Tìm bài viết
const currentIndex = news.findIndex((item) => item.id === id);
const article = news[currentIndex];
await loadNewsSubHeader(article);

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
    location.href = `NewsDetail.html?id=${prevArticle.id}`;
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < news.length - 1) {
    const nextArticle = news[currentIndex + 1];
    location.href = `NewsDetail.html?id=${nextArticle.id}`;
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
// kéo lên đầu trang khi chuyển bài
window.scrollTo({
  top: 0,
  behavior: "smooth",
});
document.getElementById("page-content").classList.remove("hidden");
await loadComponent("footer", "/src/components/footer.html");
