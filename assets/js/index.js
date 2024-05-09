//change nav menu icon
document.getElementById("navbarToggle").addEventListener("click", () => {
  const menuIcon = document.getElementById("menuIcon");
  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
});

//   toaster
function showToast(message, success) {
  var toastContainer = document.getElementById("toast-container");
  var toast = document.createElement("div");
  if (success == true) {
    toast.className = "success-toast";
  } else {
    toast.className = "err-toast";
  }
  toast.textContent = message;
  toastContainer.appendChild(toast);

  // Remove the toast after a certain time
  setTimeout(function () {
    toastContainer.removeChild(toast);
  }, 3000);
}

// Function to toggle between sign-up and login forms
const toggleForms = () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  signupForm.classList.toggle("hidden");
  loginForm.classList.toggle("hidden");
};

// Event listeners for modal toggling
document.querySelectorAll("[data-modal-toggle]").forEach((item) => {
  item.addEventListener("click", () => {
    const target = document.getElementById(item.dataset.modalTarget);
    if (target) {
      target.classList.toggle("hidden");
    }
  });
});

document.querySelectorAll("[data-modal-hide]").forEach((item) => {
  item.addEventListener("click", () => {
    const target = document.getElementById(item.dataset.modalHide);
    if (target) {
      target.classList.add("hidden");
    }
  });
});

// Event listener for toggling between sign-up and login forms
document.getElementById("toggleLogin").addEventListener("click", (event) => {
  event.preventDefault(); 
  toggleForms(); 
});

document.getElementById("toggleRegister").addEventListener("click", (event) => {
  event.preventDefault(); 
  toggleForms(); 
});

// Event listener for signup form submission
document
  .getElementById("signupForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const password1 = formData.get("password1");
    const password2 = formData.get("password2");
    if (password1 !== password2) {
      // Passwords don't match, show an alert
      showToast("Password and confirm password doesn't match!");
      return;
    }
    const response = await fetch("/signup/", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": "{{ csrf_token }}", // Include CSRF token
      },
    });
    if (response.ok) {
      showToast("User resigter successfully!", true);
      toggleForms();
    } else {
      if (response.status == 400)
        showToast("username or email already exist!", false);
    }
  });

// Event listener for login form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("/login/", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": "{{ csrf_token }}", // Include CSRF token
      },
    });
    if (response.ok) {
      if (response.status === 202) {
        showToast("Login successfully!", true);
        setTimeout(() => {
          location.reload();
        }, 3000);
      } else if (response.status == 400) {
        showToast("Invalid username or password!", false);
      }
    } else {
      if (response.status == 400) {
        showToast("Invalid username or password!", false);
      } else {
        showToast("Something wrong reload the page!", false);
      }
    }
  });
