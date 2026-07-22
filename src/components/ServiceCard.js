export async function loadServices() {
  const container = document.getElementById("servicecard");
  const response = await fetch("/services.json");
  const services = await response.json();

  let html = "";

  services.forEach((service) => {
    html += `
      <section
        class="group relative w-full max-w-[317px] overflow-hidden rounded-[5px] border border-primary/10 bg-white"
      >

        <!-- ========== 1. IMAGE SECTION ========== -->
        <div class="relative h-[300px] overflow-hidden">

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
            <img
              src="${service.activeIcon}"
              class="w-[48px] h-[48px]"
              alt="${service.title}"
            />
          </div>

        </div>

        <!-- ========== 2. CIRCLE ICON (small icon)========== -->
        <div
          class="absolute right-[20px] top-[260px] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-primary transition-all duration-300 group-hover:opacity-0"
        >
          <img
            src="${service.activeIcon}"
            class="w-[26px] h-[26px]"
            alt="${service.title}"
          />
        </div>

        <!-- ========== 3. CONTENT SECTION ========== -->
        <div class="px-[20px] pt-[56px] pb-[32px]">

          <!-- Title -->
          <h3 class="title text-primary">
            ${service.title}
          </h3>

          <!-- Body -->
          <p class="body mt-[8px] leading-[140%] text-black">
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
