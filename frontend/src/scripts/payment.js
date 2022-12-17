import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import { navEvents } from "../components/navevent.js";
import { alertMsg } from "./alertMsg.js";
import cardpayment from "../components/cardpayment.js";
import { upipayment } from "../components/upipayment.js";
import { netbankingdetails } from "../components/netbankingdetail.js";
import { codpayment } from "../components/codpayment.js";

const token = localStorage.getItem("user_token");
const api = "https://kars-stock.onrender.com/";

document.getElementById("navigations").innerHTML = navbar();

document.getElementById("footer").innerHTML = footer();

document.getElementById("dopayment").innerHTML = cardpayment();

navEvents();

let card_div = document.getElementById("craditcard");

card_div.addEventListener("click", () => {
  document.getElementById("dopayment").innerHTML = cardpayment();
});

let upi_div = document.getElementById("upi");

upi_div.addEventListener("click", () => {
  document.getElementById("dopayment").innerHTML = upipayment();
});

let netb_div = document.getElementById("ibanking");

netb_div.addEventListener("click", () => {
  document.getElementById("dopayment").innerHTML = netbankingdetails();
});

let cod_div = document.getElementById("cod");

cod_div.addEventListener("click", () => {
  document.getElementById("dopayment").innerHTML = codpayment();
});

document.getElementById("paybutton").onclick = async () => {
  let cardNumber = document.getElementById("cardnumberbox").value;
  let carddate = document.getElementById("carddatebox").value;
  let cardcvv = document.getElementById("cardcvvbox").value;

  if (cardcvv == "" || cardNumber == "" || carddate == "") {
    alertMsg("fill all the fields", "error");

    return;
  }
  try {
    let res = await fetch(`${api}orders/place`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    res = await res.json();
    alertMsg(res.msg, res.status);
    if (res.status == "success") {
      setTimeout(() => {
        window.location.href = "index.html";
      }, 250);
    }
  } catch (err) {
    alertMsg("cannot place order right now try again later", "error");
    console.log(err);
  }
};
