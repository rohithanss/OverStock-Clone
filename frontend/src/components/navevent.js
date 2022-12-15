// export {redtocart}
function navEvents() {
  document.getElementById("logo").onclick = () => {
    window.location.href = "/";
  };
  document.querySelector(".cart_btn").onclick = () => {
    window.location.href = "cart.html";
  };
  document.querySelector(".wishlist_btn").onclick = () => {
    window.location.href = "wishLish.html";
  };
  document.querySelector(".auth_btn").onclick = () => {
    window.location.href = "login.html";
  };
  document.querySelector(".refrigerator_page").onclick = () => {
    window.location.href = "product.html";
  };
}

export { navEvents };
