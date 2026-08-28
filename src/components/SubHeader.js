import { fetchJson } from "../js/common.js";

export async function loadSubHeader(page) {
  const container = document.getElementById("subheader");
  container.innerHTML = `<p>Loading...</p>`;
  const subHeaders = await fetchJson("/subheaders.json");
  const data = subHeaders[page];

  if (!data) {
    window.location.href = "/service.html";
    return;
  }

  container.innerHTML = `
    <section class="relative w-full h-[140px] md:h-[180px] lg:h-[250px] overflow-hidden">
    <!-- Background Image -->
      <img
        src="${data.image}"
        alt="${data.title}"
        fetchpriority="high"
        width="1366"
        height="250"
        class="absolute inset-0 w-full h-full object-cover object-[center_30%]"
      />

      <!-- White Overlay -->
      <div class="absolute inset-0 bg-white/50"></div>

      <!-- Left Circle -->
      <div
        class=" absolute rounded-full bg-secondary opacity-30

    w-[140px] h-[140px]
    -left-[70px] -top-[70px]

    md:w-[180px] md:h-[180px]
    md:-left-[90px] md:-top-[90px]

    lg:w-[239px] lg:h-[239px]
    lg:-left-[119px] lg:-top-[119px]"
      ></div>

      <!-- Right Circle -->
      <div
        class="absolute rounded-full bg-accent opacity-50

    w-[150px] h-[150px]
    -right-[75px] -bottom-[75px]

    md:w-[190px] md:h-[190px]
    md:-right-[95px] md:-bottom-[95px]

    lg:w-[256px] lg:h-[256px]
    lg:-right-[128px] lg:-bottom-[128px]"
      ></div>

      <!-- Content -->
      <div
        class="relative z-10 
        max-w-[320px] md:max-w-[720px] lg:max-w-[992px] mx-auto h-full leading-none -translate-y-[10px] flex flex-col justify-center"
      >
        <p class="body-2 text-primary ">
          ${data.breadcrumb}
        </p>

        <h1 class="display-1 text-primary leading-[55px]">
          ${data.title}
        </h1>
      </div>

      <!-- Bottom Color Strip -->
      <div class="absolute bottom-0 left-0 flex w-full h-[4px] md:h-[6px] lg:h-[8px]">
        <div class="flex-[305.7_305.7_0%] bg-accent"></div>
        <div class="flex-[837.23_837.23_0%] bg-primary"></div>
        <div class="flex-[223.08_223.08_0%] bg-secondary"></div>
      </div>
    </section>
  `;
}

export function loadNewsSubHeader(article) {
  const container = document.getElementById("newsSubheader");

  container.innerHTML = `
    <section class="relative w-full h-[140px] md:h-[180px] lg:h-[250px] overflow-hidden">

      <img
        src="phuc/artemis-disney-130341_1256-aletha-maybank-naeemah-ghafur-myiesha-taylor_1.webp"
        alt="${article.title}"
        width="1366"
        height="250"
        class="absolute inset-0 w-full h-full object-cover object-[center_30%]"
      />
<!-- White Overlay -->
      <div class="absolute inset-0 bg-white/50"></div>
      <!-- Left Circle -->
      <div class=" absolute rounded-full bg-secondary opacity-30

    w-[140px] h-[140px]
    -left-[70px] -top-[70px]

    md:w-[180px] md:h-[180px]
    md:-left-[90px] md:-top-[90px]

    lg:w-[239px] lg:h-[239px]
    lg:-left-[119px] lg:-top-[119px]"    
      ></div>

      <!-- Right Circle -->
      <div class="absolute rounded-full bg-accent opacity-50

    w-[150px] h-[150px]
    -right-[75px] -bottom-[75px]

    md:w-[190px] md:h-[190px]
    md:-right-[95px] md:-bottom-[95px]

    lg:w-[256px] lg:h-[256px]
    lg:-right-[128px] lg:-bottom-[128px]"
          ></div>

      <!-- Content -->
      <div
        class="relative h-full z-10 max-w-[320px] md:max-w-[720px] lg:max-w-[992px] mx-auto h-full leading-none -translate-y-[10px] flex flex-col justify-center"
"
      >
        <p class="body-2 leading-none text-primary  ">
          Home / News / ${article.category}
        </p>

        <h1 class="display-1 leading-none text-primary line-clamp-1  ">
          ${article.title}
        </h1>

        <div class="flex items-center gap-4 lg:gap-6 body-2 text-primary">

          <div class="flex items-center gap-1.5 md:gap-2">
            <svg class="w-[10px] h-[12px]  lg:w-[18px] lg:h-[20px]" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.2222 2.77783H2.77778C1.79594 2.77783 1 3.57377 1 4.55561V17.0001C1 17.9819 1.79594 18.7778 2.77778 18.7778H15.2222C16.2041 18.7778 17 17.9819 17 17.0001V4.55561C17 3.57377 16.2041 2.77783 15.2222 2.77783Z" stroke="#1F2B6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5557 1V4.55556" stroke="#1F2B6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.44434 1V4.55556" stroke="#1F2B6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 8.11108H17" stroke="#1F2B6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            <span class="text-black">${article.date}</span>
          </div>

          <div class="flex items-center gap-1.5 md:gap-2">
            <svg class="w-[10px] h-[12px] lg:w-[18px] lg:h-[20px]" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#159EEC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="#159EEC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            <span class="text-black">${article.author}</span>
          </div>

          <div class="flex items-center gap-1.5 md:gap-2">
            <svg class="w-[14px] h-[8px] lg:w-[18px] lg:h-[12px]" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.73755 0.75C5.9541 0.75 3.09886 2.361 0.851101 5.58301C0.786942 5.67599 0.751782 5.7859 0.750066 5.89886C0.74835 6.01181 0.780154 6.12274 0.841459 6.21763C2.56853 8.92108 5.38555 11.0353 8.73755 11.0353C12.0531 11.0353 14.928 8.91465 16.6583 6.20513C16.7182 6.1121 16.75 6.00381 16.75 5.89318C16.75 5.78255 16.7182 5.67425 16.6583 5.58122C14.9241 2.90277 12.0281 0.75 8.73755 0.75Z" stroke="#526AE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.7496 8.74969C10.3275 8.74969 11.6066 7.47056 11.6066 5.89267C11.6066 4.31478 10.3275 3.03564 8.7496 3.03564C7.17171 3.03564 5.89258 4.31478 5.89258 5.89267C5.89258 7.47056 7.17171 8.74969 8.7496 8.74969Z" stroke="#526AE9" stroke-width="1.5" stroke-miterlimit="10"/>
</svg>

            <span class="text-black">${article.views}</span>
          </div>

          <div class="flex items-center gap-1.5 md:gap-2">
            <svg class="w-[9px] h-[8px] lg:w-[16px] lg:h-[15px]" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5413 1.50364C13.6931 0.653189 12.5686 0.134124 11.3712 0.0402036C10.1737 -0.0537164 8.98209 0.283702 8.01163 0.99151C6.9935 0.234227 5.72624 -0.109161 4.46507 0.030495C3.20389 0.170151 2.04247 0.782479 1.21468 1.74417C0.386899 2.70586 -0.0457584 3.94548 0.0038373 5.21339C0.053433 6.48131 0.581598 7.68335 1.48197 8.57744L6.45124 13.5547C6.86736 13.9642 7.42779 14.1938 8.01163 14.1938C8.59547 14.1938 9.15591 13.9642 9.57203 13.5547L14.5413 8.57744C15.4756 7.63741 16 6.36589 16 5.04054C16 3.71518 15.4756 2.44367 14.5413 1.50364ZM13.413 7.47316L8.44374 12.4424C8.38719 12.4995 8.31989 12.5448 8.24572 12.5758C8.17156 12.6067 8.09199 12.6226 8.01163 12.6226C7.93127 12.6226 7.85171 12.6067 7.77754 12.5758C7.70337 12.5448 7.63607 12.4995 7.57952 12.4424L2.61026 7.44915C1.98271 6.80766 1.6313 5.94594 1.6313 5.04854C1.6313 4.15114 1.98271 3.28942 2.61026 2.64793C3.24975 2.01656 4.11222 1.66254 5.01087 1.66254C5.90952 1.66254 6.77199 2.01656 7.41148 2.64793C7.48587 2.72293 7.57437 2.78246 7.67188 2.82309C7.7694 2.86371 7.87399 2.88463 7.97962 2.88463C8.08526 2.88463 8.18985 2.86371 8.28736 2.82309C8.38488 2.78246 8.47338 2.72293 8.54777 2.64793C9.18726 2.01656 10.0497 1.66254 10.9484 1.66254C11.847 1.66254 12.7095 2.01656 13.349 2.64793C13.9852 3.28101 14.3481 4.13806 14.3601 5.03549C14.372 5.93291 14.0321 6.79933 13.413 7.44915V7.47316Z" fill="#E2315C"/>
</svg>

            <span class="text-black">${article.comments}</span>
          </div>

        </div>

      </div>
<!-- Bottom Color Strip -->
      <div class="absolute bottom-0 left-0 flex w-full h-[4px] md:h-[6px] lg:h-[8px]">
        <div class="flex-[305.7_305.7_0%] bg-accent"></div>
        <div class="flex-[837.23_837.23_0%] bg-primary"></div>
        <div class="flex-[223.08_223.08_0%] bg-secondary"></div>
      </div>
    </section>
  `;
}
