document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchFormInputs = searchForm.querySelectorAll(".search-form-input");
  const searchFormAction = searchForm.querySelector(".search-form-action");
  const filterBtnWrapper =
    searchFormAction.querySelector("div i.fa-filter").parentElement;

  const filterHr = filterBtnWrapper.nextElementSibling;
  const selectContainers = searchForm.querySelectorAll(".select-container");
  const searchSubcontainer = searchForm.querySelector(".search-subcontainer");

  let filterClicked = false;

  //  Default state
  searchFormInputs.forEach((el, i) => {
    if (i < 2) {
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

  filterBtnWrapper.addEventListener("click", () => {
    filterClicked = true;

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

    filterBtnWrapper.style.display = "none";

    if (filterHr && filterHr.tagName === "HR") {
      filterHr.style.display = "none";
    }

    handleResponsiveLayout();
  });

  //  Responsive layout handler
  function handleResponsiveLayout() {
    if (window.innerWidth >= 768) {
      searchForm.style.display = "flex";
      searchForm.style.flexDirection = "row";
      searchForm.style.justifyContent = "space-between";
      searchForm.style.alignItems = "center";
      searchForm.style.gap = "15px";

      searchFormAction.style.width = "40%";

      if (searchSubcontainer) {
        searchSubcontainer.style.display = "flex";
        searchSubcontainer.style.alignItems = "center";
      }

      searchFormInputs.forEach((el) => {
        const inputValue = el.querySelector(".input-value");
        if (inputValue) {
          inputValue.style.width = filterClicked ? "80%" : "90%";
        }
      });

      // Tablet+ → set hr height to 30px
      searchFormAction.querySelectorAll("hr").forEach((hr) => {
        hr.style.height = "30px";
      });
    } else {
      searchForm.style.display = "flex";
      searchForm.style.flexDirection = "column";
      searchForm.style.gap = "15px";

      searchFormAction.style.width = "100%";
      if (searchSubcontainer) {
        searchSubcontainer.style.display = "flex";
        searchSubcontainer.style.alignItems = "flex-start";
      }

      searchFormInputs.forEach((el) => {
        const inputValue = el.querySelector(".input-value");
        if (inputValue) {
          inputValue.style.width = "90%";
        }
      });

      //  Mobile → reset hr height
      searchFormAction.querySelectorAll("hr").forEach((hr) => {
        hr.style.height = "";
      });
    }

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
      }
    });
  }

  handleResponsiveLayout();
  window.addEventListener("resize", handleResponsiveLayout);
});
