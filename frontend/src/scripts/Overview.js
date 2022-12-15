


import navbar  from "../components/navbar.js";
import footer from "../components/footer.js";
document.getElementById("navigations").innerHTML = navbar()

document.getElementById("footer").innerHTML = footer()

document.getElementById("logo").onclick = ()=>{
    location.href = "/"
}



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
    window.location = "";
  });
  document.getElementById("OrdersandReturns").addEventListener("click", () => {
    window.location = "./order.html";
  });
