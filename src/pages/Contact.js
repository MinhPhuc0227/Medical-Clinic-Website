import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { loadFAQ } from "../components/FAQ.js";
import { initNewsSection } from "../components/NewsSection.js";
import { initNewsletter } from "../components/NewsLetter.js";

// Load layout
await loadComponent("header", "/src/components/header.html");
await setActiveNav();
await loadSubHeader("contact");
await loadComponent("mapview", "/src/components/mapview.html");
// Show main page content (contact form)
document.getElementById("page-content").classList.remove("hidden");
addSubmitContactFormEvent();
await loadComponent("newssection", "/src/components/NewsSection.html");
await initNewsSection();
await loadFAQ();
await loadComponent("footer", "/src/components/footer.html");
await initNewsletter();

// ADD-SUBMIT-EVENT FUNCTION (save contact form data in local storage)
function addSubmitContactFormEvent() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    // Validate
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Read old data
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // New object
    const contact = {
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toLocaleString("sv-SE"),
    };

    contacts.push(contact);

    // Save
    localStorage.setItem("contacts", JSON.stringify(contacts));
    alert("Your message has been sent!");
    form.reset();
  });
}
