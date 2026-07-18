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

// load subheader
export async function loadSubHeader(page) {
  //const response = await fetch("/subheader.json");
  //const subHeaders = await response.json();
  //const data = subHeaders[page];
  // tự dô trang nào thì gọi fetch trang đấy
  // const subHeaders = await fetchJson("/subheader.json");
  //loadSubHeader(subHeaders.news);
  document.getElementById("subheader-title").textContent = page.title;
  document.getElementById("subheader-breadcrumb").textContent = page.breadcrumb;
  document.getElementById("subheader-image").src = page.image;
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
  const currentHash = window.location.hash || "#home";

  document.querySelectorAll(".nav-link").forEach((link) => {
    // Xóa màu active cũ
    link.classList.remove("text-accent");

    // Nếu href trùng với hash hiện tại thì active
    if (link.getAttribute("href") === currentHash) {
      link.classList.add("text-accent");
    }
  });
}
