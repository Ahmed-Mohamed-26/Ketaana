// listProduct.js


export function renderListProduct(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product-list";

  productDiv.innerHTML = `
    <div class="product-list-details">
      <img src="${product.img}" alt="p-Img" class="list-img">
      <div class="list-info">
      <div class="list-header">
        <h4>${product.detail}</h4>
          <div class="category-secondary">
        ${product.offer ? `<p class="offer">عرض</p>` : ""}
        <p class="category-name">${product.category}</p>  
      </div>
      
      </div>

        <span class="list-number">${product.number}</span>
        <div class="list-evaluation">
          <div class="factory">
            <img src="${product.factoryImg}" alt="factory-img">
            <p>ياباني</p>
          </div>
          <div class="yellow-area"> 
          <div class="quantity-price-container">
  <!-- الزر الكبير للفـتح -->
  <button class="open-quantity-btn ">
    <i class="fa-solid fa-plus"></i>
  </button>

  <!-- واجهة التحكم -->
  <div class="add-product collapsed">
    <i class="fa-solid fa-plus"></i>
    <input type="number" value="1" min="1" />
    <i class="fa-solid fa-minus"></i>
  </div>

  <div class="price">
    <span>${product.price}</span>
    <img src="./assets/images/products/currency.svg" alt="SAR" class="currency-icon" />
  </div>
</div>
          </div>
        </div>
        </div>
       
            <div class="eval">
            <i class="fa-solid fa-star"></i>
            <span class="eval-number">${product.evaluation}</span>
          </div>
        
      </div>
    </div>

   
  `;

// ===== Page-specific logic =====
const isOfferPage = window.location.pathname.includes("profile.html");

const quantityPrice = productDiv.querySelector(".quantity-price-container");
const secondaryCategory = productDiv.querySelector(".category-secondary");
const factoryDiv = productDiv.querySelector(".factory");
const evalDiv = productDiv.querySelector(".eval");

if (isOfferPage) {
  quantityPrice.style.display = "none";
  secondaryCategory.style.display = "none";
  const factoryEvalContainer = document.createElement("div");
  factoryEvalContainer.className = "factory-eval-container";
  factoryEvalContainer.appendChild(factoryDiv);
  factoryEvalContainer.appendChild(evalDiv);
  const listEvaluation = productDiv.querySelector(".list-evaluation");
  listEvaluation.innerHTML = ""; 
  listEvaluation.appendChild(factoryEvalContainer);
 factoryEvalContainer.style.display = "flex";
 factoryEvalContainer.style.alignItems = "center";
 factoryEvalContainer.style.justifyContent = "space-between";
 factoryEvalContainer.style.width = "95%";
 factoryEvalContainer.style.gap = "15px";
} else {
  quantityPrice.style.display = "flex";
  secondaryCategory.style.display = "flex";
}

  // ===== Product click → go to product view (كما هو) =====
  const h4 = productDiv.querySelector("h4");
  if (h4) {
    h4.addEventListener("click", () => {
      sessionStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = `productView.html?product=${encodeURIComponent(
        product.detail
      )}`;
    });
  }

  // ===== Expand / collapse logic (كما هو) =====
 const addProduct = productDiv.querySelector(".add-product");
const openBtn = productDiv.querySelector(".open-quantity-btn");

if (addProduct && openBtn) {
  const plusIcon = addProduct.querySelector(".fa-plus");
  const minusIcon = addProduct.querySelector(".fa-minus");
  const inputField = addProduct.querySelector("input");

  // زر الفتح الكبير
  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    addProduct.classList.add("expanded");
    openBtn.style.display = "none"; // إخفاء الزر الكبير بعد الفتح
    inputField.focus();
  });

  // عند الضغط على +
  plusIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    const currentVal = parseInt(inputField.value);
    inputField.value = currentVal + 1;
  });

  // عند الضغط على -
  minusIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    const currentVal = parseInt(inputField.value);
    if (currentVal > parseInt(inputField.min)) {
      inputField.value = currentVal - 1;
    }
  });

  // الضغط خارج العنصر → يقفل
  document.addEventListener("click", (e) => {
    if (!addProduct.contains(e.target) && !openBtn.contains(e.target)) {
      addProduct.classList.remove("expanded");
      openBtn.style.display = "flex"; // رجّع الزر الكبير لما يقفل
    }
  });
}

  // ===== Star rating gradient (كما هو) =====
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