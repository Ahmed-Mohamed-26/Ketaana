// search.js
document.addEventListener("DOMContentLoaded", () => {
  const selectContainers = document.querySelectorAll(".select-container");

  function closeAllSelects(except = null) {
    selectContainers.forEach((container) => {
      if (container === except) return;
      const ul = container.querySelector("ul");
      const icon = container.querySelector(".form-icon-action");
      if (ul) {
        ul.style.maxHeight = "0";
        ul.style.opacity = "0";
      }
      container.classList.remove("active");
      if (icon) icon.style.transform = "rotate(0deg)";
    });
  }

  selectContainers.forEach((container) => {
    const inputWrapper = container.querySelector(".input-value");
    const ul = container.querySelector("ul");
    const icon = container.querySelector(".form-icon-action");

    if (ul) {
      ul.style.maxHeight = "0";
      ul.style.overflowY = "auto";
      ul.style.opacity = "0";
      ul.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
    }
    if (icon) icon.style.transition = "transform 0.3s ease";

    inputWrapper?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!ul) return;
      if (container.classList.contains("active")) {
        ul.style.maxHeight = "0";
        ul.style.opacity = "0";
        container.classList.remove("active");
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        closeAllSelects(container);
        ul.style.maxHeight = "92px";
        ul.style.opacity = "1";
        container.classList.add("active");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });

    ul?.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => {
        const input = container.querySelector("input");
        if (input) input.value = li.textContent;
        ul.style.maxHeight = "0";
        ul.style.opacity = "0";
        container.classList.remove("active");
        if (icon) icon.style.transform = "rotate(0deg)";
      });
    });
  });

  document.addEventListener("click", closeAllSelects);
});
