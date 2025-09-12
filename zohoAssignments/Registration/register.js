document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const terms = document.getElementById("terms");

  const firstNameError = document.getElementById("firstName-error");
  const lastNameError = document.getElementById("lastName-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");
  const passwordError = document.getElementById("password-error");
  const termsError = document.getElementById("terms-error");

  const togglePasswordIcon = document.getElementById("togglePasswordIcon");

  // --- Restrict first/last name inputs to letters only ---
  firstName.addEventListener("input", () => {
    firstName.value = firstName.value.replace(/[^A-Za-z]/g, "");
  });

  lastName.addEventListener("input", () => {
    lastName.value = lastName.value.replace(/[^A-Za-z]/g, "");
  });

  // --- Password toggle visibility ---
  togglePasswordIcon.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      togglePasswordIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      password.type = "password";
      togglePasswordIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });

  // --- Password live strength checker ---
  password.addEventListener("input", () => {
    const value = password.value;
    let strength = "";

    if (value.length === 0) {
      strength = "";
    } else if (value.length < 8) {
      strength = "Your Password is Weak";
    } else {
      const hasLower = /[a-z]/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const checksPassed = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
        Boolean
      ).length;

      if (checksPassed <= 2) strength = "Your Password is Weak";
      else if (checksPassed === 3) strength = "Your Password is Normal";
      else if (checksPassed === 4) strength = "Your Password is Strong";
    }

    passwordError.textContent = strength;
    passwordError.style.color =
      strength === "Your Password is Weak"
        ? "#FF0000"
        : strength === "Your Password is Normal"
        ? "#FFA23A"
        : strength === "Your Password is Strong"
        ? "#1CB75E"
        : "";
  });

  // --- Form validation ---
  registerForm.addEventListener("submit", (e) => {
    let valid = true;

    // First Name
    if (firstName.value.trim().length < 2) {
      firstNameError.textContent = "First name must be at least 2 characters.";
      valid = false;
    } else {
      firstNameError.textContent = "";
    }

    // Last Name
    if (lastName.value.trim().length < 2) {
      lastNameError.textContent = "Last name must be at least 2 characters.";
      valid = false;
    } else {
      lastNameError.textContent = "";
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    // Phone
    if (!/^\d{10}$/.test(phone.value)) {
      phoneError.textContent =
        "Phone number must be exactly 10 digits of numbers.";
      valid = false;
    } else {
      phoneError.textContent = "";
    }

    // Password
    const pwdValue = password.value;
    const hasLower = /[a-z]/.test(pwdValue);
    const hasUpper = /[A-Z]/.test(pwdValue);
    const hasNumber = /\d/.test(pwdValue);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwdValue);
    const checksPassed = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
      Boolean
    ).length;

    if (pwdValue.length < 8 || checksPassed < 3) {
      passwordError.textContent =
        "Password must be at least 8 characters and include upper, lower, number.";
      passwordError.style.color = "red";
      valid = false;
    }

    // Terms
    if (!terms.checked) {
      termsError.textContent = "You must agree to the terms.";
      valid = false;
    } else {
      termsError.textContent = "";
    }

    if (!valid) {
      e.preventDefault();
    }
  });
});
