export async function loadSubHeader(page) {
  const container = document.getElementById("subheader");
  const response = await fetch("/subheaders.json");
  const subHeaders = await response.json();
  const data = subHeaders[page];

  if (!data) {
    window.location.href = "/service.html";
    return;
  }

  container.innerHTML = `
    <section class="relative w-full h-[250px] overflow-hidden">
      <!-- Background Image -->
      <img
        src="${data.image}"
        alt="${data.title}"
        class="absolute inset-0 w-full h-full object-cover object-[center_30%]"
      />

      <!-- White Overlay -->
      <div class="absolute inset-0 bg-white/50"></div>

      <!-- Left Circle -->
      <div
        class="absolute w-[239px] h-[239px] rounded-full bg-secondary opacity-30 -left-[119px] -top-[119px]"
      ></div>

      <!-- Right Circle -->
      <div
        class="absolute w-[256px] h-[256px] rounded-full bg-accent opacity-50 -right-[128px] -bottom-[128px]"
      ></div>

      <!-- Content -->
      <div
        class="relative z-10 max-w-[1366px] mx-auto h-full px-[187px] flex flex-col justify-center"
      >
        <p class="body-2 text-primary mb-[8px]">
          ${data.breadcrumb}
        </p>

        <h1 class="display-1 text-primary">
          ${data.title}
        </h1>
      </div>

      <!-- Bottom Color Strip -->
      <div class="absolute bottom-0 left-0 flex w-full h-[8px]">
        <div class="flex-[305.7_305.7_0%] bg-accent"></div>
        <div class="flex-[837.23_837.23_0%] bg-primary"></div>
        <div class="flex-[223.08_223.08_0%] bg-secondary"></div>
      </div>
    </section>
  `;
}
