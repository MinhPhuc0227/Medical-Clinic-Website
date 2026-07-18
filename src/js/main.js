import "../css/main.css";
import { loadComponent, loadSubHeader, setActiveNav } from "./common.js";
import { router } from "./router.js";

async function init() {
  await loadComponent("header", "/src/components/Header.html");
  await loadComponent("footer", "/src/components/Footer.html");

  await router();
  await setActiveNav();
  window.addEventListener("hashchange", router);
}

init();
