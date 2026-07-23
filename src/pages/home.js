import "../css/main.css";
import { icons } from "../js/icons.js";
import { loadComponent, setActiveNav } from "../js/common.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { initDoctorSection } from "../components/DoctorSection.js";
import { initNewsSection } from "../components/NewsSection.js";
import { initAppForm } from "../components/AppointmentForm.js";

await loadComponent("header", "/src/components/header.html");
setActiveNav();
await loadComponent("appointmentForm", "/src/components/AppointmentForm.html");
await initAppForm();
await loadComponent("doctorsSection", "/src/components/DoctorSection.html");
await initDoctorSection();
await loadComponent("newsSection", "/src/components/NewsSection.html");
await initNewsSection();
await loadComponent("contactsSection", "/src/components/ContactsSection.html");
// Show main page content (contact form)
document.getElementById("page-content").classList.remove("hidden");
await loadComponent("footer", "/src/components/footer.html");
initNewsletter();

// ======================================================================================
// SPECIALTIES RENDER
// ======================================================================================
const grid = document.getElementById("specialties-grid");
loadSpecialties();

// Load specialties
async function loadSpecialties() {
  try {
    const response = await fetch("/specialties.json");
    const specialties = await response.json();

    renderSpecialties(specialties);
    initActiveCard();
  } catch (error) {
    console.error(error);
  }
}

function renderSpecialties(data) {
  grid.innerHTML = data
    .map(
      (item) => `
<a
    href="SpecialtyDetail.html?id=${item.id}"
    class="
        group
        specialty-card
        border-[0.15px]
        border-black/19
        rounded-[5px]
        h-[172px]
        flex
        flex-col
        justify-center
        items-center
        gap-[8px]
        cursor-pointer
        transition-all
        duration-300
        hover:bg-primary
    "

>
    <div
        class="
            specialty-icon
            text-secondary
            transition-colors
            duration-300
            group-hover:text-accent
        "
    >
        ${icons[item.icon]}
    </div>

    <p
        class="
            specialty-name
            footer-2
            text-black
            transition-colors
            duration-300
            group-hover:text-accent
        "
    >
        ${item.name}
    </p>

</a>
`,
    )
    .join("");
}

// ======================================================================================
// SERVICES RENDER
// ======================================================================================
const tabs = document.getElementById("service-tabs");
const detail = document.getElementById("service-detail");
const images = document.getElementById("service-images");
let services = [];
let current = 0;
loadServices();

// Load services
async function loadServices() {
  try {
    const response = await fetch("/services.json");
    services = await response.json();

    renderServices();
    tabs.addEventListener("click", handleTabClick);
  } catch (error) {
    console.error(error);
  }
}

// Hàm xử lý khi click tab
function handleTabClick(e) {
  const btn = e.target.closest(".service-tab");
  if (!btn) return;
  current = Number(btn.dataset.index);
  renderServices();
}

// Hàm render tổng hợp
function renderServices() {
  renderTabs();
  renderDetail();
  renderImages();
}

// Render tabs
function renderTabs() {
  tabs.innerHTML = "";
  const serviceTabs = services.slice(0, 4);

  serviceTabs.forEach((service, index) => {
    const active = index === current;

    tabs.innerHTML += `
            <button
                class="
                    service-tab
                    w-full
                    h-[106px]
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-[8px]
                    transition
                    ${active ? "bg-primary text-accent" : "bg-white text-black"}
                "
                data-index="${index}"
            >

                <!-- Icon -->
                <div
                    class="
                        service-icon
                        w-[32px]
                        h-[32px]
                        ${active ? "text-accent" : "text-secondary"}
                    "
                >
                    ${icons[service.icon]}
                </div>

                <!-- Title -->
                <span class="body text-center">
                    ${service.title}
                </span>

            </button>
        `;
  });

  tabs.innerHTML += `
        <a
            href="Services.html"
            class="w-full h-[40px] bg-primary text-accent button-text flex items-center justify-center"
        >
            View All
        </a>
    `;
}

// Render detail
function renderDetail() {
  const service = services[current];
  detail.innerHTML = `
        <!-- Heading -->
        <h3 class="title text-black mb-[24px]">
            ${service.detail.heading}
        </h3>

        <!-- Keywords -->
        <div
            class="max-w-[414px] grid grid-cols-[auto_auto] justify-between gap-y-[16px] mb-[32px]"
        >
            ${service.detail.keywords
              .map(
                (item) => `
                    <div class="flex items-center gap-[10px]">
                        <div
                            class="w-[16px] h-[16px] rounded-full bg-secondary"
                        ></div>
                        <span class="body-2 text-black">
                            ${item}
                        </span>
                    </div>
                `,
              )
              .join("")}
        </div>

        <!-- Description -->
        <div class="space-y-[8px]">
            ${service.detail.description
              .map(
                (text) => `
                    <p class="body text-black leading-[140%]">
                        ${text}
                    </p>
                `,
              )
              .join("")}
        </div>
    `;
}

// Render images
function renderImages() {
  const service = services[current];
  images.innerHTML = `
        <!-- Image 1 -->
        <div class="mt-[21.32px]">
            <img
                src="${service.image}"
                class="w-full h-[231.34px] object-cover"
            >
            <div class="flex h-[8.53px]">
                <div class="w-[72.51px] bg-accent"></div>
                <div class="flex-1 bg-primary"></div>
                <div class="w-[52.91px] bg-secondary"></div>
            </div>
        </div>

        <!-- Image 2 -->
        <div>
            <img
                src="${service.subImage}"
                class="w-full h-[231.34px] object-cover"
            >
            <div class="flex h-[8.53px]">
                <div class="w-[72.51px] bg-accent"></div>
                <div class="flex-1 bg-primary"></div>
                <div class="w-[52.91px] bg-secondary"></div>
            </div>
        </div>
    `;
}
