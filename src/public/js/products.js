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
  input.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Please insert only jpeg, jpg or png!");
      this.value = "";
      return;
    }

    const uploadBox = this.parentElement;
    const img = uploadBox.querySelector("img"); // upload.png turgan rasm

    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
      img.classList.remove("upload-placeholder"); // hira bo‘lmasin
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain"; // kesilmasin
    };

    reader.readAsDataURL(file);
  });
});

// Changing product-status option button colors
function setStatusBg(select) {
  select.classList.remove("bg-pause", "bg-process", "bg-delete");

  if (select.value === "PAUSE") select.classList.add("bg-pause");
  if (select.value === "PROCESS") select.classList.add("bg-process");
  if (select.value === "DELETE") select.classList.add("bg-delete");
}
// apply on page load
document.querySelectorAll(".new-product-status").forEach(setStatusBg);

$(".new-product-status").on("change", async function (e) {
  const id = e.target.id;
  const productStatus = $(`#${id}.new-product-status`).val();
  console.log("id:", id);
  console.log("productStatus: ", productStatus);

  try {
    const response = await axios.post(`/admin/product/${id}`, {
      productStatus: productStatus,
    });
    console.log("response: ", response);
    const result = response.data;
    if (result) {
      console.log("Product Updated!.");
      $(".new-product-status").blur();
    } else {
      alert("Product update failed!");
    }
  } catch (err) {
    console.log(err);
    alert("Product update failed!");
  }
});

// ---------------------------
function validateForm() {
  const productName = $(".product-name").val();
  const productDesc = $(".product-desc").val();
  const productPrice = $(".product-price").val();
  const productLeftCount = $(".product-left-count").val();
  const productCategory = $(".product-category").val();
  const productFlavor = $(".product-flavor").val();
  const productSize = $(".product-size").val();

  if (
    productName === "" ||
    productDesc === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCategory === "" ||
    productFlavor === "" ||
    productSize === ""
  ) {
    alert("Please insert all details!");
    return false;
  } else return true;
}

function previewFileHandler(input, order) {
  const file = input.files[0];
  if (!file) return;

  const validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(file.type)) {
    alert("Please insert only jpeg, jpg and png!");
    input.value = ""; // reset input
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.getElementById(`image-section-${order}`);
    if (img) {
      img.src = e.target.result;
      img.classList.remove("upload-placeholder"); // 🔥 MUHIM
    }
  };

  reader.readAsDataURL(file);
}

// ------------------------------
$(function () {
  $("#openFormBtn").on("click", () => {
    $(".icefy-container").slideToggle(500);
    $("#openFormBtn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".icefy-container").slideToggle(100);
    $("#openFormBtn").css("display", "flex");
  });
});
