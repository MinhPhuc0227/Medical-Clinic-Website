import "../css/main.css";
//nhớ import hàm load
import { loadNews } from "../pages/News.js";
import { loadHome } from "../pages/home.js";
export async function router() {
  const page = window.location.hash || "#home";
  //nhớ đổi tên hàm load
  switch (page) {
    case "#news":
      await loadNews();
      break;
    case "#home":
      await loadHome();
      break;
    case "#about":
      await loadNews();
      break;
    case "#services":
      await loadNews();
      break;
    case "#doctors":
      await loadNews();
      break;
    case "#contact":
      await loadNews();
      break;
  }
}
