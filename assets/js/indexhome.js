// filteration.js - معدل للـ form نفسه
document.addEventListener("DOMContentLoaded", () => {
  
  const searchForm = document.getElementById("search-form");
  const searchFormInputs = searchForm.querySelectorAll(".search-form-input");  
  const searchFormAction = searchForm.querySelector(".search-form-action");   
  const filterBtnWrapper = searchFormAction.querySelector("div i.fa-filter").parentElement;  
  const filterHr = filterBtnWrapper.previousElementSibling;  


  const categoryInput = document.getElementById("category");
  const countryInputContainer = document.getElementById("country-input");
  const companyInputContainer = document.getElementById("company-input");
  const countryChevron = countryInputContainer ? countryInputContainer.querySelector(".fa-chevron-down") : null;
  const companyChevron = companyInputContainer ? companyInputContainer.querySelector(".fa-chevron-down") : null;
  const countryUl = countryInputContainer ? countryInputContainer.querySelector("ul") : null;
  const companyUl = companyInputContainer ? companyInputContainer.querySelector("ul") : null;

 
  const brandContainer = searchForm.querySelector('input[name="brand"]').closest(".input-value");
  const categoryContainer = searchForm.querySelector('input[name="category"]').closest(".input-value");
  const countryContainer = countryInputContainer ? countryInputContainer.querySelector(".input-value") : null;
  const companyContainer = companyInputContainer ? companyInputContainer.querySelector(".input-value") : null;

  let filterClicked = false;

  
  function applyUniformWidth(inputContainers) {
    inputContainers.forEach((container) => {
      if (container) {
        // container.style.width = "100%"; 
        container.style.width = window.innerWidth < 768 ? "90%" : "100%";

        container.style.justifyContent = "space-between"; 
        const input = container.querySelector("input");
        if (input) {
          input.style.flex = "1";  
          input.style.width = "calc(100% - 30px)";  
        }
      }
    });
  }

  
  const dropdownContainers = [brandContainer, categoryContainer, countryContainer, companyContainer];
  applyUniformWidth(dropdownContainers);

 
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

 

function toggleDropdownInstant(ulElement, forceOpen = false) {
  if (!ulElement) return;

  // لو جاي أمر "افتح غصبًا" افتحها فقط
  if (forceOpen) {
    ulElement.style.display = "block";
    ulElement.style.opacity = "1";
    return;
  }

  // toggle عادي
  if (ulElement.style.display === "none" || ulElement.style.display === "") {
    ulElement.style.display = "block";
    ulElement.style.opacity = "1";
  } else {
    ulElement.style.display = "none";
  }
}


function closeAllDropdowns() {
  if (countryUl) countryUl.style.display = "none";
  if (companyUl) companyUl.style.display = "none";
}


if (countryChevron && countryUl) {
  const countryInputField = document.getElementById("country");
   

 
  countryChevron.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const categoryValue = (document.getElementById("category")?.value || "").trim();
    if (categoryValue === "أصلی") return;
    toggleDropdownInstant(countryUl);
  });

  // عند الضغط على الـ input نفسه
  if (countryInputField) {
    countryInputField.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
          const categoryValue = (document.getElementById("category")?.value || "").trim();
      if (categoryValue === "أصلی") return;
      // افتح القايمة فقط لو كانت مقفولة
      if (countryUl.style.display === "none" || countryUl.style.display === "")
        toggleDropdownInstant(countryUl, true);
    });
  }

  // عند اختيار عنصر من القايمة
  countryUl.querySelectorAll("li").forEach((li) => {
    li.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      countryInputField.value = li.textContent.trim();
      countryUl.style.display = "none"; 
    });
  });
}

//  شركة الصنع
if (companyChevron && companyUl) {
  const companyInputField = document.getElementById("company");
  

  // عند الضغط على الأيقونة
  companyChevron.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();
      const categoryValue = (document.getElementById("category")?.value || "").trim();
      if (categoryValue === "أصلی") return;
    toggleDropdownInstant(companyUl);
  });

  // عند الضغط على الـ input نفسه
  if (companyInputField) {
    companyInputField.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
        const categoryValue = (document.getElementById("category")?.value || "").trim();
      if (categoryValue === "أصلی") return;
      // افتح القايمة فقط لو كانت مقفولة
      if (companyUl.style.display === "none" || companyUl.style.display === "")
        toggleDropdownInstant(companyUl, true);
    });
  }

  // عند اختيار عنصر من القايمة
  companyUl.querySelectorAll("li").forEach((li) => {
    li.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      companyInputField.value = li.textContent.trim();
      companyUl.style.display = "none"; // اقفل القايمة بعد الاختيار
    });
  });
}

document.addEventListener("mousedown", (e) => {
  const isInsideDropdown =
    e.target.closest("#country-input") || e.target.closest("#company-input");

  if (!isInsideDropdown) {
    closeAllDropdowns();
  }
});



  
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

    
      applyUniformWidth(dropdownContainers);

    
      filterBtnWrapper.style.display = "none";
      if (filterHr && filterHr.tagName === "HR") {
        filterHr.style.display = "none";
      }

      handleResponsiveLayout();
    });
  }

  
  if (categoryInput) {
    const categoryUl = categoryInput.closest(".select-container").querySelector("ul");
    if (categoryUl) {
      categoryUl.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
          const selectedValue = e.target.textContent.trim();
          categoryInput.value = selectedValue;

          if (selectedValue === "أصلی") {
            // قفل الحقول الجديدة
            const countryInput = document.getElementById("country");
            const companyInput = document.getElementById("company");
            if (countryInput) {
              countryInput.readOnly = true;
              countryInput.value = "";  
              if (countryChevron) countryChevron.style.display = "none";  
              if (countryUl) countryUl.style.display = "none";  
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
              if (countryChevron) countryChevron.style.display = "block";  
              if (countryUl) countryUl.style.display = "none";  
            }
            if (companyInput) {
              companyInput.readOnly = false;
              if (companyChevron) companyChevron.style.display = "block";
              if (companyUl) companyUl.style.display = "none";
            }
          }

         
          applyUniformWidth(dropdownContainers);
        }
      });
    }
  }

 
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
          inputValue.style.width = filterClicked ? "100%" : "90%";  
        }
      });

      searchFormAction.querySelectorAll("hr").forEach((hr) => {
        hr.style.height = "30px";
      });
    } else {
      // Mobile: stacked vertically فوق بعض
      searchForm.style.display = "flex";
      searchForm.style.flexDirection = "column";  
      searchForm.style.alignItems = "stretch";   
      searchForm.style.gap = "15px";            

      searchFormAction.style.width = "100%";     

      searchFormInputs.forEach((el) => {
        el.style.display = filterClicked ? "flex" : el.style.display;  
        el.style.flexDirection = "column";      
        el.style.alignItems = "stretch";

        const inputValue = el.querySelector(".input-value");
        if (inputValue) {
          inputValue.style.width = "90%";      
          inputValue.style.flexDirection = "row";
          inputValue.style.justifyContent = "space-between";  
          inputValue.style.alignItems = "center";
          inputValue.style.gap = "10px";
        }
      });

      
      searchFormAction.querySelectorAll("hr").forEach((hr) => {
        hr.style.height = "";
      });
    }


    const selectContainers = searchForm.querySelectorAll(".select-container");
    selectContainers.forEach((sc) => {
      sc.style.display = "flex";
      sc.style.gap = "10px";

      if (window.innerWidth >= 768) {
        sc.style.flexDirection = "row";
        sc.style.justifyContent = "space-evenly";
        sc.style.alignItems = "center";
      } else {
        sc.style.flexDirection = "column";         
        sc.style.alignItems = "flex-start";
        sc.style.justifyContent = "flex-start";
        sc.style.width = "100%";                   
      }
    });

    
    applyUniformWidth(dropdownContainers);
  }
  handleResponsiveLayout();
  window.addEventListener("resize", handleResponsiveLayout);
});