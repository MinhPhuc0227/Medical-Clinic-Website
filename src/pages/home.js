import { loadComponent } from "../js/common";
import { initDoctorSection } from "../components/DoctorSection";
import { initTesti } from "../components/Testimonials";
import { loadFAQ } from "../components/FAQ";
import { initNewsSection } from "../components/NewsSection";
import { initAppForm } from "../components/AppointmentForm.js";
import { loadServices } from "../components/ServiceCard.js";

export async function loadHome() {
  // load layout
  await loadComponent("app", "/src/pages/home.html");
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
}
