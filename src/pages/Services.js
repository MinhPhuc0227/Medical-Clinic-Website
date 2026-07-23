import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { loadServices } from "../components/ServiceCard.js";
import { initNewsletter } from "../components/NewsLetter.js";

// load layout
await loadComponent("header", "/src/components/header.html");
setActiveNav();
await loadSubHeader("services");
await loadServices();
await loadComponent("contactsSection", "/src/components/ContactsSection.html");
// Show main page content (service section)
document.getElementById("page-content").classList.remove("hidden");
await loadComponent("footer", "/src/components/footer.html");
initNewsletter();
