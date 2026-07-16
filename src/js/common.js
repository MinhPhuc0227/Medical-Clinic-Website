// load component
export async function loadComponent(id, file) {
  const response = await fetch(file);

  if (!response.ok) {
    throw new Error(`Cannot load ${file}`);
  }

  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

// load subheader
export async function loadSubHeader(page) {
  const response = await fetch("/subheader.json");
  const subHeaders = await response.json();

  const data = subHeaders[page];

  document.getElementById("subheader-title").textContent = data.title;
  document.getElementById("subheader-breadcrumb").textContent = data.breadcrumb;
  document.getElementById("subheader-image").src = data.image;
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
  let currentPage = window.location.pathname.split("/").pop();

  // Nếu đang ở trang chủ "/"
  if (currentPage === "") {
    currentPage = "index.html";
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("text-accent");
    }
  });
}
