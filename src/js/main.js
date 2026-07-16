import "../css/main.css";
import { router } from "./router.js";
import { loadComponent } from "./common.js";

await loadComponent("header", "/src/components/header.html");
await loadComponent("footer", "/src/components/footer.html");

router();
