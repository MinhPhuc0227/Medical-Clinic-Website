// load component
export async function loadComponent(id, file) {
  const response = await fetch(file);

  if (!response.ok) {
    throw new Error(`Cannot load ${file}`);
  }

  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

export async function fetchJson(path) {
  const response = await fetch(path);
  return await response.json();
}

// // set active navigation bar tab
// export function setActiveNav() {
//   const currentPage = window.location.pathname.split("/").pop();

//   document.querySelectorAll(".nav-link").forEach((link) => {
//     const linkPage = link.getAttribute("href").split("/").pop();

//     if (linkPage === currentPage) {
//       link.classList.add("text-accent");
//     }
//   });
// }

export function setActiveNav() {
  let currentPage = window.location.pathname.split("/").pop() || "index.html";
  // Nếu đang ở trang News Detail thì vẫn active menu News
  if (currentPage === "NewsDetail.html") {
    currentPage = "News.html";
  }
  if (currentPage === "ServiceDetail.html") {
    currentPage = "Services.html";
  }
  if (currentPage === "SpecialtyDetail.html") {
    currentPage = "index.html";
  }
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("text-accent");

    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("text-accent");
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

  if (
    t.includes("doctor") ||
    t.includes("nurse") ||
    t.includes("hospital") ||
    t.includes("clinic")
  ) {
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
