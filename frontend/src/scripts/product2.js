import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import { navEvents } from "../components/navevent.js";
import { alertMsg } from "./alertMsg.js";
import { check } from "./check.js";

document.getElementById("navigations").innerHTML = navbar();

document.getElementById("footer").innerHTML = footer();

navEvents();

let token = localStorage.getItem("user_token") || null;

document.getElementById("btn1").onclick = () => {
  plusDivs(-1);
};
document.getElementById("btn2").onclick = () => {
  plusDivs(1);
};

var category = localStorage.getItem("category");
var productsid = localStorage.getItem("product_id");

document.getElementById("cat1").innerHTML = `${category}`;
document.getElementById("id").innerHTML = `#ITEM ${productsid}`;
var loggedIn;
var cart;
const windowOnload = async () => {
  try {
    if (token == null) {
      loggedIn = false;
    } else {
      let res = await fetch("https://kars-stock.onrender.com/cart", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      res = await res.json();
      if (res.status == "success") {
        loggedIn = true;
        return res.data;
      } else {
        loggedIn = false;
      }
    }
  } catch {
    loggedIn = false;
    console.log("error ");
  }
};

cart = await windowOnload();
console.log(cart);

var wishlist;
const windowOnload1 = async () => {
  try {
    if (token == null) {
      loggedIn = false;
    } else {
      let res = await fetch("https://kars-stock.onrender.com/wishlist", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      res = await res.json();
      if (res.status == "success") {
        loggedIn = true;
        return res.data;
      } else {
        loggedIn = false;
      }
    }
  } catch {
    loggedIn = false;
    console.log("error ");
  }
};
wishlist = await windowOnload1();
console.log(wishlist);


const showDivs = async (n) => {
  try {
    let result = await fetch(
      `https://kars-stock.onrender.com/products/${productsid}`
    );

    let data = await result.json();

    let el = data.product;
    //console.log(data);
    // let data_con = document.getElementById("details");

    let title = document.getElementById("title");
    title.innerHTML = el.title;

    // let star=document.getElementById("star");

    let flag = false;
    let r = +el.ratings;
    if ((r * 10) % 10 !== 0) {
      flag = true;
    }
    for (let i = 1; i <= r; i++) {
      let pstar = document.getElementById(`s${i}`);
      pstar.className = "fa fa-star checked";
      if (flag == true && i == r) {
        i++;
        let hstar = document.getElementById(`s${i}`);
        hstar.className = "fa-solid fa-heart";
      }
    }

    let price = document.getElementById("price");
    price.innerHTML = `Sale Starts at INR ${el.price}`;
    price.style.color = "red";

    let icon = document.getElementById("fav");

    check(productsid, wishlist, icon);

    let x = el.otherImages;

    let img_get = document.getElementById("slide");

    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    img_get.src = x[slideIndex - 1];

    let imgsee = document.getElementById("imgsee");
    imgsee.innerHTML = null;
    for (let i = 0; i < 5; i++) {
      let y = document.createElement("img");
      y.src = x[i];
      y.style.width = "17%";

      imgsee.append(y);
    }
    document.getElementById("fav").onclick = async () => {
      let icon = document.getElementById("heart");
      icon.style.color = "red";

      let productId = el._id;

      if (token == null) {
        window.stop();
        alert("Login to add this to wishlist");
        window.location.href = "login.html";
      } else {
        let Api = `https://kars-stock.onrender.com/wishlist/add/${productId}`;
        let data = await fetch(Api, {
          // api/user/myprofile    in return  status = success or status fail or error
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        data = await data.json();
        if (data.status == "error" || data.status == "fail") {
          window.stop();
          alert("Login to see this page");
          window.location.href = "login.html"; //  alertMsg("please login")
        } else {
          alertMsg("Added to Favourites successfully", "success");
        }
      }
      console.log(document.getElementById("addtocart"));
    };
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
};

let icon = document.getElementById("addtocart");
check(productsid, cart);
icon.onclick = async () => {
  console.log("click");

  let token = localStorage.getItem("user_token") || null;
 
  check(productsid, cart);

  if (token == null) {
    window.stop();
    alert("Login to add this to Cart");
    window.location.href = "login.html";
  } else {
    let quantity = document.getElementById("quantity").value;
    try {
      let Api = `https://kars-stock.onrender.com/cart/add/${productsid}?quantity=${quantity}`;
      let data = await fetch(Api, {
        // api/user/myprofile    in return  status = success or status fail or error
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data = await data.json();
      console.log(data);
      if (data.status == "error" || data.status == "fail") {
        window.stop();
        alert("Login to see this page");
        window.location.href = "login.html"; //  alertMsg("please login")
      } else {
        alertMsg("Item added to cart successfully", "success");
      }
    } catch (err) {
      alertMsg("error occured try agian or login agian", "fail");
    }
  }
};

// check(productsid, work, icon);

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}
