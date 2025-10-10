// guard for services pagination init
let servicesPaginationInitialized = false;

function initServicesPagination() {
  if (servicesPaginationInitialized) return;

  const servicesBrandContainer =
    document.querySelector("#services-section .services-brand-container") ||
    document.querySelector(".services-brand-container");
  if (!servicesBrandContainer) return;

  const ul = servicesBrandContainer.querySelector("ul");
  if (!ul) return;

  const items = Array.from(ul.querySelectorAll("li"));
  if (!items.length) return;

  const categoryContainer = document.querySelector(
    ".service-category-container"
  );
  const factoryContainer = document.querySelector(".service-factory-container");

  // find pagination arrows
  const arrowSpans = Array.from(
    document.querySelectorAll(
      "#services-section .services-pagination-holder span, .services-pagination-holder span"
    )
  );

  let arrowLeft = null;
  let arrowRight = null;

  arrowSpans.forEach((span) => {
    const icon = span.querySelector("i");
    if (!icon) return;
    if (icon.classList.contains("fa-chevron-left")) arrowLeft = span;
    if (icon.classList.contains("fa-chevron-right")) arrowRight = span;
  });

  if (!arrowLeft && arrowSpans[0]) arrowLeft = arrowSpans[0];
  if (!arrowRight && arrowSpans[1]) arrowRight = arrowSpans[1];

  let activeIndex = 0;

  function normalizeIndex(idx) {
    return ((idx % items.length) + items.length) % items.length;
  }

  function resetCategoryAndFactory() {
    if (categoryContainer) {
      categoryContainer.classList.remove("show");
      categoryContainer
        .querySelectorAll("li")
        .forEach((c) => c.classList.remove("active"));
    }
    if (factoryContainer) {
      factoryContainer.classList.remove("show");
      factoryContainer
        .querySelectorAll("li")
        .forEach((f) => f.classList.remove("active"));
    }
  }

  function setActive(index, center = false) {
    index = normalizeIndex(index);
    items.forEach((li, i) => li.classList.toggle("active", i === index));
    activeIndex = index;

    const activeItem = items[activeIndex];
    if (!activeItem) return;

    if (center) {
      try {
        const containerRect = servicesBrandContainer.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const currentScroll = servicesBrandContainer.scrollLeft;

        const offset =
          itemRect.left -
          containerRect.left -
          (containerRect.width / 2 - itemRect.width / 2);

        servicesBrandContainer.scrollTo({
          left: currentScroll + offset,
          behavior: "smooth",
        });
      } catch (err) {
        console.debug("scroll centering failed", err);
      }
    }

    if (activeItem.textContent.trim() !== "الكل") {
      if (categoryContainer) categoryContainer.classList.add("show");
    } else {
      resetCategoryAndFactory();
    }
  }

  // default first item active
  setActive(0, false);

  // arrow clicks (reversed)
  if (arrowLeft)
    arrowLeft.addEventListener("click", (e) => {
      e.preventDefault();
      setActive(activeIndex + 1, true); // left arrow → right
    });
  if (arrowRight)
    arrowRight.addEventListener("click", (e) => {
      e.preventDefault();
      setActive(activeIndex - 1, true); // right arrow → left
    });

  // brand item clicks
  items.forEach((li, i) =>
    li.addEventListener("click", () => setActive(i, true))
  );

 // category -> factory interactions
if (categoryContainer) {
  const catItems = categoryContainer.querySelectorAll("li");
  catItems.forEach((li) => {
    li.addEventListener("click", () => {
      catItems.forEach((c) => c.classList.remove("active"));
      li.classList.add("active");

      if (factoryContainer) {
        if (li.textContent.trim() === "تجاري") {
          factoryContainer.classList.add("show"); 
        } else {
          factoryContainer.classList.remove("show"); 
        }
      }
    });
  });
}

  // factory click interactions
  if (factoryContainer) {
    const factItems = factoryContainer.querySelectorAll("li");
    factItems.forEach((li) => {
      li.addEventListener("click", () => {
        factItems.forEach((f) => f.classList.remove("active"));
        li.classList.add("active");
      });
    });
  }

  // keyboard support
  ul.setAttribute("tabindex", "0");
  ul.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") setActive(activeIndex + 1, true);
    if (e.key === "ArrowLeft") setActive(activeIndex - 1, true);
  });

  servicesPaginationInitialized = true;
  console.debug("initServicesPagination: completed");
}

/* ========== Load filteration component into #filter-container ========== */
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("filter-container");
  if (!wrapper) {
    console.debug("filteration.js: no #filter-container found on this page");
    return;
  }

  fetch("../../components/filteration.html")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load filteration.html");
      return res.text();
    })
    .then((html) => {
      wrapper.innerHTML = html;

      // ensure DOM is ready before init
      requestAnimationFrame(() => {
        initServicesPagination();
      });
    })
    .catch((err) => {
      console.error("Error loading filteration:", err);
      initServicesPagination();
    });
});
