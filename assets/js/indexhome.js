// filteration.js - معدل للـ form نفسه
document.addEventListener("DOMContentLoaded", () => {
  // ✅ حدد العناصر في الـ #search-form نفسه
  const searchForm = document.getElementById("search-form");
  const searchFormInputs = searchForm.querySelectorAll(".search-form-input");  // الخمس inputs دلوقتي في نفس المكان
  const searchFormAction = searchForm.querySelector(".search-form-action");   // الـ action في نفس المكان
  const filterBtnWrapper = searchFormAction.querySelector("div i.fa-filter").parentElement;  // الـ filter الجديد هنا
  const filterHr = filterBtnWrapper.previousElementSibling;  // الـ <hr> قبله

  // ✅ عناصر الحقول الجديدة
  const categoryInput = document.getElementById("category");
  const countryInputContainer = document.getElementById("country-input");
  const companyInputContainer = document.getElementById("company-input");
  const countryChevron = countryInputContainer ? countryInputContainer.querySelector(".fa-chevron-down") : null;
  const companyChevron = companyInputContainer ? companyInputContainer.querySelector(".fa-chevron-down") : null;
  const countryUl = countryInputContainer ? countryInputContainer.querySelector("ul") : null;
  const companyUl = companyInputContainer ? companyInputContainer.querySelector("ul") : null;

  // ✅ عناصر الـ dropdowns للتصميم المتطابق (براند، فئة، بلد، شركة)
  const brandContainer = searchForm.querySelector('input[name="brand"]').closest(".input-value");
  const categoryContainer = searchForm.querySelector('input[name="category"]').closest(".input-value");
  const countryContainer = countryInputContainer ? countryInputContainer.querySelector(".input-value") : null;
  const companyContainer = companyInputContainer ? companyInputContainer.querySelector(".input-value") : null;

  let filterClicked = false;

  // ✅ دالة مساعدة لزيادة عرض الـ inputValue للـ dropdowns المحددة (متطابق مع شركة الصنع)
  function applyUniformWidth(inputContainers) {
    inputContainers.forEach((container) => {
      if (container) {
        // container.style.width = "100%"; 
        container.style.width = window.innerWidth < 768 ? "90%" : "100%";

        container.style.justifyContent = "space-between";  // السهم في مكانه القديم
        const input = container.querySelector("input");
        if (input) {
          input.style.flex = "1";  // الـ input يملأ المساحة
          input.style.width = "calc(100% - 30px)";  // مسافة للسهم بدون تغيير موقعه
        }
      }
    });
  }

  // ✅ تطبيق العرض المتطابق في البداية
  const dropdownContainers = [brandContainer, categoryContainer, countryContainer, companyContainer];
  applyUniformWidth(dropdownContainers);

  // ✅ Default state: خفي الأولى والتانية والتالتة والرابعة، اظهر الخامسة (اسم القطعة)
  searchFormInputs.forEach((el, i) => {
    if (i < 4) {
      el.style.display = "none";
    } else {
      el.style.display = "flex";
    }

    const inputValue = el.querySelector(".input-value");
    if (inputValue) {
      inputValue.style.display = "flex";
      inputValue.style.flexDirection = "row";
      inputValue.style.justifyContent = "space-between";
      inputValue.style.alignItems = "center";
      inputValue.style.gap = "15px";
    }
  });

  searchFormAction.style.display = "flex";

  // ✅ إضافة event للـ dropdowns الجديدة (فتح/إغلاق ul عند الضغط على chevron)
  if (countryChevron && countryUl) {
    countryChevron.addEventListener("click", (e) => {
      e.stopPropagation();
      if (countryUl.style.display === "none" || countryUl.style.display === "") {
        countryUl.style.display = "block";  // أو "flex" حسب الـ CSS
      } else {
        countryUl.style.display = "none";
      }
    });
  }

  if (companyChevron && companyUl) {
    companyChevron.addEventListener("click", (e) => {
      e.stopPropagation();
      if (companyUl.style.display === "none" || companyUl.style.display === "") {
        companyUl.style.display = "block";  // أو "flex" حسب الـ CSS
      } else {
        companyUl.style.display = "none";
      }
    });
  }

  // ✅ Event للـ filter click (في الـ action الرئيسي)
  if (filterBtnWrapper) {
    filterBtnWrapper.addEventListener("click", () => {
      filterClicked = true;

      // اظهر كل الـ inputs في نفس الـ form
      searchFormInputs.forEach((el) => {
        el.style.display = "flex";

        const inputValue = el.querySelector(".input-value");
        if (inputValue) {
          inputValue.style.display = "flex";
          inputValue.style.flexDirection = "row";
          inputValue.style.justifyContent = "space-between";
          inputValue.style.alignItems = "center";
          inputValue.style.gap = "15px";
        }
      });

      // ✅ إعادة تطبيق العرض المتطابق بعد الإظهار
      applyUniformWidth(dropdownContainers);

      // خفي الـ filter والـ hr
      filterBtnWrapper.style.display = "none";
      if (filterHr && filterHr.tagName === "HR") {
        filterHr.style.display = "none";
      }

      // ✅ استدعاء الـ responsive فوراً بعد الضغط عشان يطبق الـ column في mobile
      handleResponsiveLayout();
    });
  }

  // ✅ الـ logic الجديد: لقفل/فتح بلد الصنع وشركة الصنع بناءً على الفئة
  if (categoryInput) {
    const categoryUl = categoryInput.closest(".select-container").querySelector("ul");
    if (categoryUl) {
      categoryUl.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
          const selectedValue = e.target.textContent.trim();
          categoryInput.value = selectedValue;

          // ✅ التحقق والقفل/الفتح
          if (selectedValue === "أصلی") {
            // قفل الحقول الجديدة
            const countryInput = document.getElementById("country");
            const companyInput = document.getElementById("company");
            if (countryInput) {
              countryInput.readOnly = true;
              countryInput.value = "";  // مسح القيمة
              if (countryChevron) countryChevron.style.display = "none";  // إخفاء الـ chevron
              if (countryUl) countryUl.style.display = "none";  // إغلاق الـ ul
            }
            if (companyInput) {
              companyInput.readOnly = true;
              companyInput.value = "";
              if (companyChevron) companyChevron.style.display = "none";
              if (companyUl) companyUl.style.display = "none";
            }
          } else if (selectedValue === "تجارى") {
            // فتح الحقول عادي
            const countryInput = document.getElementById("country");
            const companyInput = document.getElementById("company");
            if (countryInput) {
              countryInput.readOnly = false;
              if (countryChevron) countryChevron.style.display = "block";  // إظهار الـ chevron
              if (countryUl) countryUl.style.display = "none";  // مغلقة افتراضياً، بس تقدر تفتحها
            }
            if (companyInput) {
              companyInput.readOnly = false;
              if (companyChevron) companyChevron.style.display = "block";
              if (companyUl) companyUl.style.display = "none";
            }
          }

          // ✅ إعادة تطبيق العرض بعد التغيير
          applyUniformWidth(dropdownContainers);
        }
      });
    }
  }

  // ✅ Responsive layout handler (معدل للـ mobile stacking)
  function handleResponsiveLayout() {
    if (window.innerWidth >= 768) {
      // Desktop/Tablet
      searchForm.style.display = "flex";
      searchForm.style.flexDirection = "row";
      searchForm.style.justifyContent = "space-between";
      searchForm.style.alignItems = "center";
      searchForm.style.gap = "15px";
      searchFormAction.style.width = "70%";

      searchFormInputs.forEach((el) => {
        const inputValue = el.querySelector(".input-value");
        if (inputValue) {
          inputValue.style.width = filterClicked ? "100%" : "90%";  // عرض أكبر في desktop بعد الفلتر
        }
      });

      // ✅ Tablet+ → set hr height to 30px
      searchFormAction.querySelectorAll("hr").forEach((hr) => {
        hr.style.height = "30px";
      });
    } else {
      // Mobile: stacked vertically فوق بعض
      searchForm.style.display = "flex";
      searchForm.style.flexDirection = "column";  // ✅ عمودي للـ inputs فوق بعض
      searchForm.style.alignItems = "stretch";   // ✅ تملأ العرض كامل
      searchForm.style.gap = "15px";             // ✅ مسافات بين الحقول

      searchFormAction.style.width = "100%";     // ✅ الـ action كامل العرض

      searchFormInputs.forEach((el) => {
        el.style.display = filterClicked ? "flex" : el.style.display;  // ✅ تأكيد الإظهار بعد الفلتر
        el.style.flexDirection = "column";       // ✅ كل input عمودي داخل نفسه
        el.style.alignItems = "stretch";

        const inputValue = el.querySelector(".input-value");
        if (inputValue) {
          inputValue.style.width = "90%";       // ✅ كامل العرض في mobile
          inputValue.style.flexDirection = "row";
          inputValue.style.justifyContent = "space-between";  // السهم في مكانه القديم
          inputValue.style.alignItems = "center";
          inputValue.style.gap = "10px";
        }
      });

      // ✅ Mobile → reset hr height
      searchFormAction.querySelectorAll("hr").forEach((hr) => {
        hr.style.height = "";
      });
    }

    // ✅ ضبط الـ selectContainers للـ stacking في mobile
    const selectContainers = searchForm.querySelectorAll(".select-container");
    selectContainers.forEach((sc) => {
      sc.style.display = "flex";
      sc.style.gap = "10px";

      if (window.innerWidth >= 768) {
        sc.style.flexDirection = "row";
        sc.style.justifyContent = "space-evenly";
        sc.style.alignItems = "center";
      } else {
        sc.style.flexDirection = "column";         // ✅ عمودي في mobile
        sc.style.alignItems = "flex-start";
        sc.style.justifyContent = "flex-start";
        sc.style.width = "100%";                   // ✅ كامل العرض
      }
    });

    // ✅ إعادة تطبيق العرض المتطابق في الـ responsive
    applyUniformWidth(dropdownContainers);
  }
  handleResponsiveLayout();
  window.addEventListener("resize", handleResponsiveLayout);
});