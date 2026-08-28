// Value of attribute "d" in SVG tag (path to draw down chevron & up chevron)
const CHEVRON_DOWN = "M19 9l-7 7-7-7";
const CHEVRON_UP = "M5 15l7-7 7 7";

// Load FAQ Section
export async function loadFAQ() {
  const container = document.getElementById("faq");

  container.innerHTML = `
    <section class="max-w-[310px] sm:max-w-[620px] lg:max-w-[992px] mx-auto py-[48px] lg:py-[64px]">

      <!-- TITLE - DESCRIPTION -->
      <div class="text-center mb-5 sm:mb-10">
        <h2 class="display-2 text-primary">
          Frequently Asked Questions
        </h2>

        <p class="body text-primary mt-2">
          Find answers to the most common questions about our services.
        </p>
      </div>

      <!-- FAQ LIST -->
      <div id="faq-list" class="space-y-2 md:space-y-3 lg:space-y-4"></div>

    </section>
  `;

  const faqList = document.getElementById("faq-list");

  faqList.innerHTML = `
    <div class="flex justify-center items-center py-10">
      <div class="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      <span class="ml-3 text-gray-500 body">Loading FAQs...</span>
    </div>
  `;

  try {
    const response = await fetch("/faqs.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const faqs = await response.json();

    let html = "";
    faqs.forEach((faq) => {
      html += `
        <div class="faq-item border border-gray-200 rounded-xl overflow-hidden">
          <button class="faq-btn w-full flex items-center justify-between px-6 py-5 text-left transition-colors">
            <span class="body font-semibold text-black transition-colors">
              ${faq.question}
            </span>
            <svg class="faq-icon w-5 h-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path class="faq-icon-path transition-all" stroke-linecap="round" stroke-linejoin="round" d="${CHEVRON_DOWN}" />
            </svg>
          </button>
          <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
            <div class="px-6 pb-6">
              <p class="body text-black">
                ${faq.answer}
              </p>
            </div>
          </div>
        </div>
      `;
    });

    faqList.innerHTML = html;
    initFAQ();
  } catch (error) {
    console.error("Failed to load FAQs:", error);
    faqList.innerHTML = `
      <div class="text-center py-8"> <p class="body text-black"> Unable to load FAQs. Please try again later. </p> </div>
    `;
  }
}

// Function init FAQ (add close/open state)
function initFAQ() {
  document.querySelectorAll(".faq-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      const content = item.querySelector(".faq-content");
      const iconPath = item.querySelector(".faq-icon-path");

      const opened =
        content.style.maxHeight && content.style.maxHeight !== "0px";

      document.querySelectorAll(".faq-item").forEach((faq) => {
        faq.querySelector(".faq-content").style.maxHeight = "0px";
        faq.querySelector(".faq-icon-path").setAttribute("d", CHEVRON_DOWN);
        faq.classList.remove("border-primary");

        const title = faq.querySelector("span");
        title.classList.remove("text-primary");
        title.classList.add("text-black");
      });

      if (!opened) {
        content.style.maxHeight = content.scrollHeight + "px";
        iconPath.setAttribute("d", CHEVRON_UP);
        item.classList.add("border-primary");

        const title = item.querySelector("span");
        title.classList.remove("text-black");
        title.classList.add("text-primary");
      }
    });
  });
}
