import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common.js";
import { loadSubHeader } from "../components/SubHeader.js";
import { initAppForm } from "../components/AppointmentForm.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { loadFAQ } from "../components/FAQ.js";
import { initHeader } from "../components/header.js";

await loadComponent("header", "/src/components/header.html");
initHeader();
await setActiveNav();
await loadSubHeader("appointment");
await loadComponent("app-form", "/src/components/AppointmentForm.html");
await loadComponent("mapview", "/src/components/mapview.html");
await loadComponent("contactSection", "/src/components/ContactsSection.html");
await loadComponent("footer", "/src/components/footer.html");

await initAppForm();
await initNewsletter();
await loadFAQ();
// Schedule Hours
const scheduleList = document.getElementById("schedule-list");

if (scheduleList) {
  const response = await fetch("/ScheduleHours.json");
  const schedules = await response.json();

  scheduleList.innerHTML = "";

  schedules.forEach((item) => {
    scheduleList.innerHTML += `
      <li class="grid grid-cols-[115px_110px_165px] items-center">
        <span class="nav text-white">
          ${item.day}
        </span>

        <span class="h-0 w-[20px] justify-self-center border-t-2 border-accent"></span>

        <span class="footer-2 text-white">
          ${item.time}
        </span>
      </li>
    `;
  });
}
