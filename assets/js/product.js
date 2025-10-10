// product.js (نفس الكود القديم، مع إضافة class للـ product في list view)
export function renderProduct(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product";  // يمكن إضافة class ديناميكي إذا لزم، لكن هنا محفوظ

  productDiv.innerHTML = `
    <div class="layout-offer">
      <div class="category-type">
        ${product.offer ? `<p class="offer">عرض</p>` : ""}
        <p class="category-name">${product.category}</p>
      </div>
      <div>متبقي 01:2:24</div>
    </div>

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
    <div class="product-evaluation">
      <div class="factory">
        <img src="${product.factoryImg}" alt="factory-img">
        <p>ياباني</p>
      </div>
      <div class="eval">
        <i class="fa-solid fa-star"></i>
        <span class="eval-number">${product.evaluation}</span>
      </div>
    </div>
    <div class="quantity-price-container">
      <div class="add-product collapsed">
        <i class="fa-solid fa-plus"></i>
        <input type="number" value="0" min="1" />
        <i class="fa-solid fa-minus"></i>
      </div>
      <div class="price">
        <span>${product.price}</span>
        <img src="./assets/images/products/currency.svg" alt="SAR" class="currency-icon" />
      </div>
    </div>
  `;

  // ===== Page-specific logic ===== (محفوظ)
  const isOfferPage = window.location.pathname.includes("offer.html");

  const layoutOffer = productDiv.querySelector(".layout-offer");

  const quantityPrice = productDiv.querySelector(".quantity-price-container");
  const secondaryCategory = productDiv.querySelector(".category-secondary");

  if (isOfferPage) {
    layoutOffer.style.display = "flex";

    quantityPrice.style.display = "none";
    secondaryCategory.style.display = "none"; // hide the 2nd category
  } else {
    layoutOffer.style.display = "none";

    quantityPrice.style.display = "flex";
    secondaryCategory.style.display = "flex"; // show the 2nd category
  }

  // ===== Product click → go to product view ===== (محفوظ)
  const h4 = productDiv.querySelector(".details h4");
  if (h4) {
    h4.addEventListener("click", () => {
      sessionStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = `productView.html?product=${encodeURIComponent(
        product.detail
      )}`;
    });
  }

  // ===== Expand / collapse logic ===== (محفوظ)
  const addProduct = productDiv.querySelector(".add-product");
  if (addProduct) {
    const plusIcon = addProduct.querySelector(".fa-plus");
    const minusIcon = addProduct.querySelector(".fa-minus");
    const inputField = addProduct.querySelector("input");

    // عند الضغط على +
    plusIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // يمنع propagation للـ div
      addProduct.classList.add("expanded");
      inputField.focus();

      // ✅ زيادة الكمية
      inputField.value = parseInt(inputField.value) + 1;
    });

    // عند الضغط على -
    minusIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentVal = parseInt(inputField.value);
      if (currentVal > parseInt(inputField.min)) {
        inputField.value = currentVal - 1;
      }
    });

    // ✅ لو ضغط خارج add-product → يقفلها
    document.addEventListener("click", (e) => {
      if (!addProduct.contains(e.target)) {
        addProduct.classList.remove("expanded");
      }
    });
  }

  // ===== Star rating gradient ===== (محفوظ)
  const starIcon = productDiv.querySelector(".eval .fa-star");
  if (starIcon) {
    const rating = parseFloat(product.evaluation);
    const percent = (Math.max(0, Math.min(5, rating)) / 5) * 100;

    starIcon.style.background = `linear-gradient(to right, rgba(255,148,38,1) ${percent}%, #ccc ${percent}%)`;
    starIcon.style.webkitBackgroundClip = "text";
    starIcon.style.webkitTextFillColor = "transparent";
    starIcon.style.display = "inline-block";
  }

  return productDiv;
}


// ✅ دالة لعرض المنتجات اللي عليها عروض (Offer Products)
export function renderOfferProduct(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  productDiv.innerHTML = `
    <div class="layout-offer">
      <div class="category-type">
        ${product.offer ? `<p class="offer">عرض</p>` : ""}
        <p class="category-name">${product.category}</p>
      </div>
      <div class="product-right-action">
        <div class="remaining-time">01:2:24 متبقى</div>
        <div class="left-actions">
          <div class="dots-menu">
            <i class="fa-solid fa-ellipsis-vertical"></i>
            <div class="menu-popup hidden">
              <p class="extend-offer-btn">
                <i class="fa-regular fa-clock"></i> تمديد وقت العرض
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-details-container">
      <div class="product-details">
        <img src="${product.img}" alt="p-Img">
        <div class="details">
          <h4>${product.detail}</h4>
          <span>${product.number}</span>
        </div>
      </div>
    </div>

    <div class="product-evaluation">
      <div class="factory">
        <img src="${product.factoryImg}" alt="factory-img">
        <p>ياباني</p>
      </div>
      <div class="eval">
        <i class="fa-solid fa-star"></i>
        <span class="eval-number">${product.evaluation}</span>
      </div>
    </div>

    <!-- مودال تمديد وقت العرض -->
   <div class="offer-modal-time hidden">
  <div class="modal-content">
    <div class="modal-header">
      <div class="modal-title">
        <i class="fa-regular fa-clock"></i>
        <label>تمديد وقت العرض</label>
      </div>
      <button class="close-modal-time" id="closeModalBtn">×</button>
    </div>

    <label>حدد الوقت</label>
 <div class="time-input">
  <label class="floating-placeholder"> الوقت</label>
  <input type="datetime-local" />
</div>


    <div>
      <button type="submit" class="green-submit update-time-btn">
        <img src="./assets/images/profile/right.svg" alt="img" />
        <label>تحديث المدة</label>
      </button>
    </div>
  </div>
</div>

  `;

  // ===== Star rating gradient =====
  const starIcon = productDiv.querySelector(".eval .fa-star");
  if (starIcon) {
    const rating = parseFloat(product.evaluation);
    const percent = (Math.max(0, Math.min(5, rating)) / 5) * 100;
    starIcon.style.background = `linear-gradient(to right, rgba(255,148,38,1) ${percent}%, #ccc ${percent}%)`;
    starIcon.style.webkitBackgroundClip = "text";
    starIcon.style.webkitTextFillColor = "transparent";
    starIcon.style.display = "inline-block";
  }

  // ===== Toggle menu on dots click =====
  const dotsMenu = productDiv.querySelector(".dots-menu i");
  const menuPopup = productDiv.querySelector(".menu-popup");

  dotsMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    menuPopup.classList.toggle("hidden");
  });

  document.addEventListener("click", () => {
    menuPopup.classList.add("hidden");
  });

  // ===== Show modal when clicking "تمديد وقت العرض" =====
  const extendOfferBtn = productDiv.querySelector(".extend-offer-btn");
  const modal = productDiv.querySelector(".offer-modal-time");
  const closeModal = productDiv.querySelector(".close-modal-time");
  const updateTimeBtn = productDiv.querySelector(".update-time-btn");

  extendOfferBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.remove("hidden");
    menuPopup.classList.add("hidden");
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  updateTimeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  return productDiv;
}



// ✅ دالة لعرض المنتجات العادية (بدون عروض)
export function renderNonOfferProduct(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  productDiv.innerHTML = `
  

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
    <div class="product-evaluation">
      <div class="factory">
        <img src="${product.factoryImg}" alt="factory-img">
        <p>ياباني</p>
      </div>
      <div class="eval">
        <i class="fa-solid fa-star"></i>
        <span class="eval-number">${product.evaluation}</span>
      </div>
    </div>

  `;

    // ===== Star rating gradient ===== (محفوظ)
  const starIcon = productDiv.querySelector(".eval .fa-star");
  if (starIcon) {
    const rating = parseFloat(product.evaluation);
    const percent = (Math.max(0, Math.min(5, rating)) / 5) * 100;

    starIcon.style.background = `linear-gradient(to right, rgba(255,148,38,1) ${percent}%, #ccc ${percent}%)`;
    starIcon.style.webkitBackgroundClip = "text";
    starIcon.style.webkitTextFillColor = "transparent";
    starIcon.style.display = "inline-block";
  }

  return productDiv;
}