import "../css/main.css";
import { loadComponent, setActiveNav, fetchJson } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initTesti } from "../components/Testimonials";
import { initNewsSection } from "../components/NewsSection";
import { initNewsletter } from "../components/NewsLetter.js";
import { initHeader } from "../components/header.js";

await loadComponent("header", "/components/header.html");
setActiveNav();
initNewsletter();
initHeader();
await loadComponent("footer", "/components/footer.html");
await loadSubHeader("doctors");
await loadComponent("newsSection", "/components/NewsSection.html");
await loadComponent("testi", "/components/Testimonials.html");
await loadComponent("contactSection", "/components/ContactsSection.html");

// kéo lên đầu trang khi chuyển bài
window.scrollTo({
  top: 0,
  behavior: "smooth",
});
// đọc id từ url
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
//đọc data
const doctors = await fetchJson("/Doctors.json");
// kiếm id
const doctor = doctors.find((item) => item.id === id);
if (!doctor) {
  window.location.href = "/Doctors.html";
  throw new Error("Doctor not found");
}

document.getElementById("doctor-image").src = doctor.image;
document.getElementById("doctor-name").textContent = doctor.name;
document.getElementById("doctor-specialty").textContent = doctor.specialty;
document.getElementById("doctor-introduction").textContent =
  doctor.introduction;
document.getElementById("doctor-experienceYears").textContent =
  doctor.experienceYears;

document.getElementById("doctor-experience").innerHTML = doctor.experience
  .map((item) => `<li>${item}</li>`)
  .join("");
document.getElementById("doctor-career").innerHTML = doctor.career
  .map((item) => `<li>${item}</li>`)
  .join("");
// nút back
document.getElementById("back-btn").addEventListener("click", () => {
  history.back();
});
await initTesti();
await initNewsSection();
