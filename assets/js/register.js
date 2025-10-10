let title = document.getElementById("title-rest"),
  content = document.getElementById("content-rest");

document.addEventListener("DOMContentLoaded", () => {
  const pinStatus = sessionStorage.getItem("PIN_status") === "true";

  function applyLayout() {
    if (pinStatus) {
      // Always hide description when PIN is verified
      document.getElementById("register-desc").style.display = "none";

      // Show complete registration
      document.querySelectorAll(".rest-form").forEach((el) => {
        el.style.display = "flex";
      });

      // Hide first step
      document.querySelectorAll(".first-reg").forEach((el) => {
        el.style.display = "none";
      });

      if (window.innerWidth >= 768) {
        // ✅ Desktop / Tablet layout
        document.getElementById("register-container-Id").style.width = "100%";
        document.getElementById("rest-register-logo").style.display = "none";
        document.getElementById("bg-rest-reg-bg").style.display = "block";

        const regContainer = document.getElementById("reg-container");
        regContainer.style.backgroundColor = "white";
        regContainer.style.boxShadow = "0px 0px 5px 0px rgba(196, 196, 196, 1)";
        regContainer.style.borderRadius = "15px";
        regContainer.style.padding = "8%";
        regContainer.style.width = "70%";

        const regForm = document.getElementById("reg-form");
        regForm.style.display = "flex";
        regForm.style.flexDirection = "row";
        regForm.style.justifyContent = "space-between";
        regForm.style.flexWrap = "wrap";
        regForm.style.gap = "7px";

        document.querySelectorAll(".rest-form").forEach((el) => {
          el.style.width = "49%";
          el.style.boxSizing = "border-box"; // prevents overflow
        });
      } else {
        // ✅ Mobile layout (reset desktop overrides)
        document.getElementById("register-container-Id").style.width = "";
        document.getElementById("rest-register-logo").style.display = "";
        document.getElementById("bg-rest-reg-bg").style.display = "none";

        const regContainer = document.getElementById("reg-container");
        regContainer.style.boxShadow = "";
        regContainer.style.backgroundColor = "";
        regContainer.style.borderRadius = "";
        regContainer.style.padding = "";
        regContainer.style.width = "";

        const regForm = document.getElementById("reg-form");
        regForm.style.display = "flex";
        regForm.style.flexDirection = "column";
        regForm.style.justifyContent = "flex-start";
        regForm.style.flexWrap = "nowrap";
        regForm.style.gap = "";

        document.querySelectorAll(".rest-form").forEach((el) => {
          el.style.width = "100%";
        });
      }

      // Update text
      title.innerHTML = "استكمل بيانات المنشأة والمفوض";
      content.innerHTML =
        "بعد التحقق من رقم السجل، نحتاج بعض المعلومات الأساسية لإكمال إنشاء الحساب. يرجى تعبئة الحقول التالية بدقة.";
    } else {
      // Default → show first step, hide rest
      document.querySelectorAll(".first-reg").forEach((el) => {
        el.style.display = "flex";
      });

      document.querySelectorAll(".rest-form").forEach((el) => {
        el.style.display = "none";
      });

      document.getElementById("register-desc").style.display = "";
    }

    if (typeof adjustFooterPosition === "function") {
      adjustFooterPosition();
    }
  }

  // Run on load
  applyLayout();

  // Run on resize (so inspect responsive works too)
  window.addEventListener("resize", applyLayout);
});
