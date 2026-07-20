import "../css/main.css";
import { setActiveNav } from "./common.js";
//nhớ import hàm load
import { loadNews } from "../pages/News.js";
import { loadHome } from "../pages/home.js";
import { loadNewsDetail } from "../pages/NewsDetail.js";
import { loadDoctors } from "../pages/Doctors.js";
export async function router() {
  const page = window.location.hash.split("?")[0] || "#home";
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
      await loadDoctors();
      break;
    case "#contact":
      await loadNews();
      break;
    case "#/news-detail":
      await loadNewsDetail();
      break;
  }
  setActiveNav();
}
