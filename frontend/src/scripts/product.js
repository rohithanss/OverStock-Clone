import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import { navEvents } from "../components/navevent.js";
import { alertMsg } from "./alertMsg.js";

window.onload = () => {
  document.getElementById("navigations").innerHTML = navbar();

  document.getElementById("footer").innerHTML = footer();

  navEvents();
};
let category="Mirrors";

document.getElementById("cat1").innerHTML=`${category}`;
document.getElementById("cat2").innerHTML=`${category}  Sale`;

const getProducts = async () => {
  try {
    let result = await fetch(
      `https://kars-stock.onrender.com/products?${category}`
    );

    console.log(result);
    let data = await result.json();
    appendProducts(data.products);
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
};
getProducts();
const appendProducts = (data) => {
  let data_div = document.getElementById("betright1");

  data.forEach((el) => {
    let div = document.createElement("div");
    div.onclick = () => {
      localStorage.setItem("product_id", el._id);
      window.location.href = "product2.html";
    };

    div.setAttribute("class", "singleProduct");

    let icon = document.createElement("i");
    // icon.innerHTML=f4c7;
     icon.setAttribute("class","fa-light fa-circle-heart");

    let image = document.createElement("img");

image.className="imgPro";
    image.src = el.image;


    let price = document.createElement("b");
    price.innerHTML = `Sale Starts at INR ${el.price}`;
price.style.color="red";
    let title = document.createElement("p");
    title.innerHTML = el.title;
    title.setAttribute("class","small")

    div.append(icon,image, price, title);
    data_div.append(div);
  });
};
