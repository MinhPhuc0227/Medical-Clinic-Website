import "../css/main.css";
import { icons } from "../js/icons.js";
import { loadComponent, setActiveNav, fetchJson } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { initDoctorSection } from "../components/DoctorSection.js";
import { initHeader } from "../components/header.js";
import { loadFAQ } from "../components/FAQ.js";

// load layout
await loadComponent("header", "/components/header.html");
setActiveNav();
initHeader();
await initMainContent();
await loadComponent(
  "doctorsSection",
  "/components/DoctorSection-ServiceDetail.html",
);
await initDoctorSection();
await loadComponent("contactsSection", "/components/ContactsSection.html");
// Show main page content (service section)
document.getElementById("page-content").classList.remove("hidden");
await loadFAQ();
await loadComponent("footer", "/components/footer.html");
initNewsletter();

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
  const loading = document.getElementById("loading");
  loading.classList.remove("hidden");
  const services = await fetchJson("/services.json");
  loading.classList.add("hidden");
  // Find selected service
  const service = services.find((item) => item.id === id);

  // Redirect if the service does not exist
  if (!service) {
    window.location.href = "services.html";
    return;
  }

  // Cập nhật 4 thẻ Open Graph theo dịch vụ hiện tại
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", `MEDDICAL | ${service.title}`);

  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", service.meta.description);

  document
    .querySelector('meta[property="og:type"]')
    ?.setAttribute("content", "website");

  document
    .querySelector('meta[property="og:url"]')
    ?.setAttribute("content", window.location.href);

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
        class="flex items-center gap-[8px] h-[80px] sm:px-[24px] lg:px-[32px] 
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
                sm:w-[24px] lg:w-[32px]
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
<section class="sm:max-w-[600px] md:max-w-[720px] lg:max-w-[992px] mx-auto">

    <div
        class="
            grid
            min-w-0
            sm:grid-cols-[180px_1fr]
            lg:grid-cols-[240px_1fr]
            sm:gap-[17px]
            lg:gap-[21px]
        "
    >

        <!-- Column 1: Service Menu -->
        <div
            class="
                hidden
                sm:block
                border
                border-primary/20
                rounded-[5px]
                overflow-hidden
                h-fit
            "
        >
            ${serviceMenu}
        </div>

        <!-- Column 2: Content -->
        <div class="min-w-0">

            <img
                src="${service.image}"
                alt="${service.name}"
                class="w-full sm:h-[395px] lg:h-[454px] object-cover"
            >

            <h2
                class="
                    display-2
                    text-primary
                    text-center
                    sm:text-left
                    mt-[15px]
                    lg:mt-[30px]
                "
            >
                ${service.detail.heading}
            </h2>

            <div
                class="
                    grid
                    grid-cols-2
                    gap-x-[20px]
                    gap-y-[16px]
                    mt-[12px]
                    lg:mt-[24px]

                    lg:grid-flow-col
                    lg:grid-rows-2
                    lg:grid-cols-none
                    lg:auto-cols-max
                    lg:gap-x-[40px]
                "
            >
                ${keywords}
            </div>

            <div
                class="
                    space-y-[6px]
                    lg:space-y-[8px]
                    mt-[12px]
                    lg:mt-[24px]
                "
            >

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
// nút back
document.getElementById("back-btn").addEventListener("click", () => {
  history.back();
});
