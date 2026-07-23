import "../css/main.css";
import { icons } from "../js/icons.js";
import { loadComponent, setActiveNav } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { initDoctorSection } from "../components/DoctorSection.js";

// load layout
await loadComponent("header", "/src/components/header.html");
await setActiveNav();
await initMainContent();
await loadComponent("doctorsSection", "/src/components/DoctorSection.html");
await initDoctorSection();
await loadComponent("contactsSection", "/src/components/ContactsSection.html");
// Show main page content (service section)
document.getElementById("page-content").classList.remove("hidden");
await loadComponent("footer", "/src/components/footer.html");
await initNewsletter();

// INIT MAIN CONTENT FUNCTION
async function initMainContent() {
  // ============================================================
  // I. GET SELECTED SERVICE
  // ============================================================

  // Get service id from url
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // Redirect to Services page if no ID is provided
  if (!id) {
    window.location.href = "services.html";
    return;
  }

  // Load services data
  const response = await fetch("/services.json");
  const services = await response.json();

  // Find selected service
  const service = services.find((item) => item.id === id);

  // Redirect if the service does not exist
  if (!service) {
    window.location.href = "services.html";
    return;
  }

  // Load subheader (based on current service)
  await loadSubHeader(id);

  // ============================================================
  // II. CREATE CONTENT SECTION FOR EACH SERVICE TAB
  // ============================================================

  // ========== 1. SERVICE MENU ==========
  const serviceMenu = services
    .map(
      (item) => `
      <a
        href="ServiceDetail.html?id=${item.id}"
        class="flex items-center gap-[8px] h-[80px] px-[32px] 
        ${
          item.id === service.id
            ? "bg-primary text-accent rounded-t-[5px]"
            : "bg-white text-black"
        }"
      >
        
        <!-- Service Icon -->
        <div
            class="
                service-icon
                w-[32px]
                h-[32px]
                ${item.id === service.id ? "text-accent" : "text-secondary"}
            "
        >
            ${icons[item.icon]}
        </div>

        <!-- Service Title -->
        <span class="body whitespace-nowrap">
          ${item.title}
        </span>
      </a>
    `,
    )
    .join("");

  // ========== 2. KEYWORDS LIST ==========
  const keywords = service.detail.keywords
    .map(
      (keyword) => `
      <div class="flex items-center gap-[10px]">
        <!-- Dot -->
        <span
          class="w-[16px] h-[16px] rounded-full bg-secondary flex-shrink-0"
        ></span>

        <!-- Keyword -->
        <span class="body-2 text-black">
          ${keyword}
        </span>
      </div>
    `,
    )
    .join("");

  // ========== 3. MAIN CONTENT CONTAINER ==========
  const container = document.getElementById("mainContent");
  container.innerHTML = `
<section class="max-w-[992px] mx-auto">

    <!-- LAYOUT: 2 COLUMNS -->
    <div class="grid grid-cols-[240px_1fr] gap-[21px]">

        <!-- Column 1. Left (Service Menu)-->
        <div
            class="border border-primary/20 rounded-[5px] overflow-hidden h-fit"
        >
            ${serviceMenu}
        </div>

        <!-- Column 2. Right (Image + Heading + Keywords + Description) -->
        <div>

            <img
                src="${service.image}"
                class="w-full h-[454px] object-cover"
            >

            <h2 class="display-2 text-primary mt-[30px]">
                ${service.detail.heading}
            </h2>

            <div
                class="grid grid-cols-3 gap-y-[16px] mt-[24px]"
            >
                ${keywords}
            </div>

            <div class="space-y-[8px] mt-[24px]">

                <p class="body text-black">
                    ${service.detail.description[0]}
                </p>

                <p class="body text-black">
                    ${service.detail.description[1]}
                </p>

            </div>

        </div>

    </div>

</section>
`;
}
