import { renderProduct } from "./product.js";
import { renderListProduct } from "./listProduct.js";
import { getProducts } from "./productData.js";
import { paginate } from "./pagination.js";





document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("services-items-container");
  const listContainer = document.getElementById("services-items-list-container");
  const paginationWrapper = document.getElementById("pagination-section");

  if (!container && !listContainer) return;

  //  الدالة الافتراضية للعرض: Grid
  let currentRenderFn = renderProduct;
  let currentView = "grid";

  // Products + pagination (افتراضي: Grid)
  const products = getProducts(40);
  if (container) {
    paginate(products, 8, currentRenderFn, container, paginationWrapper);
  }

  //  إضافة عرض مباشر كقائمة (بدون اختيار)
  if (listContainer) {
    paginate(products, 8, renderListProduct, listContainer, paginationWrapper);
  }

  //  Dropdown لطريقة العرض (نفس شكل التقييم)
 const viewBtn = document.querySelector('.select-box-search-result button:first-child');
if (viewBtn) {
  // إنشاء الزر
  const dropdownWrapper = document.createElement("div");
  dropdownWrapper.style.position = "relative";

  const dropdownBtn = document.createElement("button");
  dropdownBtn.className = "view-dropdown-btn";
  dropdownBtn.innerHTML = `
    <span id="view-btn-label">طريقة العرض</span>
    <i class="fa-solid fa-angle-down"></i>
  `;

  const dropdownMenu = document.createElement("ul");
  dropdownMenu.className = "view-dropdown-menu";
  dropdownMenu.innerHTML = `
    <li data-view="grid">مربعات</li>
    <li data-view="list">قائمة</li>
  `;

  dropdownWrapper.appendChild(dropdownBtn);
  dropdownWrapper.appendChild(dropdownMenu);
  viewBtn.parentNode.replaceChild(dropdownWrapper, viewBtn);

  // فتح/غلق القائمة
  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  // تغيير العرض
  const viewLabel = dropdownBtn.querySelector("#view-btn-label");
  dropdownMenu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
      currentView = item.dataset.view;
      currentRenderFn = currentView === "grid" ? renderProduct : renderListProduct;

      //  تحديث النص داخل الزر
      viewLabel.textContent = item.textContent;

      // إعادة عرض المنتجات
      container.innerHTML = "";
      paginationWrapper.innerHTML = "";
      paginate(products, 8, currentRenderFn, container, paginationWrapper);

      dropdownMenu.classList.remove("active");
    });
  });

  // إغلاق لو ضغطت برة
  document.addEventListener("click", () => {
    dropdownMenu.classList.remove("active");
  });
}

  // Optional: breadcrumb update
  const waitNav = setInterval(() => {
    if (typeof window.updateBreadcrumb === "function") {
      window.updateBreadcrumb("المنتجات");
      clearInterval(waitNav);
    }
  }, 100);
});





