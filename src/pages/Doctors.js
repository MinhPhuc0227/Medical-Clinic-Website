import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initTesti } from "../components/Testimonials";
import { initNewsSection } from "../components/NewsSection";
import { initNewsletter } from "../components/NewsLetter.js";

await loadComponent("header", "/src/components/header.html");
setActiveNav();
initNewsletter();
await loadComponent("footer", "/src/components/footer.html");
await loadSubHeader("doctors");
await loadComponent("newsSection", "/src/components/NewsSection.html");
await loadComponent("testi", "/src/components/Testimonials.html");
await loadComponent("contactSection", "/src/components/ContactsSection.html");

await initTesti();
await initNewsSection();
// kéo lên đầu trang khi chuyển bài
window.scrollTo({
  top: 0,
  behavior: "smooth",
});
