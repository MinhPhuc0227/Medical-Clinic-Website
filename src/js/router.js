import "../css/main.css";
import { loadComponent } from "./common.js";
import "../components/Button.js";
//import { createdoctorCard } from "../components/DoctorCard";
//import { doctors } from "../data/Doctors";

//const container = document.querySelector("#doctor-list");
//doctors là một mảng, nên map() sẽ tạo 1 card cho mỗi phần tử trong mảng => data có nhiu là hiện hết
//container.innerHTML = doctors.map((doctor) => doctorCard(doctor)).join("");

// gọi đúng 1 card thôi
//const doctorList = document.querySelector("#doctor-list");
//doctorList.innerHTML = doctorCard(doctors[0]);

/* hiện đúng 1 card thôi, nhưng tìm theo specialty (có điều kiện)
const doctor = doctors.find(d => d.specialty === "Cardiology");
doctorList.innerHTML = doctorCard(doctor);
*/

//import { createSmallNews } from "../components/SmallNews.js";

// const container = document.getElementById("news-container");

// news.forEach((item) => {
//   container.innerHTML += createSmallNews(item);
// });
// console.log("test.js loaded");

// import { initDoctorSection } from "../components/DoctorSection.js";
//import { initNewsSection } from "../components/NewsSection.js";
// import { initSlideBar } from "../components/SlideBar.js";

// Khởi tạo các components của trang
// async function init() {
//await loadComponent("doctorSection", "/src/components/DoctorSection.html");
//await initDoctorSection();
//await loadComponent("ButtonIcon", "/src/components/ButtonIcon.html");
//}

//init();
import { loadNews } from "../pages/News";

export async function router() {
  const page = location.hash || "#news";

  switch (page) {
    case "#news":
      await loadNews();
      break;
  }
}
