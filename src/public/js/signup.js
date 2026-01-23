console.log("Signup frontend javascript file");
$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0],
        fileType = uploadFile["type"],
        validImageType = ["image/jpg", "image/jpeg", "image/png"];
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
  const memberNick = $(".member-nick").val(),
    memberPhone = $(".member-phone").val(),
    memberPassword = $(".member-password").val(),
    confirmPassword = $(".confirm-password").val();

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
    alert("Password differs. Please check!");
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

  // Create validation message elements
  const confirmPasswordContainer = confirmPasswordInput.parentElement;

  // Password match indicator
  const matchIndicator = document.createElement("div");
  matchIndicator.className = "password-match-indicator";
  matchIndicator.id = "matchIndicator";
  confirmPasswordContainer.appendChild(matchIndicator);

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

  // Event listeners
  passwordInput.addEventListener("input", function () {
    checkPasswordMatch();
  });

  confirmPasswordInput.addEventListener("input", checkPasswordMatch);
});
