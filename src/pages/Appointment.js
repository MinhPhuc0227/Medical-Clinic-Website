import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common.js";
import { loadSubHeader } from "../components/SubHeader.js";
import { initAppForm } from "../components/AppointmentForm.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { loadFAQ } from "../components/FAQ.js";
import { initHeader } from "../components/header.js";

await loadComponent("header", "/components/header.html");
initHeader();
await setActiveNav();
await loadSubHeader("appointment");
await loadComponent("appointmentForm", "/components/AppointmentForm.html");
await loadComponent("mapview", "/components/mapview.html");
await loadComponent("contactSection", "/components/ContactsSection.html");
await loadComponent("footer", "/components/footer.html");

initAppForm();
await initNewsletter();
await loadFAQ();
// Schedule Hours
const scheduleList = document.getElementById("schedule-list");

if (scheduleList) {
  const response = await fetch("/ScheduleHours.json");
  const schedules = await response.json();

  scheduleList.innerHTML = "";

  scheduleList.innerHTML = schedules.map((item) => `
  <li class="grid grid-cols-[90px_1fr_130px] items-center gap-2 md:grid-cols-[90px_1fr_150px] lg:grid-cols-[100px_1fr_165px]">
    <span class="section-text lg:text-[18px] lg:leading-[130%] font-body font-normal text-white ml-5 md:ml-7 lg:ml-0">
      ${item.day}
    </span>
    <span class="h-0 w-[20px] justify-self-center border-t-2 border-accent"></span>
    <span class="section-text lg:text-[18px] lg:leading-[130%] font-body font-normal leading-[140%] text-white">
      ${item.time}
    </span>
  </li>
`).join("");
}
