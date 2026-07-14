class MyButton extends HTMLElement {
  connectedCallback() {
    const text = this.textContent;

    this.innerHTML = `
      <button class="btn-primary">
        ${text}

        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.21795 1L11.8333 6L7.21795 11M11.8333 6H1"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    `;
  }
}

customElements.define("btn-icon", MyButton);

class LinkButton extends HTMLElement {
  connectedCallback() {
    const text = this.textContent.trim();
    const href = this.getAttribute("href") || "#";

    this.innerHTML = `
      <a href="${href}" class="body text-secondary" >
        ${text}
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.21795 1L11.8333 6L7.21795 11M11.8333 6H1"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    `;
  }
}

customElements.define("btn-link", LinkButton);

export function createButton(text, id) {
  return `
       <button
      class="btn-primary footer-2"
      data-id="${id}"
    >
      <span>${text}</span>

      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.21795 1L11.8333 6L7.21795 11M11.8333 6H1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  `;
}
