export function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("newsletterEmail");
  const message = document.getElementById("newsletterMessage");

  // ===== CHECK IF FOOTER IS LOADED (TO PREVENT CRASHING)
  if (!form || !emailInput || !message) {
    return;
  }

  // ===== ADD EVENT LISTENER FOR NEWSLETTER FORM: Run the function when the form is submitted
  form.addEventListener("submit", function (event) {
    // Prevent the default action (e.g. reloading the page)
    event.preventDefault();
    // Call subsribe newsletter function (below)
    subscribeNewsletter();
  });

  // ===== SUBSCRIBE NEWSLETTER FUNCTION (MAIN)
  function subscribeNewsletter() {
    const email = emailInput.value.trim();

    // 1. VALID INPUT CHECK

    // Empty check
    if (email === "") {
      showMessage("Please enter your email address.", "red");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "red");
      return;
    }

    // 2. EXISTED CHECK

    // Read localStorage
    const subscribers =
      JSON.parse(localStorage.getItem("newsletterSubscribers")) || [];

    // Check email existed or not (in local storage)
    const existed = subscribers.some(
      (subscriber) => subscriber.email.toLowerCase() === email.toLowerCase(),
    );

    if (existed) {
      showMessage("You are already subscribed to our newsletter.", "orange");
      return;
    }

    // 3. CREATE NEW SUBSCRIBER

    // Create
    const newSubscriber = {
      id: subscribers.length + 1,
      email: email,
      createdAt: new Date().toLocaleString("vi-VN"),
    };

    // Save to localstorage
    subscribers.push(newSubscriber);
    localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));

    // Show message
    showMessage(
      "Thank you! You have successfully subscribed to our newsletter.",
      "limegreen",
    );

    // Reset form
    emailInput.value = "";
    emailInput.focus();
  }

  // ===== SHOW MESSAGE FUNCTION
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
