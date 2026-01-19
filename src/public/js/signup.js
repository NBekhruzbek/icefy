console.log("Signup frontend javascript file");
$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0];
      const fileType = uploadFile["type"];
      const validImageType = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpeg, jpg, and png!");
      } else {
        if (uploadFile) {
          console.log(URL.createObjectURL(uploadFile));
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success");
        }
        filename = $(this)[0].files[0].name;
      }
      $(this).siblings(".upload-name").val(filename);
    }
  });
});

function validateSingupForm() {
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password differs. please check!");
    return false;
  }

  const memberImage = $(".member-image").get(0).files[0]
    ? $(".member-image").get(0).files[0].name
    : null;
  if (!memberImage) {
    alert("Please insert Restaurant image!");
    return false;
  }
}

// Password validation script
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.querySelector(".member-password");
  const confirmPasswordInput = document.querySelector(".confirm-password");
  const signupForm = document.querySelector("form");

  // Create validation message elements
  const passwordContainer = passwordInput.parentElement;
  const confirmPasswordContainer = confirmPasswordInput.parentElement;

  // Password match indicator
  const matchIndicator = document.createElement("div");
  matchIndicator.className = "password-match-indicator";
  matchIndicator.id = "matchIndicator";
  confirmPasswordContainer.appendChild(matchIndicator);

  // Password strength indicator
  const strengthIndicator = document.createElement("div");
  strengthIndicator.className = "password-strength-container";
  strengthIndicator.innerHTML = `
    <div class="password-strength-bar">
      <div class="password-strength-fill"></div>
    </div>
    <span class="password-strength-text">Password strength: <span id="strengthText">Weak</span></span>
  `;
  passwordContainer.appendChild(strengthIndicator);

  // Check password match in real-time
  function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === "") {
      matchIndicator.innerHTML = "";
      matchIndicator.className = "password-match-indicator";
      return;
    }

    if (password === confirmPassword && confirmPassword !== "") {
      matchIndicator.innerHTML = "✓ Passwords match";
      matchIndicator.className = "password-match-indicator match";
      confirmPasswordInput.style.borderColor = "#4caf50";
    } else {
      matchIndicator.innerHTML = "✗ Passwords do not match";
      matchIndicator.className = "password-match-indicator mismatch";
      confirmPasswordInput.style.borderColor = "#f44336";
    }
  }

  // Check password strength
  function checkPasswordStrength() {
    const password = passwordInput.value;
    let strength = 0;
    const strengthFill = document.querySelector(".password-strength-fill");
    const strengthText = document.getElementById("strengthText");

    if (password.length === 0) {
      strengthFill.style.width = "0%";
      strengthFill.style.backgroundColor = "#ccc";
      strengthText.textContent = "";
      return;
    }

    // Check length
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;

    // Check for uppercase
    if (/[A-Z]/.test(password)) strength += 1;

    // Check for lowercase
    if (/[a-z]/.test(password)) strength += 1;

    // Check for numbers
    if (/[0-9]/.test(password)) strength += 1;

    // Check for special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 1;

    // Update strength bar
    let percentage = (strength / 6) * 100;
    let color = "";
    let text = "";

    if (strength <= 1) {
      color = "#f44336"; // Red
      text = "Weak";
    } else if (strength <= 3) {
      color = "#ff9800"; // Orange
      text = "Medium";
    } else if (strength <= 4) {
      color = "#ffc107"; // Yellow
      text = "Good";
    } else {
      color = "#4caf50"; // Green
      text = "Strong";
    }

    strengthFill.style.width = percentage + "%";
    strengthFill.style.backgroundColor = color;
    strengthText.textContent = text;
  }

  // Event listeners
  passwordInput.addEventListener("input", function () {
    checkPasswordStrength();
    checkPasswordMatch();
  });

  confirmPasswordInput.addEventListener("input", checkPasswordMatch);

  // Form submit validation
  signupForm.addEventListener("submit", function (e) {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const username = document.querySelector(".member-nick").value;
    const phone = document.querySelector(".member-phone").value;
    const image = document.querySelector(".member-image");

    // Validate all fields
    if (!username.trim()) {
      e.preventDefault();
      alert("Please enter username!");
      document.querySelector(".member-nick").focus();
      return;
    }

    if (!phone.trim()) {
      e.preventDefault();
      alert("Please enter phone number!");
      document.querySelector(".member-phone").focus();
      return;
    }

    if (password.length < 6) {
      e.preventDefault();
      alert("Password must be at least 6 characters!");
      passwordInput.focus();
      return;
    }

    if (password !== confirmPassword) {
      e.preventDefault();
      alert("Passwords do not match!");
      confirmPasswordInput.focus();
      return;
    }

    if (!image.files || image.files.length === 0) {
      e.preventDefault();
      alert("Please upload an image!");
      return;
    }

    // If all validation passes
    alert("Form submitted successfully!");
  });

  // Image preview
  const imageInput = document.querySelector(".member-image");
  const uploadImg = document.querySelector(".upload-img-frame");
  const uploadName = document.querySelector(".upload-name");

  imageInput.addEventListener("change", function (e) {
    const file = e.target.files[0];

    if (file) {
      // Check file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("Only JPG, JPEG, or PNG files are allowed!");
        imageInput.value = "";
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB!");
        imageInput.value = "";
        return;
      }

      // Show preview
      const reader = new FileReader();
      reader.onload = function (event) {
        uploadImg.src = event.target.result;
        uploadImg.style.borderColor = "#4caf50";
      };
      reader.readAsDataURL(file);

      // Update file name
      uploadName.value = file.name;
    }
  });
});
