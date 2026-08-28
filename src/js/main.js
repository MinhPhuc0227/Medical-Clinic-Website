import "../css/main.css";
import { loadComponent, setActiveNav } from "./common.js";
import { initNewsletter } from "../components/NewsLetter.js";


async function init() {
  await loadComponent("header", "/src/components/Header.html");
  await setActiveNav();
 
  await loadComponent("footer", "/src/components/Footer.html");
  await initNewsletter();
  window.addEventListener("hashchange", async () => {
    await router();
    await initNewsletter();
  });
}

init();
