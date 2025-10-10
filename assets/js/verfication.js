const formPinInput = document.querySelector(".form-pin-input"),
  pinInputs = document.querySelectorAll(".pin-input"),
  separator = document.querySelector(".separator"),
  pinError = document.getElementById("pin-error"),
  resendTimer = document.getElementById("resend-timer"),
  timerNumber = resendTimer.querySelector(".timer-number"),
  send_btn = document.getElementById("send-btn"),
  edit_num = document.getElementById("link-action-effect");

let timerInterval;

/* ✅ Start countdown */
function startTimer(duration) {
  let remaining = duration;
  timerNumber.innerText = remaining;

  timerInterval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      timerNumber.innerText = remaining;
    } else {
      clearInterval(timerInterval);
      resendTimer.innerHTML = "لم يصلك الكود بعد ؟";
    }
  }, 1000);
}

/* ✅ Run animation on page load if coming from login */
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  if (sessionStorage.getItem("animatePin") === "true") {
    setTimeout(() => {
      formPinInput.style.display = "flex"; // show PIN form
      separator.classList.add("show");

      pinInputs.forEach((input, index) => {
        setTimeout(() => {
          input.classList.add("show");
        }, (index + 1) * 200);
      });

      startTimer(60);
    }, 0);
    if (!window.location.pathname.endsWith("verfication.html")) {
      return;
    } else {
      sessionStorage.removeItem("animatePin");
    }
  }
});

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    console.log("test");
    sessionStorage.removeItem("animatePin");
  } else {
    return;
  }
});

edit_num.addEventListener("click", (e) => {
  e.preventDefault();
  if (sessionStorage.getItem("loc")) {
    window.location.href = `/${sessionStorage.getItem("loc")}.html`;
  }

  sessionStorage.removeItem("loc");
});

/* ✅ Validate PIN on send */
send_btn.addEventListener("click", (e) => {
  e.preventDefault();

  const loader = document.getElementById("loader");
  const btnText = send_btn.querySelector("div:first-child");

  const enteredPin = Array.from(pinInputs)
    .map((i) => i.value)
    .join("");

  let hasEmpty = false;

  // Check for empty fields
  pinInputs.forEach((el) => {
    if (el.value.trim() === "") {
      el.style.borderColor = "red";
      el.style.backgroundColor = "rgba(255,0,0,0.1)";
      hasEmpty = true;
    }
  });

  if (hasEmpty) {
    pinError.textContent = "يرجى ملء جميع الخانات";
    pinError.classList.add("show");
    return;
  }

  // Play loader
  btnText.style.display = "none";
  loader.style.display = "flex";
  send_btn.disabled = true;
  send_btn.classList.add("loading");

  setTimeout(() => {
    const locPage = sessionStorage.getItem("loc"); // get page location from sessionStorage

    if (enteredPin !== "123456") {
      // Wrong PIN
      pinError.textContent = "الرمز غير صحيح أو منتهي الصلاحية";
      pinError.classList.add("show");
      pinInputs.forEach((el) => {
        el.style.borderColor = "red";
        el.style.backgroundColor = "rgba(255,0,0,0.1)";
      });
    } else {
      // Correct PIN
      pinError.classList.remove("show");
      pinInputs.forEach((el) => {
        el.style.borderColor = "rgba(48,109,254,1)";
        el.style.backgroundColor = "rgba(48,109,254,0.1)";
      });

      // Set logged-in status in localStorage
      localStorage.setItem("isLoggedIn", "true");

      // Navigate depending on loc variable
      if (locPage === "login") {
        window.location.href = "index.html";
      } else if (locPage === "register") {
        window.location.href = "register.html";
      }

      sessionStorage.setItem("PIN_status", true);
      return;
    }

    // Restore button state after wrong PIN
    loader.style.display = "none";
    btnText.style.display = "flex";
    send_btn.disabled = false;
    send_btn.classList.remove("loading");
  }, 2500);
});

/* ✅ Handle PIN input behavior */
pinInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      // Filled → blue border + light blue bg
      input.style.borderColor = "rgba(48,109,254,1)";
      input.style.backgroundColor = "rgba(48,109,254,0.1)";
    } else {
      // Empty → reset default
      input.style.borderColor = "#ccc";
      input.style.backgroundColor = "var(--form-inp-color)";
    }

    // Auto focus next
    if (input.value && index < pinInputs.length - 1) {
      pinInputs[index + 1].focus();
    }
  });

  // Backspace navigation
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && index > 0) {
      pinInputs[index - 1].focus();
    }
  });
});
