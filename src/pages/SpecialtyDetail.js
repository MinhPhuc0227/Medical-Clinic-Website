// THÊM ACTIVE HOME TAB TRONG SET ACTIVE NAV
import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { initHeader } from "../components/header.js";

await loadComponent("header", "/components/header.html");
setActiveNav();
initHeader();
await loadSpecialty();
// Show main page content (contact form)
document.getElementById("page-content").classList.remove("hidden");
await loadComponent("footer", "/components/footer.html");
initNewsletter();

// Xác định id của trang và load dữ liệu
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

    // Update meta title and meta description
    document.title = `MEDDICAL | ${specialty.name}`;

    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", specialty.meta.description);

    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", specialty.meta.keywords);

    document
      .querySelector('meta[property="og:title"]')
      .setAttribute("content", `MEDDICAL | ${specialty.name}`);

    document
      .querySelector('meta[property="og:description"]')
      .setAttribute("content", specialty.meta.description);

    // Render function
    renderSpecialty(specialty);
  } catch (error) {
    console.error(error);
  }
}

// Render specialty
function renderSpecialty(specialty) {
  const container = document.getElementById("specialty-detail");

  container.innerHTML = `
    <div class="grid grid-cols-1 gap-[32px] md:gap-[40px] lg:grid-cols-2 lg:items-start lg:gap-[64px]">

      <!-- Left -->
      <div>
        <a
          href="index.html#specialtiesSection"
          class="btn-text mb-[24px] md:mb-[32px] lg:mb-[40px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </a>

        <h1 class="display-1 text-primary mb-[16px] md:mb-[20px] lg:mb-[24px]">
          ${specialty.name}
        </h1>

        <p class="body text-black leading-[140%] mb-[24px] md:mb-[32px] lg:mb-[40px]">
          ${specialty.description}
        </p>

        <a href="index.html#appointmentSection" class="btn-filled">
          Book an Appointment
        </a>
      </div>

      <!-- Image -->
      <div>
        <img
          src="${specialty.image}"
          alt="${specialty.name}"
          class="w-full h-[260px] md:h-[380px] lg:h-[520px] object-cover rounded-[5px]"
        />
      </div>
    </div>
  `;
}
