const submit_btn = document.getElementById("submit-btn"),
  formMobInput = document.querySelector(".form-mob-input");

/* ========== Load footer ========== */
document.addEventListener("DOMContentLoaded", () => {
  const footerPlaceholder = document.getElementById("footer-section");

  // load footer
  if (footerPlaceholder) {
    fetch("../../components/footer.html")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load footer.html");
        return res.text();
      })
      .then((html) => {
        footerPlaceholder.innerHTML = html;
      })
      .catch((err) => console.error("Error loading footer:", err));
  }
});

/* ========== Misc helpers (logo/footer/submit) ========== */
function insertLogo() {
  const logo = document.createElement("img");
  logo.src = "./assets/images/logo/logo.webp";
  logo.alt = "logoImg";
  const container = document.querySelector(".logo-section");
  if (container) container.appendChild(logo);
}
insertLogo();

function supportFooter() {
  const footer = document.getElementById("support-footer");
  if (!footer) return;
  footer.innerHTML = `
    <div><button>EN</button></div>
    <div>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12.75 8.10338C12.75 7.8441 ..." stroke="black" stroke-width="1.125"/>
        <path d="M5.25 8.10345C5.25 7.77705 ..." stroke="black" stroke-width="1.125"/>
        <path d="M3.75 6.75C3.75 4.26472 ..." stroke="black" stroke-width="1.125"/>
        <path d="M14.25 12.75V13.35 ..." stroke="black" stroke-width="1.125"/>
      </svg>
      <p class="contact">تواصل معنا</p>
    </div>
  `;
}
supportFooter();

function checkPageLocation() {
  if (!submit_btn) return;
  const currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "verfication.html") return;
  submit_btn.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("loc", submit_btn.getAttribute("data-name"));
    sessionStorage.setItem("animatePin", "true");
    window.location.href = "/verfication.html";
  });
}
checkPageLocation();
