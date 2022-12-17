import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import { navEvents } from "../components/navevent.js";
import { alertMsg } from "./alertMsg.js";
import cardpayment from "../components/cardpayment.js"
import { upipayment } from "../components/upipayment.js";
import {netbankingdetails} from "../components/netbankingdetail.js"
import { codpayment } from "../components/codpayment.js";


const token = localStorage.getItem("user_token");

window.onload = () => {
  document.getElementById("navigations").innerHTML = navbar();

  document.getElementById("footer").innerHTML = footer();

  document.getElementById("dopayment").innerHTML=cardpayment();

  navEvents();
};






let card_div=document.getElementById("craditcard");

card_div.addEventListener("click",()=>{

   document.getElementById("dopayment").innerHTML=cardpayment();
   
   

})


let upi_div=document.getElementById("upi");

upi_div.addEventListener("click",()=>{

   document.getElementById("dopayment").innerHTML=upipayment();

})

let netb_div=document.getElementById("ibanking");

netb_div.addEventListener("click",()=>{

   document.getElementById("dopayment").innerHTML=netbankingdetails();

})




let cod_div=document.getElementById("cod");

cod_div.addEventListener("click",()=>{

   document.getElementById("dopayment").innerHTML=codpayment();

});


