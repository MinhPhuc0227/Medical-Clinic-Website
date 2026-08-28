import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { loadServices } from "../components/ServiceCard.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { initHeader } from "../components/header.js";
import { loadFAQ } from "../components/FAQ.js";
// load layout
await loadComponent("header", "/components/header.html");
setActiveNav();
initHeader();
await loadSubHeader("services");
await loadServices();
await loadComponent("contactsSection", "/components/ContactsSection.html");
// Show main page content (service section)
document.getElementById("page-content").classList.remove("hidden");
await loadFAQ();
await loadComponent("footer", "/components/footer.html");
initNewsletter();
