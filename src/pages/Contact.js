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
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.setAttribute("novalidate", "true");

  // --- HÀM BÁO LỖI ---
  function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);

    if (!inputElement) return;

    inputElement.style.border = "1px solid #ef4444";

    let wrapper = inputElement.parentElement;

    if (!wrapper.classList.contains("custom-error-wrapper")) {
      wrapper = document.createElement("div");

      wrapper.className = "custom-error-wrapper";
      wrapper.style.position = "relative";
      wrapper.style.display = "block";
      wrapper.style.width = "100%";
      wrapper.style.height = "68px";

      inputElement.parentNode.insertBefore(wrapper, inputElement);
      wrapper.appendChild(inputElement);

      inputElement.style.width = "100%";
      inputElement.style.height = "100%";
      inputElement.style.boxSizing = "border-box";
      inputElement.style.paddingBottom = "18px";
    }

    let errorElement = wrapper.querySelector(".form-error-msg");

    if (!errorElement) {
      errorElement = document.createElement("span");

      errorElement.className = "form-error-msg";
      errorElement.style.color = "#ef4444";
      errorElement.style.fontSize = "12px";
      errorElement.style.position = "absolute";
      errorElement.style.bottom = "4px";
      errorElement.style.left = "15px";
      errorElement.style.zIndex = "10";
      errorElement.style.pointerEvents = "none";

      wrapper.appendChild(errorElement);
    }

    errorElement.innerText = message;
  }

  // --- HÀM XÓA LỖI CŨ ---
  function clearErrors() {
    const errorMessages = form.querySelectorAll(".form-error-msg");

    errorMessages.forEach((msg) => {
      msg.innerText = "";
    });

    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.style.border = "";
    });
  }

  // --- SUBMIT ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    clearErrors();

    let isMissingField = false;

    // Check trường rỗng
    if (!name) {
      showError("contactName", "Vui lòng nhập họ và tên.");
      isMissingField = true;
    }

    if (!email) {
      showError("contactEmail", "Vui lòng nhập email.");
      isMissingField = true;
    }

    if (!subject) {
      showError("contactSubject", "Vui lòng nhập chủ đề.");
      isMissingField = true;
    }

    if (isMissingField) {
      return;
    }

    // Kiểm tra định dạng Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) 
      {
        showError("contactEmail", "Email nhập không hợp lệ.");
        return;
      }

    // Read old data
    const contacts =
      JSON.parse(localStorage.getItem("contactFormData")) || [];

    const contact = {
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toLocaleString("sv-SE"),
    };

    contacts.push(contact);

    localStorage.setItem(
      "contactFormData",
      JSON.stringify(contacts),
    );

    alert("Your message has been sent!");

    form.reset();
  });
}
