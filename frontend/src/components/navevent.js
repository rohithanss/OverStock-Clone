// export {redtocart}
function navEvents() {
  document.getElementById("logo").onclick = () => {
    window.location.href = "/";
  };
  document.querySelector(".cart_btn").onclick = () => {
    window.location.href = "cart.html";
  };
  document.querySelector(".wishlist_btn").onclick = () => {
    localStorage.setItem("page_name", "Mylist");
    window.location.href = "Overview.html";
  };
  let auth_btn = document.querySelector(".auth_btn");
  auth_btn.onclick = () => {
    console.log(auth_btn.textContent);
    if (auth_btn.textContent == "Signup/Login") {
      window.location.href = "login.html";
    } else {
      window.location.href = "Overview.html";
    }
  };
  document.querySelector(".furnitureProducts").onclick = () => {
    localStorage.setItem("product_page", "bed");
    // window.location.href = "product.html";
  };
  document.querySelectorAll(".furnitureProducts h4").forEach((el) => {
    el.onclick = () => {
      localStorage.setItem("product_page", "bed");
      // window.location.href = "product.html";
    };
  });

  document.querySelectorAll(".furnitureProducts a").forEach((el) => {
    el.onclick = () => {
      localStorage.setItem("product_page", "bed");
      // window.location.href = "product.html";
    };
  });
  document.querySelector(".artProducts").onclick = () => {
    localStorage.setItem("product_page", "art");
    // window.location.href = "product.html";
  };
  document.querySelectorAll(".artProducts h4").forEach((el) => {
    el.onclick = () => {
      localStorage.setItem("product_page", "art");
      // window.location.href = "product.html";
    };
  });

  document.querySelectorAll(".artProducts a").forEach((el) => {
    el.onclick = () => {
      localStorage.setItem("product_page", "art");
      // window.location.href = "product.html";
    };
  });
  document.querySelector(".kitchenProducts").onclick = () => {
    localStorage.setItem("product_page", "refrigerator");
    // window.location.href = "product.html";
  };
  document.querySelectorAll(".kitchenProducts h4").forEach((el) => {
    el.onclick = () => {
      localStorage.setItem("product_page", "refrigerator");
      // window.location.href = "product.html";
    };
  });

  document.querySelectorAll(".kitchenProducts a").forEach((el) => {
    el.onclick = () => {
      localStorage.setItem("product_page", "refrigerator");
      // window.location.href = "product.html";
    };
  });
  document.querySelector(".mirrorProducts").onclick = () => {
    localStorage.setItem("product_page", "mirror");
    // window.location.href = "product.html";
  };
  document.querySelectorAll(".mirrorProducts h4").forEach((el) => {
    el.onclick = () => {
      localStorage.setItem("product_page", "mirror");
      // window.location.href = "product.html";
    };
  });

  document.querySelectorAll(".mirrorProducts a").forEach((el) => {
    el.onclick = () => {
      localStorage.setItem("product_page", "mirror");
      // window.location.href = "product.html";
    };
  });
}

export { navEvents };
