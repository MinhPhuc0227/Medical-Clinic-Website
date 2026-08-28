// load component
export async function loadComponent(id, file) {
  const response = await fetch(file);

  if (!response.ok) {
    throw new Error(`Cannot load ${file}`);
  }

  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}
export async function fetchJson(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export function setActiveNav() {
  let currentPage = window.location.pathname.split("/").pop() || "index.html";

  currentPage = currentPage.toLowerCase();

  // Gom nhóm các trang Detail về trang chính
  if (currentPage === "newsdetail.html") currentPage = "news.html";
  if (currentPage === "servicedetail.html") currentPage = "services.html";
  if (currentPage === "doctordetail.html") currentPage = "doctors.html";
  if (currentPage === "specialtydetail.html") currentPage = "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    // Xóa trạng thái cũ
    link.classList.remove(
      "text-accent",
      "text-primary",
      "text-white",
      "font-semibold",
    );

    const href = link.getAttribute("href");
    if (!href) return;

    const linkPage = href.split("/").pop().toLowerCase();

    if (linkPage === currentPage) {
      // Active
      link.classList.add("text-primary", "md:text-accent", "font-semibold");
    } else {
      // Không active
      link.classList.add("text-primary", "md:text-white");
    }
  });
}

function getCategory(title) {
  const t = title.toLowerCase();

  if (
    t.includes("surgery") ||
    t.includes("operation") ||
    t.includes("transplant")
  ) {
    return "Surgery";
  }

  if (t.includes("doctor") || t.includes("nurse") || t.includes("hospital")) {
    return "Professional";
  }

  if (
    t.includes("medicine") ||
    t.includes("medical") ||
    t.includes("treatment") ||
    t.includes("therapy") ||
    t.includes("patient")
  ) {
    return "Medical";
  }

  return "Health Care";
}

export async function getNews() {
  const API_KEY = "393286089051475a92bee89d2e60bea3";
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${API_KEY}`,
  );

  const data = await response.json();
  //lọc bài có đủ thành phần
  const newsList = data.articles.filter(
    (article) =>
      article.urlToImage &&
      article.title &&
      article.description &&
      article.content,
  );
  const blockedDomains = [
    "marthastewart.com",
    "usatoday.com",
    "verywellhealth.com",
    "eatingwell.com",
    "floridatoday.com",
    "media.cnn.com",
    "cnn.com",
    "washingtonpost.com",
    "sciencealert.com",
    "health.com",
    "medicalnewstoday.com",
    "medscape.com",
  ];
  //lọc bỏ bài có nguồn chặn ảnh
  const newsData = newsList.map((item, index) => {
    const useDefaultImage =
      !item.urlToImage ||
      blockedDomains.some((domain) => item.urlToImage.includes(domain));

    return {
      id: index + 1,
      title: item.title,
      author:
        item.author && !item.author.startsWith("http")
          ? item.author
          : "Justin Bieber",
      description: item.description,
      image: useDefaultImage ? "/han/News1.webp" : item.urlToImage,
      date: item.publishedAt,
      content: item.content,
      url: item.url,
      views: Math.floor(Math.random() * 5000),
      comments: Math.floor(Math.random() * 200),
      category: getCategory(item.title),
    };
  });

  return newsData;
}
