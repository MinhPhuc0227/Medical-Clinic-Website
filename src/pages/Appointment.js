import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common.js";
import { loadSubHeader } from "../components/SubHeader.js";
import { initAppForm } from "../components/AppointmentForm.js";

await loadComponent("header", "/src/components/header.html");
await setActiveNav();
await loadSubHeader("appointment");

await loadComponent("app-form", "/src/components/AppointmentForm.html");

await initAppForm();

// Schedule Hours
const scheduleList = document.getElementById("schedule-list");

if (scheduleList) {
  const response = await fetch("/ScheduleHours.json");
  const schedules = await response.json();

  scheduleList.innerHTML = "";

  schedules.forEach((item) => {
    scheduleList.innerHTML += `
      <li class="flex items-center justify-between">
        <span class="title text-white">
          ${item.day}
        </span>

        <span class="title text-accent">
          ${item.time}
        </span>
      </li>
    `;
  });
}