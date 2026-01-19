console.log("Products frontend javascript file");

// Profile dropdown toggle
const profileToggle = document.getElementById("profileToggle");
const profileDropdown = document.getElementById("profileDropdown");

if (profileToggle && profileDropdown) {
  profileToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    profileDropdown.classList.toggle("active");
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".profile-wrapper")) {
      profileDropdown.classList.remove("active");
    }
  });
}

// Image preview on upload
document.querySelectorAll(".image-input").forEach((input) => {
  input.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const preview = this.parentElement.querySelector(".image-preview");
      const previewImg = preview.querySelector(".preview-img");

      reader.onload = function (event) {
        previewImg.src = event.target.result;
        preview.style.display = "block";
        this.parentElement.querySelector(".upload-placeholder").style.display =
          "none";
      }.bind(this);

      reader.readAsDataURL(file);
    }
  });
});
