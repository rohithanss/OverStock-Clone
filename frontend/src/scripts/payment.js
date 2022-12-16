import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import { navEvents } from "../components/navevent.js";
import { alertMsg } from "./alertMsg.js";

const token = localStorage.getItem("user_token");

window.onload = () => {
  document.getElementById("navigations").innerHTML = navbar();

  document.getElementById("footer").innerHTML = footer();

  navEvents();
};






let card_div=document.getElementById("craditcard");

card_div.addEventListener("click",()=>{
    let methodn_div=document.createElement("div");
    let method_name=document.createElement("")
})