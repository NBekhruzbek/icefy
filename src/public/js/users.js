console.log("Users frontend javascript file");

document.addEventListener("DOMContentLoaded", function () {
  const profileToggle = document.getElementById("profileToggle");
  const profileDropdown = document.getElementById("profileDropdown");

  // Toggle dropdown on image click
  if (profileToggle && profileDropdown) {
    profileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".profile-wrapper")) {
        profileDropdown.classList.remove("active");
      }
    });

    // Close dropdown when clicking on logout
    const logoutLink = profileDropdown.querySelector(".logout-item");
    if (logoutLink) {
      logoutLink.addEventListener("click", function () {
        profileDropdown.classList.remove("active");
      });
    }
  }
});
