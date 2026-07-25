import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common.js";
import { loadSubHeader } from "../components/SubHeader.js";
import { initAppForm } from "../components/AppointmentForm.js";
import { initNewsletter } from "../components/NewsLetter.js";

await loadComponent("header", "/src/components/header.html");
await setActiveNav();
await loadSubHeader("appointment");
await loadComponent("app-form", "/src/components/AppointmentForm.html");
await loadComponent("mapview", "/src/components/mapview.html");
await loadComponent("contactSection", "/src/components/ContactsSection.html");
await loadComponent("footer", "/src/components/footer.html");

await initAppForm();
addSubmitAppointmentFormEvent();
await initNewsletter();

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

function addSubmitAppointmentFormEvent() {
  const form = document.getElementById("appointmentForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("appointmentName").value.trim();
    const gender = document.getElementById("appointmentGender").value;
    const email = document.getElementById("appointmentEmail").value.trim();
    const phone = document.getElementById("appointmentPhone").value.trim();
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;
    const doctor = document.getElementById("doctor-input").value.trim();
    const department = document
      .getElementById("department-input")
      .value.trim();
    const message = document
      .getElementById("appointmentMessage")
      .value.trim();

    if (
      !name ||
      !gender ||
      !email ||
      !phone ||
      !date ||
      !time ||
      !doctor ||
      !department
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const appointments =
      JSON.parse(localStorage.getItem("appointmentFormData")) || [];

    const appointment = {
      id: crypto.randomUUID(),
      name,
      gender,
      email,
      phone,
      date,
      time,
      doctor,
      department,
      message,
      createdAt: new Date().toLocaleString("sv-SE"),
    };

    appointments.push(appointment);

    localStorage.setItem(
      "appointmentFormData",
      JSON.stringify(appointments)
    );

    alert("Appointment booked successfully!");

    form.reset();
  });
}