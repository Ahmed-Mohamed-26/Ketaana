// Payment method selection logic
document.addEventListener("DOMContentLoaded", () => {
  // --------- Payment selection logic ---------
  const paymentItems = document.querySelectorAll(
    "#order-section .payment-method .payment-item"
  );

  if (paymentItems.length) {
    paymentItems[0].classList.add("activePayment");

    paymentItems.forEach((item) => {
      item.addEventListener("click", () => {
        paymentItems.forEach((el) => el.classList.remove("activePayment"));
        item.classList.add("activePayment");
      });
    });
  }

  // --------- Tablet Add Address Form Logic ---------
  const addAddressBtn = document.querySelector(".add-address.hover");
  const tabletForm = document.querySelector(".tablet-form-address");
  const closeTabletForm = document.querySelector(
    ".tablet-form-address .close-tablet-add-address"
  );

  if (addAddressBtn && tabletForm && closeTabletForm) {
    // Open form
    addAddressBtn.addEventListener("click", () => {
      tabletForm.classList.add("formActive");
    });

    // Close form
    closeTabletForm.addEventListener("click", () => {
      tabletForm.classList.remove("formActive");
    });
  }

  // --------- Navigate to cartView.html when close icon is clicked ---------
  const closeCartViewBtn = document.querySelector(".fa-xmark.close.hover");
  if (closeCartViewBtn) {
    closeCartViewBtn.addEventListener("click", () => {
      window.location.href = "cartView.html";
    });
  }
});
