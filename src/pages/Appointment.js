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
      <li class="grid grid-cols-[90px_1fr_110px] items-center gap-2 md:grid-cols-[115px_1fr_165px]">
        <span class="nav max-md:!text-[18px] text-white">
          ${item.day}
        </span>

        <span class="h-0 w-[20px] justify-self-center border-t-2 border-accent"></span>

        <span class="footer-2 max-md:!text-[17px] text-white">
          ${item.time}
        </span>
      </li>
    `;
  });
}
