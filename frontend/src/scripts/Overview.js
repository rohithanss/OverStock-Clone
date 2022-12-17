import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import { navEvents } from "../components/navevent.js";
import { alertMsg } from "./alertMsg.js";

// window.onload = () => {
//   document.getElementById("navigations").innerHTML = navbar();

//   document.getElementById("footer").innerHTML = footer();

//   navEvents();
// };

document.getElementById("navigations").innerHTML = navbar();

  document.getElementById("footer").innerHTML = footer();

  navEvents();

// import { alertMsg } from "./alertMsg.js";

// let res = {msg:"hi ", status: "success/fail/error"};

// alertMsg(res.msg, res.status)

document.getElementById("Overview").addEventListener("click", () => {
  window.location = "./Overview.html";
});
document.getElementById("MyReviews").addEventListener("click", () => {
  window.location = "";
});

document.getElementById("MyLists").addEventListener("click", () => {
  localStorage.setItem("page_name","Mylist")
  window.location = "./order.html";
});
document.getElementById("OrdersandReturns").addEventListener("click", () => {
  localStorage.setItem("page_name","")
  window.location = "./order.html";
});


