document.addEventListener("DOMContentLoaded", () => {
  const filterSelects = document.querySelectorAll(".filter-select");
  const exportBox = document.querySelector(".export");

  // === Shared toggle handler ===
  function setupDropdown(container, clickableSelector, activeClass) {
    if (!container) return;

    const clickable = container.querySelector(clickableSelector);
    clickable.addEventListener("click", (e) => {
      e.stopPropagation();

      const isOpen = container.classList.contains(activeClass);

      // Close all other dropdowns
      document
        .querySelectorAll(`.${activeClass}`)
        .forEach((el) => el.classList.remove(activeClass));

      // Toggle current
      if (!isOpen) {
        container.classList.add(activeClass);
      }
    });
  }

  // Setup filters
  filterSelects.forEach((select) => {
    setupDropdown(select, ".clickable-fiter", "offerActiveFilter");
  });

  // Setup export box
  setupDropdown(exportBox, ".clickable-export", "offerActiveFilter");

  // Close all when clicking outside
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".offerActiveFilter")
      .forEach((el) => el.classList.remove("offerActiveFilter"));
  });
});
