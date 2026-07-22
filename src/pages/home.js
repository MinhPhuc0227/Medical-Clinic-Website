import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { initDoctorSection } from "../components/DoctorSection.js";
import { initNewsSection } from "../components/NewsSection.js";
import { icons } from "../js/icons.js";
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
// SPECIALITIES
// ======================================================================================
const grid = document.getElementById("specialties-grid");
loadSpecialties();

// loadSpecialties
async function loadSpecialties() {
  try {
    const response = await fetch("/specialties.json");
    const specialties = await response.json();

    renderSpecialties(specialties);
  } catch (error) {
    console.error(error);
  }
}

// renderSpecialties
function renderSpecialties(data) {
  grid.innerHTML = data
    .map(
      (item) => `
<div class="specialty-card
            border-[0.15px] 
            border-black/19
            border-radius-[5px]
            h-[172px]
            flex
            flex-col
            justify-center
            items-center
            gap-[8px]
            cursor-pointer">

    <div class="specialty-icon text-secondary">
        ${icons[item.icon]}
    </div>

    <p class="specialty-name footer-2 text-black">
        ${item.name}
    </p>

</div>
`,
    )
    .join("");

  initActiveCard();
}

// initActiveCard
function initActiveCard() {
  const cards = document.querySelectorAll(".specialty-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => {
        // Bỏ active của tất cả card
        item.classList.remove("bg-primary", "rounded-[5px]");

        // Đổi màu text
        const text = item.querySelector(".specialty-name");
        text.classList.remove("text-accent");
        text.classList.add("text-black");

        // Đổi icon về bình thường
        const icon = item.querySelector(".specialty-icon");
        icon.classList.remove("text-accent");
        icon.classList.add("text-secondary");
      });

      // Active card vừa click
      card.classList.add("bg-primary", "rounded-[5px]");

      // Đổi màu text
      const text = card.querySelector(".specialty-name");
      text.classList.remove("text-black");
      text.classList.add("text-accent");

      // Đổi icon active
      const icon = card.querySelector(".specialty-icon");
      icon.classList.remove("text-secondary");
      icon.classList.add("text-accent");
    });
  });
}

// ======================================================================================
// SERVICES
// ======================================================================================
// import services from "/src/services.json";

const response = await fetch("/services.json");
const services = await response.json();

const tabs = document.getElementById("service-tabs");
const detail = document.getElementById("service-detail");
const images = document.getElementById("service-images");

let current = 0;
let showAll = false;

function renderTabs() {
  tabs.innerHTML = "";

  // Nếu chưa View All thì chỉ lấy 4 phần tử
  const visibleServices = showAll ? services : services.slice(0, 4);

  visibleServices.forEach((service, index) => {
    const realIndex = showAll ? index : index;

    const active = realIndex === current;

    tabs.innerHTML += `
            <button
                class="
                    service-tab
                    w-full
                    h-[110px]
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-2
                    transition
                    border-b border-gray-200
                    ${active ? "bg-primary text-white" : "bg-white text-black"}
                "
                data-index="${realIndex}"
            >

                <img
                    src="${active ? service.activeIcon : service.normalIcon}"
                    class="w-8 h-8"
                >

                <span class="body text-center">
                    ${service.title}
                </span>

            </button>
        `;
  });

  tabs.innerHTML += `
        <button
            id="view-all-btn"
            class="w-full h-10 bg-primary text-accent button-text"
        >
            ${showAll ? "Show Less" : "View All"}
        </button>
    `;
}

function renderDetail() {
  const service = services[current];

  detail.innerHTML = `
    
        <h3 class="title mb-8">
            ${service.detail.heading}
        </h3>

        <div
            class="grid grid-cols-2 gap-y-5 gap-x-10 mb-8"
        >

            ${service.detail.keywords
              .map(
                (item) => `
                    <div class="flex items-center gap-3">

                        <div
                            class="w-4 h-4 rounded-full bg-secondary"
                        ></div>

                        <span class="body-2">
                            ${item}
                        </span>

                    </div>
                `,
              )
              .join("")}

        </div>

        ${service.detail.description
          .map(
            (text) => `
                <p class="body text-black mb-5 leading-7">
                    ${text}
                </p>
            `,
          )
          .join("")}
    `;
}

function renderImages() {
  const service = services[current];

  images.innerHTML = `
    
        <div>

            <img
                src="${service.image}"
                class="w-full h-[230px] object-cover"
            >

            <div class="flex h-2">

                <div class="w-1/4 bg-accent"></div>
                <div class="w-2/4 bg-primary"></div>
                <div class="w-1/4 bg-secondary"></div>

            </div>

        </div>

        <div class="mt-6">

            <img
                src="${service.subImage}"
                class="w-full h-[230px] object-cover"
            >

            <div class="flex h-2">

                <div class="w-1/4 bg-accent"></div>
                <div class="w-2/4 bg-primary"></div>
                <div class="w-1/4 bg-secondary"></div>

            </div>

        </div>

    `;
}

function render() {
  renderTabs();

  renderDetail();

  renderImages();
}

tabs.addEventListener("click", (e) => {
  // Click View All
  if (e.target.id === "view-all-btn") {
    showAll = !showAll;

    renderTabs();

    return;
  }

  // Click tab
  const btn = e.target.closest(".service-tab");

  if (!btn) return;

  current = Number(btn.dataset.index);

  render();
});

render();
