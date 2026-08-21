import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common";
import { initNewsletter } from "../components/NewsLetter.js";
import { initHeader } from "../components/header.js";

// ========== Load layout ==========
await loadComponent("header", "/components/header.html");
setActiveNav();
initHeader();
await loadComponent("footer", "/components/footer.html");
initNewsletter();

// ========== PAGE CONTENT ==========
const STORAGE_KEY = "appointmentFormData";
const appointmentList = document.getElementById("appointment-list");

// ========== Get saved appointment list from localStorage ==========
function getAppointments() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// ========== Save new appointments list ==========
function saveAppointments(appointments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

// ========== Format date ==========
function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// ========== RENDER APPOINTMENT CARDS FUNCTION ==========
function renderAppointments() {
  const appointments = getAppointments();

  // 1. RENDER "NO APPOINTMENTS" BLOCK
  if (appointments.length === 0) {
    appointmentList.innerHTML = `
      <div
        class="w-full rounded-[5px] bg-accent p-6 text-center md:p-8"
      >
        <h2 class="display-3 mb-[8px] text-primary">
          No appointments
        </h2>

        <p class="body text-black">
          You don't have any appointments yet.
        </p>
      </div>
    `;
    return;
  }

  // 2. RENDER APPOINTMENT CARD (HTML)
  // Appointment card = Header + Body + Footer
  appointmentList.innerHTML = appointments
    .map((appointment) => {
      return `
        <article
          class="w-full overflow-hidden rounded-[5px] border border-accent bg-white shadow-sm"
        >

          <!-- ===== HEADER (important information) ===== -->
          <div
            class="flex flex-col gap-[12px] bg-primary px-4 py-4
                   sm:px-5 sm:py-5
                   md:flex-row md:items-center md:justify-between md:px-6"
          >
            <!-- 1. Appointment text + Doctor name -->
            <div class="min-w-0">
              <p class="small uppercase text-accent mb-1">Appointment</p>
              <h2
                class="display-3 wrap-break-word text-white">
                ${escapeHTML(appointment.doctor)}
              </h2>
            </div>

            <!-- 2. Date + Time -->
            <div
              class="shrink-0 text-left md:text-right"
            >
              <p class="body-2 text-accent">
                ${formatDate(appointment.date)}
              </p>
              <p class="body-2 mt-1 text-white">
                ${escapeHTML(appointment.time)}
              </p>
            </div>
          </div>


          <!-- ===== BODY (information) ===== -->
          <div
            class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-5 md:p-5"
          >
            <!-- 1. Patient -->
            <div class="min-w-0">
              <p class="small text-primary">Patient</p>
              <p class="body mt-1 wrap-break-word text-black">
                ${escapeHTML(appointment.name)}
              </p>
            </div>

            <!-- 2. Gender -->
            <div class="min-w-0">
              <p class="small text-primary">Gender</p>
              <p class="body mt-1 wrap-break-word text-black">
                ${escapeHTML(appointment.gender)}
              </p>
            </div>

            <!-- 3. Email -->
            <div class="min-w-0">
              <p class="small text-primary">Email</p>
              <p class="body mt-1 break-all text-black">
                ${escapeHTML(appointment.email)}
              </p>
            </div>

            <!-- 4. Phone -->
            <div class="min-w-0">
              <p class="small text-primary">Phone</p>
              <p class="body mt-1 wrap-break-word text-black">
                ${escapeHTML(appointment.phone)}
              </p>
            </div>

            <!-- 5. Department -->
            <div class="min-w-0">
              <p class="small text-primary">Department</p>
              <p class="body mt-1 wrap-break-word text-black">
                ${escapeHTML(appointment.department)}
              </p>
            </div>

            <!-- 6. Date -->
            <div class="min-w-0">
              <p class="small text-primary">Appointment Date</p>
              <p class="body mt-1 text-black">
                ${formatDate(appointment.date)}
              </p>
            </div>

            <!-- 7. Message -->
            ${
              appointment.message
                ? `
                  <div class="min-w-0 sm:col-span-2">
                    <p class="small text-primary">Message</p>

                    <p class="body mt-1 wrap-break-word text-black">
                      ${escapeHTML(appointment.message)}
                    </p>
                  </div>
                `
                : ""
            }
          </div>

          <!-- ===== FOOTER (cancel button) ===== -->
          <div
            class="border-t border-accent bg-gray-100 p-4 flex justify-around md:justify-end "
          >
            <button
              type="button"
              class="cancel-appointment w-auto rounded-full bg-accent px-5 py-3 button-text text-primary transition hover:bg-primary hover:text-accent"
              data-id="${appointment.id}"
            >
              Cancel Appointment
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

// ========== CREATE CANCEL BUTTON EVENT ==========
// 1. Cancel function
function cancelAppointment(id) {
  const appointments = getAppointments();
  const appointment = appointments.find((item) => item.id === id);

  if (!appointment) return;

  const confirmed = window.confirm(
    `Are you sure you want to cancel the appointment with ${appointment.doctor}?`,
  );

  if (!confirmed) return;

  // Create new appointment list (removed that cancelled appointment, got by id)
  const updatedAppointments = appointments.filter((item) => item.id !== id);
  saveAppointments(updatedAppointments); // save to localstorage
  renderAppointments();
}

// 2. Add event for cancel button
appointmentList.addEventListener("click", (event) => {
  const button = event.target.closest(".cancel-appointment");
  if (!button) return;
  const appointmentId = button.dataset.id;
  cancelAppointment(appointmentId); // call cancel function
});

// ========== SECURITY ==========
function escapeHTML(value) {
  // Return empty if value is null or undefined
  if (value === null || value === undefined) {
    return "";
  }

  // Convert to string and sanitize special characters
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

renderAppointments();

// Back button
document.getElementById("back-btn").addEventListener("click", () => {
  history.back();
});
