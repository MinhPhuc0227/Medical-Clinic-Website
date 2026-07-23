// THÊM ACTIVE HOME TAB TRONG SET ACTIVE NAV
import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common.js";
import { initNewsletter } from "../components/NewsLetter.js";

await loadComponent("header", "/src/components/header.html");
setActiveNav();
loadSpecialty();
// Show main page content (contact form)
document.getElementById("page-content").classList.remove("hidden");
await loadComponent("footer", "/src/components/footer.html");
initNewsletter();

async function loadSpecialty() {
  try {
    // Get specialty id from url
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Redirect if no id
    if (!id) {
      window.location.href = "index.html";
      return;
    }

    // Load data
    const response = await fetch("/specialties.json");
    const specialties = await response.json();

    // Find specialty
    const specialty = specialties.find((item) => item.id === id);

    // Redirect if not found
    if (!specialty) {
      window.location.href = "index.html";
      return;
    }

    renderSpecialty(specialty);
  } catch (error) {
    console.error(error);
  }
}

function renderSpecialty(specialty) {
  const container = document.getElementById("specialty-detail");

  container.innerHTML = `
    <div class="grid grid-cols-2 items-center gap-[64px]">

      <!-- Left -->
      <div>

        <a
          href="Specialties.html"
          class="btn-text mb-[40px]"
        >
          ← Quay lại
        </a>

        <h1 class="display-1 text-primary mb-[24px]">
          ${specialty.name}
        </h1>

        <p class="body text-black leading-[170%] mb-[40px]">
          ${specialty.description}
        </p>

        <button class="btn-filled">
          Book an Appointment
        </button>

      </div>

      <!-- Right -->
      <div>
        <img
          src="${specialty.image}"
          alt="${specialty.name}"
          class="w-full h-[520px] object-cover rounded-[8px]"
        />
      </div>

    </div>
  `;
}
