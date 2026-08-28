import { fetchJson } from "../js/common.js";
import { icons } from "../js/icons.js";

export async function loadServices() {
  const container = document.getElementById("servicecard");
  container.innerHTML = `<p>Loading...</p>`;
  const services = await fetchJson("/services.json");
  

  let html = "";

  services.forEach((service) => {
    html += `
      <section
        class="group relative w-full overflow-hidden rounded-[5px] border border-primary/10 bg-white lg:h-[552px]"
      >

        <!-- ========== 1. IMAGE SECTION ========== -->
        <div class="relative h-[250px] md:h-[300px] overflow-hidden">
          <div id="loading" class="hidden w-full text-center py-10">
          Loading ...
        </div>
          <!-- Image -->
          <img
            src="${service.image}"
            alt="${service.title}"
            class="h-full w-full object-cover"
          />

          <!-- Hover Layer (with large icon) -->
          <div
            class="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            <div
                class="w-[48px] h-[48px] text-accent"
                aria-hidden="true"
            >
                ${icons[service.icon]}
            </div>
          </div>

        </div>

        <!-- ========== 2. CIRCLE ICON (small icon)========== -->
        <div
          class="absolute right-[20px] top-[220px] md:top-[260px] flex h-[60px] w-[60px] md:h-[80px] md:w-[80px] items-center justify-center rounded-full bg-primary transition-all duration-300 group-hover:opacity-0"
        >
          <div
              class="w-[26px] h-[26px] text-accent"
              aria-hidden="true"
          >
              ${icons[service.icon]}
          </div>
        </div>

        <!-- ========== 3. CONTENT SECTION ========== -->
        <div class="px-[15px] md:px-[20px] pt-[24px] md:pt-[56px] pb-[16px] md:pb-[32px]">

          <!-- Title -->
          <h3 class="title text-primary">
            ${service.title}
          </h3>

          <!-- Body -->
          <p class="body mt-[8px] leading-[22px] text-black">
            ${service.body}
          </p>

          <!-- Link -->
          <a
            href="ServiceDetail.html?id=${service.id}"
            class="body mt-[16px] inline-flex items-center gap-[10px] text-secondary transition-colors hover:text-primary"
          >
            Learn More

            <svg width="13" height="12" viewBox="0 0 13 12" fill="none"         xmlns="http://www.w3.org/2000/svg">
              <path d="M7.21795 1L11.8333 6L7.21795 11M11.8333 6H1" stroke="#1F2B6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

          </a>

        </div>

      </section>
    `;
  });

  container.innerHTML = html;
}
