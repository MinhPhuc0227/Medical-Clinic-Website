export function createMiniNews(news) {
  return `
  <a
      href="/NewsDetail.html?id=${news.id}"
      class="flex w-full gap-4 rounded-lg hover:shadow-lg transition"
    >  
  <div class="flex items-center gap-[10px] w-[274px] h-[60px]">
      <img
   src="${news.image}"
   loading="lazy"
  onerror="this.onerror=null; this.src='/han/News1.webp';"
        alt="${news.title}"
        class="w-[60px] h-[60px] object-cover rounded-sm flex-shrink-0"
      />

      <div class="flex flex-col justify-center">
        <p class="text-secondary small-2 leading-[14px]">
          ${news.date}
        </p>

        <h3 class="small-1 text-primary text-[16px] leading-[20px]  line-clamp-2">
          ${news.title}
        </h3>
      </div>
    </div>
    </a>
  `;
}
