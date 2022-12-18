import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import { navEvents } from "../components/navevent.js";
import { alertMsg } from "./alertMsg.js";
import { check } from "./check.js";

let token = localStorage.getItem("user_token") || null;

var loggedIn;
var wishlist;
const windowOnload = async () => {
  document.getElementById("navigations").innerHTML = navbar();

  document.getElementById("footer").innerHTML = footer();

  navEvents();

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
wishlist = await windowOnload();
console.log(wishlist);
let category = localStorage.getItem("product_page") || null;

document.getElementById("cat1").innerHTML = `${category}`;
document.getElementById("cat2").innerHTML = `${category}  Sale`;

const getProducts = async () => {
  //console.log(category);
  var url;
  if (category == null) {
    url = "https://kars-stock.onrender.com/products";
  } else {
    url = `https://kars-stock.onrender.com/products?category=${category}`;
  }
  try {
    let result = await fetch(url);
    //limit=12&page=1
    //console.log(result);
    let data = await result.json();
    appendProducts(data.products);
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
};
getProducts();
const appendProducts = async(data) => {
  let data_div = document.getElementById("betright1");

  data.forEach(async(el) => {
    //console.log(el)
    let div = document.createElement("div");

    div.setAttribute("class", "singleProduct");

    let icon = document.createElement("i");

    // icon.innerHTML=f4c7;
    icon.setAttribute("class", "fa-solid fa-heart");

    icon.setAttribute("id", "fa-solid");
    if (loggedIn) {
   let {p,wishlistid}  =  await check(el._id, wishlist, icon);
    console.log(wishlistid)
    }
    icon.onclick = async function () {
      // let work="wishlist";

      if (p!==true) {
        if (token == null) {
          window.stop();
          alert("Login to add this to wishlist");
          window.location.href = "login.html";
        } else {
          let productId = el._id;
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
            icon.style.color = "red";
            alertMsg("Added to Favourites successfully", "success");
          }
        }
      } else {
      
        let Api = `https://kars-stock.onrender.com/wishlist/delete/${wishlistid}`;
        let data = await fetch(Api, {
          // api/user/myprofile    in return  status = success or status fail or error
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        data = await data.json();
        if (data.status == "error" || data.status == "fail") {
          window.stop();
          alert("Login to delete this item");
          window.location.href = "login.html"; //  alertMsg("please login")
        } else {
          icon.style.color = "none";
          alertMsg("Removed from Favourites successfully", "success");
        }
      }
    };
    let div2 = document.createElement("div");
    div2.setAttribute("class", "div2");

    let image = document.createElement("img");

    image.className = "imgPro";
    image.src = el.image;

    let d = document.createElement("p");
    d.innerHTML = "  " + `<i class="fa fa-angle-down"></i>` + "  " + "Details";
    d.onclick = () => {};
    let price = document.createElement("b");
    price.innerHTML = `Sale Starts at INR ${el.price}`;
    price.style.color = "red";

    let title = document.createElement("p");
    title.innerHTML = el.title;
    title.setAttribute("class", "small");
    let s = el.ratings;
    let star = document.createElement("div");

    for (let j = 0; j < s; j++) {
      let x = document.createElement("span");
      x.className = "fa fa-star checked";
      star.append(x);
    }
    div2.append(title, d);
    star.onclick = () => {
      localStorage.setItem("product_id", el._id);
      window.location.href = "product2.html";
    };
    price.onclick = () => {
      localStorage.setItem("product_id", el._id);
      window.location.href = "product2.html";
    };

    div.append(icon, image, price, star, div2);
    data_div.append(div);
  });
};
