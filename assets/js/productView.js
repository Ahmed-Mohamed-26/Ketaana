// productView.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productName =
    params.get("product") ||
    (() => {
      try {
        const p = JSON.parse(
          sessionStorage.getItem("selectedProduct") || "null"
        );
        return p ? p.detail : null;
      } catch (e) {
        return null;
      }
    })();

  function initBreadcrumb() {
    if (productName && typeof window.updateBreadcrumb === "function") {
      window.updateBreadcrumb("المنتجات", productName);
    } else {
      // retry after nav.js finishes loading
      setTimeout(initBreadcrumb, 100);
    }
  }

  initBreadcrumb();
});
