import {renderNonOfferProduct,renderOfferProduct, renderProduct } from "./product.js";  // نستخدم نفس التصميم
import { getProducts } from "./productData.js"; // نفس الداتا القديمة

document.addEventListener("DOMContentLoaded", () => {
  const offerContainer = document.querySelector("#offer-products .products-container");
  const nonOfferContainer = document.querySelector("#non-offer-products .products-container");

  if (!offerContainer || !nonOfferContainer) return;

  // ✅ جلب المنتجات
  const allProducts = getProducts(20); // العدد اللي تحب

  // ✅ تقسيمهم حسب العرض
  const offerProducts = allProducts.filter(p => p.offer === true);
  const nonOfferProducts = allProducts.filter(p => !p.offer);

  // ✅ عرض المنتجات بعيدا عن pagination
  offerProducts.forEach(prod => {
    const element = renderOfferProduct(prod);
    offerContainer.appendChild(element);
  });

  nonOfferProducts.forEach(prod => {
    const element = renderNonOfferProduct(prod);
    // عند الضغط على المنتج → افتح المودال
    element.addEventListener("click", () => showAddOfferModal(prod));
    nonOfferContainer.appendChild(element);
  });
});


// ✅ المودال اللي يظهر لما تضغط على منتج بدون عرض
function showAddOfferModal(product) {
  // إزالة أي مودال سابق
  const oldModal = document.querySelector(".offer-modal");
  if (oldModal) oldModal.remove();

  // إنشاء المودال
  const modal = document.createElement("div");
  modal.className = "offer-modal";
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-box">
      <button class="close-modal-offer">×</button>
      <p>هل ترغب في إضافة عرض على القطعة:</p>
      <div class="product-details-offer">
         <div class="product-details-container">
      <div class="product-details">
        <img src="${product.img}" alt="p-Img">
        <div class="details">
          <h4>${product.detail}</h4>
          <span>${product.number}</span>
        </div>
      </div>
      <div class="category-type category-secondary">
        ${product.offer ? `<p class="offer">عرض</p>` : ""}
        <p class="category-name">${product.category}</p>
      </div>
    </div>
    </div>
      <div class="modal-actions-offer">
        <button class="btn-confirm">متابعة</button>
        <button class="btn-cancel">إلغاء</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // ✅ إغلاق المودال
  modal.querySelector(".close-modal-offer").addEventListener("click", () => modal.remove());
  modal.querySelector(".btn-cancel").addEventListener("click", () => modal.remove());

  // ✅ متابعة → هنا ممكن تحط التنقل أو الأكشن اللي تحب
  modal.querySelector(".btn-confirm").addEventListener("click", () => {
    alert(`تم اختيار: ${product.detail}`); // أو أي أكشن تاني
    modal.remove();
  });
}
