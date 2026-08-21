import "../css/main.css";
import { loadComponent, setActiveNav } from "../js/common";
import { loadSubHeader } from "../components/SubHeader.js";
import { initNewsSection } from "../components/NewsSection.js";
import { initNewsletter } from "../components/NewsLetter.js";
import { initHeader } from "../components/header.js";

// Load layout
await loadComponent("header", "/components/header.html");
setActiveNav();
initHeader();
await loadSubHeader("contact");
await loadComponent("mapview", "/components/mapview.html");
addSubmitContactFormEvent();
await loadComponent("newssection", "/components/NewsSection.html");
initNewsSection();

// Show main page content (contact form)
document.getElementById("page-content").classList.remove("hidden");
await loadComponent("footer", "/components/footer.html");
initNewsletter();

// ADD-SUBMIT-EVENT FUNCTION (save contact form data in local storage)
function addSubmitContactFormEvent() {
  // Validate form
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Add press Enter to submit (in contact message)
  const messageInput = document.getElementById("contactMessage");
  messageInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  // Submit event
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    // Validate fields
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Read old data
    const contacts = JSON.parse(localStorage.getItem("contactFormData")) || [];

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
    localStorage.setItem("contactFormData", JSON.stringify(contacts));
    alert("Your message has been sent!");
    form.reset();
  });
}
