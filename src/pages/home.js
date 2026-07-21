import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common.js";
import { initDoctorSection } from "../components/DoctorSection.js";
import { initTesti } from "../components/Testimonials.js";
import { loadFAQ } from "../components/FAQ.js";
import { initNewsSection } from "../components/NewsSection.js";
import { initAppForm } from "../components/AppointmentForm.js";
import { loadServices } from "../components/ServiceCard.js";

await loadComponent("header", "/src/components/header.html");
await setActiveNav();
await loadComponent("footer", "/src/components/footer.html");
await loadComponent("app-form", "/src/components/AppointmentForm.html");
await loadComponent("mapview", "/src/components/MapView.html");
await loadComponent("newsSection", "/src/components/NewsSection.html");
await loadComponent("testi", "/src/components/Testimonials.html");
await loadComponent("contactSection", "/src/components/ContactsSection.html");
await loadComponent("doctorSection", "/src/components/DoctorSection.html");

await initDoctorSection();
await initTesti();
await loadFAQ();
await initNewsSection();
await initAppForm();
await loadServices();
