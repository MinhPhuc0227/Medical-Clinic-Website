import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { initDoctorSection } from "../components/DoctorSection.js";
import { initNewsSection } from "../components/NewsSection.js";

await loadComponent("header", "/src/components/header.html");
setActiveNav();

await loadComponent("doctorsSection", "/src/components/DoctorSection.html");
await initDoctorSection();

await loadComponent("newsSection", "/src/components/NewsSection.html");
await initNewsSection();

await loadComponent("contactsSection", "/src/components/ContactsSection.html");

// Show main page content (contact form)
document.getElementById("page-content").classList.remove("hidden");

await loadComponent("footer", "/src/components/footer.html");
initNewsletter();
