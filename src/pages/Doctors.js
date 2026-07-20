import { loadComponent } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initTesti } from "../components/Testimonials";
import { initNewsSection } from "../components/NewsSection";

export async function loadDoctors() {
  await loadComponent("app", "/src/pages/Doctors.html");
  await loadSubHeader("doctors");
  await loadComponent("newsSection", "/src/components/NewsSection.html");
  await loadComponent("testi", "/src/components/Testimonials.html");
  await loadComponent("contactSection", "/src/components/ContactsSection.html");

  await initTesti();
  await initNewsSection();
}
