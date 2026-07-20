import "../css/main.css";
import { loadComponent, setActiveNav } from "./common.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { router } from "./router.js";

async function init() {
  await loadComponent("header", "/src/components/Header.html");
  await setActiveNav();
  await router();
  await loadComponent("footer", "/src/components/Footer.html");
  await initNewsletter();
  window.addEventListener("hashchange", async () => {
    await router();
    await initNewsletter();
  });
}

init();
