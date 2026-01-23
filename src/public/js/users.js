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

$(function () {
  $(".member-status").on("change", function (e) {
    const id = e.target.id;
    console.log("id:", id);

    const memberStatus = $(`#${id}.member-status`).val();
    console.log("memberStatus:", memberStatus);

    axios
      .post("/admin/user/edit", { _id: id, memberStatus: memberStatus })
      .then((response) => {
        console.log("response:", response);
        const result = response.data;
        console.log("result:", result);

        if (result) {
          console.log("User updated!");
          $(".member-status").blur();
        } else alert("User update failed!");
      })
      .catch((err) => {
        console.log(err);
        alert("User update failed!");
      });
  });
});
