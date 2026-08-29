export function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("newsletterEmail");
  const message = document.getElementById("newsletterMessage");

  // CHECK IF FOOTER IS LOADED
  if (!form || !emailInput || !message) {
    return;
  }

  // SUBMIT EVENT
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    subscribeNewsletter();
  });

  // SUBSCRIBE NEWSLETTER FUNCTION
  function subscribeNewsletter() {
    const email = emailInput.value.trim();

    // Reset trạng thái trước khi kiểm tra
    emailInput.setAttribute("aria-invalid", "false");

    // 1. VALID INPUT CHECK

    // Empty check
    if (email === "") {
      emailInput.setAttribute("aria-invalid", "true");
      showMessage("Please enter your email address.", "red");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      emailInput.setAttribute("aria-invalid", "true");
      showMessage("Please enter a valid email address.", "red");
      return;
    }

    // 2. EXISTED CHECK
    const subscribers =
      JSON.parse(localStorage.getItem("newsLetterData")) || [];

    const existed = subscribers.some(
      (subscriber) =>
        subscriber.email.toLowerCase() === email.toLowerCase(),
    );

    if (existed) {
      // Email hợp lệ về định dạng nên không phải input invalid
      emailInput.setAttribute("aria-invalid", "false");

      showMessage(
        "You are already subscribed to our newsletter.",
        "orange",
      );

      return;
    }

    // 3. CREATE NEW SUBSCRIBER
    const newSubscriber = {
      id: crypto.randomUUID(),
      email: email,
      createdAt: new Date().toLocaleString("vi-VN"),
    };

    subscribers.push(newSubscriber);

    localStorage.setItem(
      "newsLetterData",
      JSON.stringify(subscribers),
    );

    // Email hợp lệ
    emailInput.setAttribute("aria-invalid", "false");

    showMessage(
      "Thank you! You have successfully subscribed to our newsletter.",
      "limegreen",
    );

    // Reset form
    emailInput.value = "";
    emailInput.focus();
  }

  // SHOW MESSAGE FUNCTION
  function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;

    clearTimeout(message.timer);

    // Clear message after 3s
    message.timer = setTimeout(() => {
      message.textContent = "";
    }, 3000);
  }
}