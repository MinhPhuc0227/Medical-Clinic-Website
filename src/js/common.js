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
