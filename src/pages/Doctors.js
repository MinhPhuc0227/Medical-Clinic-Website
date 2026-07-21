import "../css/main.css";
import { loadComponent,setActiveNav } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initTesti } from "../components/Testimonials";
import { initNewsSection } from "../components/NewsSection";

await loadComponent("header", "/src/components/header.html");
await setActiveNav();
await loadComponent("footer", "/src/components/footer.html");
await loadSubHeader("doctors");
await loadComponent("newsSection", "/src/components/NewsSection.html");
await loadComponent("testi", "/src/components/Testimonials.html");
await loadComponent("contactSection", "/src/components/ContactsSection.html");

await initTesti();
await initNewsSection();
