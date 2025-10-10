document.addEventListener("DOMContentLoaded", () => {
  /* ========== التنقل الرئيسي (Primary Navigation) ========== */
  const primaryLis = document.querySelectorAll(".primary-nav ul li");
  const navContainer = document.querySelector(".nav-container");
  const detailsContainer = document.querySelector(".details-nav-container");
  const detailsDivs = detailsContainer ? detailsContainer.children : [];

  // وظائف مساعدة للتنقل
  function resetPrimary() {
    primaryLis.forEach((li) => {
      li.classList.remove("activePrimaryNav");
      const icon = li.querySelector("i");
      if (icon) icon.classList.remove("activePrimaryNavIcon");
    });
  }

  function resetSecondary(ul) {
    ul.querySelectorAll("li").forEach((li) => {
      li.classList.remove("activeSecondaryNav");
    });
  }

  function getMatchClass(li) {
    // تجاهل الكلاسات العامة مثل hover/active
    return Array.from(li.classList).find(
      (cls) => cls !== "hover" && cls !== "activePrimaryNav"
    );
  }

  function activatePrimary(primaryLi) {
    resetPrimary();
    primaryLi.classList.add("activePrimaryNav");

    const icon = primaryLi.querySelector("i");
    if (icon) icon.classList.add("activePrimaryNavIcon");

    const primaryClass = getMatchClass(primaryLi);

    // إخفاء جميع التنقلات الثانوية + التفاصيل
    navContainer.querySelectorAll("ul").forEach((ul) => {
      ul.style.display = "none";
      resetSecondary(ul);
    });
    Array.from(detailsDivs).forEach((div) => (div.style.display = "none"));

    // التنقل الثانوي المطابق
    const matchingUl = navContainer.querySelector(`ul.${primaryClass}`);
    if (matchingUl) {
      matchingUl.style.display = "flex";
      const firstLi = matchingUl.querySelector("li");
      if (firstLi) {
        firstLi.classList.add("activeSecondaryNav");
        const secClass = getMatchClass(firstLi);

        Array.from(detailsDivs).forEach((div) => {
          div.style.display = div.classList.contains(secClass)
            ? "flex"
            : "none";
        });
      }
    } else {
      // لا يوجد تنقل ثانوي → مطابقة مباشرة للتفاصيل
      Array.from(detailsDivs).forEach((div) => {
        div.style.display = div.classList.contains(primaryClass)
          ? "flex"
          : "none";
      });
    }
  }

  // النقر على التنقل الرئيسي
  primaryLis.forEach((primaryLi) => {
    primaryLi.addEventListener("click", () => {
      activatePrimary(primaryLi);
    });
  });

  // النقر على التنقل الثانوي
  navContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const clickedLi = e.target;
      const ul = clickedLi.closest("ul");

      resetSecondary(ul);
      clickedLi.classList.add("activeSecondaryNav");

      const liClass = getMatchClass(clickedLi);

      Array.from(detailsDivs).forEach((div) => {
        div.style.display = div.classList.contains(liClass) ? "flex" : "none";
      });
    }
  });

  // الافتراضي: تفعيل أول عنصر رئيسي
  if (primaryLis[0]) {
    activatePrimary(primaryLis[0]);
  }

  // الانتقال إلى صفحة الملف الشخصي بناءً على معامل URL
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get("section");

  if (section) {
    const allPrimaryLis = document.querySelectorAll(".primary-nav ul li label");

    allPrimaryLis.forEach((label) => {
      if (
        (section === "products" && label.textContent.includes("منتجاتي")) ||
        (section === "offers" && label.textContent.includes("عروضي"))
      ) {
        const li = label.closest("li");
        if (li) activatePrimary(li);
      }
    });
  }

  /* ========== قوائم منسدلة الجدول (Table Dropdown Menus) ========== */
  const optionButtons = document.querySelectorAll(
    "#profile-section .manage-dealer .options button"
  );

  optionButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const currentOption = btn.closest(".options");

      // إغلاق القوائم الأخرى
      document
        .querySelectorAll("#profile-section .manage-dealer .options")
        .forEach((opt) => {
          if (opt !== currentOption) opt.classList.remove("open");
        });

      // تبديل الحالة الحالية
      currentOption.classList.toggle("open");
    });
  });

  // إغلاق القوائم عند النقر خارجها
  document.addEventListener("click", () => {
    document
      .querySelectorAll("#profile-section .manage-dealer .options")
      .forEach((opt) => opt.classList.remove("open"));
  });

  /* ========== مودال إضافة المنتج (Add Product Modal) ========== */
  const openBtn = document.getElementById("openAddProductBtn");
  const modal = document.getElementById("addProductModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const originalYes = document.getElementById("originalYes");
  const originalNo = document.getElementById("originalNo");
  const factoryField = document.getElementById("factoryField");
  const originCountryField = document.getElementById("originCountryField");
  const warrantyYes = document.getElementById("warrantyYes");
  const warrantyNo = document.getElementById("warrantyNo");
  const altNumbersField = document.getElementById("altNumbersField");
  const monthsField = document.getElementById("monthsField");

  // فتح المودال
  openBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  // إغلاق المودال
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // إغلاق عند النقر خارج المحتوى
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });

  // التحكم في خيار "أصلية"
  originalYes.addEventListener("change", () => {
    if (originalYes.checked) {
      originalNo.checked = false;
      factoryField.classList.add("hidden");
      originCountryField.classList.add("hidden");
    }
  });

  originalNo.addEventListener("change", () => {
    if (originalNo.checked) {
      originalYes.checked = false;
      factoryField.classList.remove("hidden");
      originCountryField.classList.remove("hidden");
    }
  });

  // التحكم في خيار "ضمان"
  warrantyYes.addEventListener("change", () => {
    if (warrantyYes.checked) {
      warrantyNo.checked = false;
      altNumbersField.classList.remove("hidden");
      monthsField.classList.remove("hidden");
    }
  });

  warrantyNo.addEventListener("change", () => {
    if (warrantyNo.checked) {
      warrantyYes.checked = false;
      altNumbersField.classList.add("hidden");
      monthsField.classList.add("hidden");
    }
  });

  /* ========== مودال إضافة العنوان (Add Address Modal) ========== */
  const openAddressBtn = document.getElementById("openAddAddressBtn");
  const addAddressModal = document.getElementById("addAddressModal");
  const closeAddressModalBtn = document.getElementById("closeAddressModalBtn");

  if (openAddressBtn && addAddressModal && closeAddressModalBtn) {
    openAddressBtn.addEventListener("click", () => {
      addAddressModal.classList.add("show");
    });

    closeAddressModalBtn.addEventListener("click", () => {
      addAddressModal.classList.remove("show");
    });

    addAddressModal.addEventListener("click", (e) => {
      if (e.target === addAddressModal) {
        addAddressModal.classList.remove("show");
      }
    });
  }

  /* ========== مودال إضافة/تعديل المفوض (Add/Edit Delegate Modal) ========== */
 const openAddDelegateBtn = document.getElementById("openAddDelegateBtn");
const addDelegateModal = document.getElementById("addDelegateModal");
const closeAddDelegateBtn = document.getElementById("closeAddDelegateBtn");

// وظيفة إعادة تعيين المودال إلى حالة الإضافة
function resetDelegateModal() {
  document.getElementById("delegateModalTitle").textContent = "إضافة مفوض جديد";
  document.getElementById("delegateModalIcon").src = "./assets/images/profile/dealer-black.svg";
  document.getElementById("delegateSubmitLabel").textContent = "أضف المفوض";
  document.getElementById("delegateSubmitIcon").src = "./assets/images/profile/right.svg";
  document.getElementById("delegateRoleGroup").style.display = "block";

  // تنظيف الحقول العادية
  document.getElementById("delegateForm").reset();

  // إعادة تعيين الـ custom dropdowns
  const roleSelected = document.querySelector("#delegateRoleDropdown .dropdown-selected-type");
  if (roleSelected) roleSelected.textContent = "حدد الدور";
  document.getElementById("delegateRoleHidden").value = "";

  const statusSelected = document.querySelector("#delegateStatusDropdown .dropdown-selected-type");
  if (statusSelected) statusSelected.textContent = "حالة الحساب";
  document.getElementById("delegateStatusHidden").value = "";
}

// فتح مودال الإضافة
if (openAddDelegateBtn && addDelegateModal && closeAddDelegateBtn) {
  openAddDelegateBtn.addEventListener("click", () => {
    resetDelegateModal();  // إعادة تعيين قبل الفتح
    addDelegateModal.classList.add("show");
    
    // تهيئة الـ dropdowns بعد الفتح (للإضافة)
    initCustomDropdown("delegateRoleDropdown");
    initCustomDropdown("delegateStatusDropdown");
  });

  closeAddDelegateBtn.addEventListener("click", () => {
    resetDelegateModal();
    addDelegateModal.classList.remove("show");
  });

  addDelegateModal.addEventListener("click", (e) => {
    if (e.target === addDelegateModal) {
      resetDelegateModal();
      addDelegateModal.classList.remove("show");
    }
  });
}

const editDelegateBtns = document.querySelectorAll(".manage-dealer .options .dropdown li:first-child");

editDelegateBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    const name = row.children[0].textContent.trim();
    const email = row.children[1].textContent.trim();
    const phone = row.children[2].textContent.trim();
    const statusText = row.children[3].textContent.trim();

    // تغيير العنوان والأيقونة
    document.getElementById("delegateModalTitle").textContent = "تعديل بيانات المفوض";
    document.getElementById("delegateModalIcon").src = "../assets/images/profile/edit.svg";

    // ملء البيانات في النموذج (الـ inputs العادية)
    document.getElementById("delegateName").value = name;
    document.getElementById("delegateEmail").value = email;
    document.getElementById("delegatePhone").value = phone;

    // إخفاء اختيار الدور في التعديل
    document.getElementById("delegateRoleGroup").style.display = "none";

    // ضبط الحالة في الـ custom dropdown (بدل select)
    const statusValue = statusText === "مفعل" ? "active" : "inactive";
    const statusTextDisplay = statusText === "مفعل" ? "مفعل" : "غير مفعل";
    const statusSelected = document.querySelector("#delegateStatusDropdown .dropdown-selected-type");
    if (statusSelected) {
      statusSelected.textContent = statusTextDisplay;
      statusSelected.dataset.value = statusValue;  // إضافة: حفظ الـ value في الـ selected للتوافق
    }
    document.getElementById("delegateStatusHidden").value = statusValue;

    // تغيير نص الزر
    document.getElementById("delegateSubmitLabel").textContent = "حفظ التعديلات";

    // عرض المودال
    addDelegateModal.classList.add("show");

    // تهيئة الـ dropdowns بعد الفتح (للتعديل)
    // أولًا، init للـ status عشان يشتغل التفاعل
    initCustomDropdown("delegateStatusDropdown");
    
    // اختبار بسيط (يمكن حذفه بعد الاختبار)
    console.log("تم ملء الـ status بـ:", statusTextDisplay, "والقيمة:", statusValue);
    console.log("الـ dropdown جاهز للتغيير!");
  });
});

  /* ========== مودال حذف المفوض (Delete Delegate Modal) ========== */
  const deleteButtons = document.querySelectorAll(".manage-dealer .options .delete");
  const deleteModal = document.getElementById("deleteDelegateModal");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteModal.classList.add("show");
    });
  });

  cancelDeleteBtn.addEventListener("click", () => {
    deleteModal.classList.remove("show");
  });

  deleteModal.addEventListener("click", (e) => {
    if (e.target === deleteModal) {
      deleteModal.classList.remove("show");
    }
  });

  confirmDeleteBtn.addEventListener("click", () => {
    // هنا يمكن إضافة كود حذف الصف فعليًا من الجدول
    console.log("تم تأكيد حذف المفوض ✅");
    deleteModal.classList.remove("show");
  });

  /* ========== قائمة منسدلة العروض (Offers Dropdown) ========== */
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const btnLabel = dropdownButton.querySelector(".btn-label");
  const btnIcon = dropdownButton.querySelector(".btn-icon");

  dropdownButton.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });

  // إغلاق القائمة عند النقر خارجها
  document.addEventListener("click", (e) => {
    if (!dropdownButton.contains(e.target)) {
      dropdownMenu.classList.remove("show");
    }
  });

  // اختيار عنصر من القائمة
  dropdownMenu.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      btnLabel.textContent = item.textContent;
      btnIcon.style.display = "none"; // إخفاء الأيقونة بعد الاختيار
      dropdownMenu.classList.remove("show");
    });
  });

  // ===== مودال إدخال منتج موجود  =====
  // const dropdownMenu = document.getElementById("dropdownMenu");
  const offerProductModal = document.getElementById("offerProductModal");
  const closeOfferModal = document.getElementById("closeOfferModal");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const successStep = document.getElementById("successStep");
  const nextToStep2 = document.getElementById("nextToStep2");
  const backToStep1 = document.getElementById("backToStep1");
  const publishOffer = document.getElementById("publishOffer");
   

  // --- فتح المودال عند الضغط على "اختيار منتج موجود مسبقًا"
  const selectExistingProduct = Array.from(
    dropdownMenu.querySelectorAll("li")
  ).find((li) => li.textContent.includes("اختيار منتج موجود مسبقًا"));
  

  selectExistingProduct.addEventListener("click", () => {
    offerProductModal.classList.add("show");
    step1.classList.remove("hidden");
    step2.classList.add("hidden");
    successStep.classList.add("hidden");
  });

  // --- غلق المودال
  closeOfferModal.addEventListener("click", () => {
    offerProductModal.classList.remove("show");
  });

  offerProductModal.addEventListener("click", (e) => {
    if (e.target === offerProductModal) offerProductModal.classList.remove("show");
  });

  // --- التنقل بين الخطوات
  nextToStep2.addEventListener("click", () => {
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
  });

  backToStep1.addEventListener("click", () => {
    step2.classList.add("hidden");
    step1.classList.remove("hidden");
  });

  // --- نشر العرض (عرض رسالة النجاح)
  publishOffer.addEventListener("click", () => {
    step1.classList.add("hidden");
    step2.classList.add("hidden");
    successStep.classList.remove("hidden");
  });


  //dropdown المخصص لاختيار القطعة الخطوه الاولى
  // --- Dropdown المخصص لاختيار القطعة ---
  const selectedPart = document.getElementById("selectedPart");
  const dropdownList = document.getElementById("dropdownList");
   // فتح/إغلاق القائمة عند الضغط
  selectedPart.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownList.classList.toggle("hidden");
    document.getElementById("searchPartInput").focus();
  });

  // البحث في القائمة
  const searchPartInput = document.getElementById("searchPartInput");
  const partsList = document.getElementById("partsList");
  const parts = partsList.querySelectorAll("li");

  searchPartInput.addEventListener("input", () => {
    const value = searchPartInput.value.toLowerCase();
    parts.forEach((item) => {
      item.style.display = item.textContent.toLowerCase().includes(value)
        ? "block"
        : "none";
    });
  });

  // اختيار عنصر من القائمة
  parts.forEach((li) => {
    li.addEventListener("click", () => {
      const text = li.textContent;
      selectedPart.textContent = text;
      dropdownList.classList.add("hidden");
      selectedPart.classList.add("selected");
      nextToStep2.disabled = false; // تفعيل زر التالي
    });
  });

  // إغلاق القائمة عند الضغط خارجها
  document.addEventListener("click", (e) => {
    if (!dropdownList.contains(e.target) && e.target !== selectedPart) {
      dropdownList.classList.add("hidden");
    }
  });

  // === Dropdown Function (Reusable) ===
function initCustomDropdown(containerId) {
  const dropdown = document.getElementById(containerId);
  if (!dropdown) return; 

  const selected = dropdown.querySelector(".dropdown-selected-type");
  const list = dropdown.querySelector(".dropdown-list");
  const items = list.querySelectorAll("li");
  const searchInput = dropdown.querySelector("input[type='text']"); 

  if (!selected || !list) return;

  // فتح/غلق القائمة عند الضغط على selected
  selected.addEventListener("click", (e) => {
    e.stopPropagation();
    list.classList.toggle("hidden");
    if (searchInput) searchInput.focus(); // ركز على الـ search لو موجود
  });

  // دعم البحث (لو كان في input search)
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();
      items.forEach((item) => {
        item.style.display = item.textContent.toLowerCase().includes(value)
          ? "block"
          : "none";
      });
    });
  }

  // اختيار عنصر من القائمة
  items.forEach((item) => {
    item.addEventListener("click", () => {
      selected.textContent = item.textContent;
      selected.dataset.value = item.dataset.value || ""; // حفظ الـ value لو موجود
      list.classList.add("hidden");
      // هنا ممكن تضيف callback لو عايز (مثل تفعيل زر التالي)
      const nextBtn = dropdown.closest(".step")?.querySelector("button[type='button']");
      if (nextBtn) nextBtn.disabled = false;
    });
  });

  // غلق القائمة عند الضغط خارجها
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      list.classList.add("hidden");
    }
  });
}

// ===== مودال إدخال منتج جديد يدويًا =====
  const manualModal = document.getElementById("manualProductModal");
  const closeManualModal = document.getElementById("closeManualModal");
  const manualStep1 = document.getElementById("manualStep1");
  const manualStep2 = document.getElementById("manualStep2");
  const manualSuccessStep = document.getElementById("manualSuccessStep");
  const manualNextToStep2 = document.getElementById("manualNextToStep2");
  const manualBackToStep1 = document.getElementById("manualBackToStep1");
  const manualPublishOffer = document.getElementById("manualPublishOffer");
  const manualOriginalYes = document.getElementById("manualOriginalYes");
  const manualOriginalNo = document.getElementById("manualOriginalNo");
  const manualFactoryField = document.getElementById("manualFactoryField");
  const manualOriginCountryField = document.getElementById("manualOriginCountryField");
  const manualReturnPolicy = document.getElementById("manualReturnPolicy");
  const manualReturnPolicyField = document.getElementById("manualReturnPolicyField");
  const hasWarrantyYes = document.getElementById("hasWarrantyYes");
  const hasWarrantyNo = document.getElementById("hasWarrantyNo");
  const warrantyMonthsField = document.getElementById("warrantyMonthsField");
  const warrantyAltNumbersField = document.getElementById("warrantyAltNumbersField");

  // فتح المودال عند الضغط على "إدخال منتج جديد يدويًا"
  const selectManualProduct = Array.from(dropdownMenu.querySelectorAll("li")).find((li) =>
    li.textContent.includes("إدخال منتج جديد يدويًا")
  );

  selectManualProduct.addEventListener("click", () => {
    manualModal.classList.add("show");
    manualStep1.classList.remove("hidden");
    manualStep2.classList.add("hidden");
    manualSuccessStep.classList.add("hidden");
  });

  // غلق المودال
  closeManualModal.addEventListener("click", () => {
    manualModal.classList.remove("show");
  });

  manualModal.addEventListener("click", (e) => {
    if (e.target === manualModal) manualModal.classList.remove("show");
  });

  // التنقل بين الخطوات
  manualNextToStep2.addEventListener("click", () => {
    manualStep1.classList.add("hidden");
    manualStep2.classList.remove("hidden");
  });

  manualBackToStep1.addEventListener("click", () => {
    manualStep2.classList.add("hidden");
    manualStep1.classList.remove("hidden");
  });

  manualPublishOffer.addEventListener("click", () => {
    manualStep1.classList.add("hidden");
    manualStep2.classList.add("hidden");
    manualSuccessStep.classList.remove("hidden");
  });

  // التحكم في "هل أصلية؟"
  manualOriginalYes.addEventListener("change", () => {
    if (manualOriginalYes.checked) {
      manualOriginalNo.checked = false;
      manualFactoryField.classList.add("hidden");
      manualOriginCountryField.classList.add("hidden");
    }
  });

  manualOriginalNo.addEventListener("change", () => {
    if (manualOriginalNo.checked) {
      manualOriginalYes.checked = false;
      manualFactoryField.classList.remove("hidden");
      manualOriginCountryField.classList.remove("hidden");
    }
  });

  //     "الضمان"  أي 
 hasWarrantyYes.addEventListener("change", () => {
  if (hasWarrantyYes.checked) {
    hasWarrantyNo.checked = false;
    warrantyMonthsField.classList.remove("hidden");
    warrantyAltNumbersField.classList.remove("hidden");
  } else {
    warrantyMonthsField.classList.add("hidden");
    warrantyAltNumbersField.classList.add("hidden");
  }
});

hasWarrantyNo.addEventListener("change", () => {
  if (hasWarrantyNo.checked) {
    hasWarrantyYes.checked = false;
    warrantyMonthsField.classList.add("hidden");
    warrantyAltNumbersField.classList.add("hidden");
  }
});

  // التحكم في سياسة الاستبدال والاسترجاع
  manualReturnPolicy.addEventListener("change", () => {
    if (manualReturnPolicy.checked) {
      manualReturnPolicyField.classList.remove("hidden");
    } else {
      manualReturnPolicyField.classList.add("hidden");
    }
  });

initCustomDropdown("dropdownContainer1"); 
initCustomDropdown("dropdownContainer2");
initCustomDropdown("countryDropdownAdress");
initCustomDropdown("delegateRoleDropdown");
});




