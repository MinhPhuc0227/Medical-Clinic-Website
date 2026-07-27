import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initTesti } from "../components/Testimonials";
import { initDoctorSection } from "../components/DoctorSection.js";
import { initNewsSection } from "../components/NewsSection.js";

await loadComponent("header", "/src/components/header.html");
await setActiveNav();
await loadSubHeader("about");

await loadComponent("testi", "/src/components/Testimonials.html");
await loadComponent("doctorSection", "/src/components/DoctorSection.html");
await loadComponent("newsSection", "/src/components/NewsSection.html");
await loadComponent("contactSection", "/src/components/ContactsSection.html");
await loadComponent("footer", "/src/components/footer.html");

await initTesti();
await initDoctorSection();
await initNewsSection();