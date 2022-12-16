function navBtnEvents() {
  document.getElementById("orders").onclick = () => {
    window.location.href = "dashboard.html";
  };
  document.getElementById("products").onclick = () => {
    window.location.href = "admin_products.html";
  };
  document.getElementById("customers").onclick = () => {
    window.location.href = "admin_customers.html";
  };
  document.getElementById("show-profile-menu").onclick = () => {
    let profileMenu = document.getElementById("profile_menu");
    if (profileMenu.style.display == "block") {
      profileMenu.style.display = "none";
    } else {
      profileMenu.style.display = "block";
    }
  };

  document.querySelector("#profile_menu>p:last-child").onclick = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "login.html";
  };
}

export { navBtnEvents };
