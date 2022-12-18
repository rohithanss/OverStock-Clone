import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import { navEvents } from "../components/navevent.js";
import { alertMsg } from "./alertMsg.js";
import cardpayment from "../components/cardpayment.js";
import { upipayment } from "../components/upipayment.js";
import { netbankingdetails } from "../components/netbankingdetail.js";
import { codpayment } from "../components/codpayment.js";
import { bagdetail } from "../components/bagdetails.js";

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
  let usermobile = document.getElementById("usermobile").value;
  let useraddress = document.getElementById("useraddress").value;
  if (
    cardcvv == "" ||
    cardNumber == "" ||
    carddate == "" ||
    usermobile == "" ||
    useraddress == ""
  ) {
    alertMsg("fill all the fields", "error");

    return;
  }
  try {
    let res = await fetch(`${api}orders/place`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ mobile: usermobile, address: useraddress }),
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

document.getElementById("bagdetailbox").innerHTML = bagdetail();

let totalitems = localStorage.getItem("total_itam");
let totalprice = localStorage.getItem("your_total");

let titam = document.getElementById("titam");
titam.innerHTML = totalitems + " items";
titam.style.color = "rgb(163,170,177)";

let useraddress = document.getElementById("useraddress");
useraddress.innerText = "plot no. b-90 jaipur";
useraddress.style.color = "rgb(163,170,177)";

let tprice = document.getElementById("tprice");
tprice.innerHTML = "INR " + totalprice;
tprice.style.color = "rgb(163,170,177)";
