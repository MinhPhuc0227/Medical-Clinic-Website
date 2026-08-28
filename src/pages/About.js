import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initTesti } from "../components/Testimonials";
import { initDoctorSection } from "../components/DoctorSection.js";
import { initNewsSection } from "../components/NewsSection.js";
import { initHeader } from "../components/header.js";

await loadComponent("header", "/components/header.html");
initHeader();
await setActiveNav();
await loadSubHeader("about");

await loadComponent("testi", "/components/Testimonials.html");
await loadComponent("doctorSection", "/components/DoctorSection.html");
await loadComponent("newsSection", "/components/NewsSection.html");
await loadComponent("contactSection", "/components/ContactsSection.html");
await loadComponent("footer", "/components/footer.html");

await initTesti();
await initDoctorSection();
await initNewsSection();
