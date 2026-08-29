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
const loading = document.getElementById("loading");
loading.classList.remove("hidden");
const doctors = await fetchJson("/Doctors.json");
loading.classList.add("hidden");
const doctor = doctors.find((item) => item.id === id);

if (!doctor) {
  window.location.href = "/Doctors.html";
  throw new Error("Doctor not found");
}

// Cập nhật 4 thẻ Open Graph theo bác sĩ
document
  .querySelector('meta[property="og:title"]')
  ?.setAttribute("content", `MEDDICAL | ${doctor.name}`);

document
  .querySelector('meta[property="og:description"]')
  ?.setAttribute(
    "content",
    `${doctor.name} - ${doctor.specialty}. View doctor information and professional details at MEDDICAL.`,
  );

document
  .querySelector('meta[property="og:type"]')
  ?.setAttribute("content", "website");

document
  .querySelector('meta[property="og:url"]')
  ?.setAttribute("content", window.location.href);

// 3. Render dữ liệu bác sĩ vào DOM
document.getElementById("doctor-image").src = doctor.image;
document.getElementById("doctor-name").textContent = doctor.name;
document.getElementById("doctor-specialty").textContent = doctor.specialty;
document.getElementById("doctor-introduction").textContent =
  doctor.introduction;
document.getElementById("doctor-experienceYears").textContent =
  doctor.experienceYears;

// Sử dụng DocumentFragment để tránh xáo trộn DOM liên tục (chống Forced Reflow)
const renderList = (elementId, items) => {
  const el = document.getElementById(elementId);
  if (!el || !items) return;
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });
  el.replaceChildren(fragment);
};

renderList("doctor-experience", doctor.experience);
renderList("doctor-career", doctor.career);

setActiveNav();
initNewsletter();
initHeader();

document.getElementById("back-btn")?.addEventListener("click", () => {
  history.back();
});

// 4. Trì hoãn việc khởi tạo Slider/Testimonials để chờ trình duyệt Paint xong giao diện chính
requestAnimationFrame(() => {
  setTimeout(async () => {
    await initTesti();
    await initNewsSection();
  }, 0);
});
