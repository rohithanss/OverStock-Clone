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
     icon.setAttribute("class","fa-solid fa-heart");
    icon.onclick=function(){
      // window.location.
      icon.style.color="red";

    }
    let div2 = document.createElement("div");
    div2.setAttribute("class","div2")

    let image = document.createElement("img");

image.className="imgPro";
    image.src = el.image;

   
    let d = document.createElement("p");
    d.innerHTML ="  "+`<i class="fa fa-angle-down"></i>`+"  "+ "Details";
    d.onclick=()=>{
      
    }
    let price = document.createElement("b");
    price.innerHTML = `Sale Starts at INR ${el.price}`;
price.style.color="red";

    let title = document.createElement("p");
    title.innerHTML = el.title;
    title.setAttribute("class","small")
let s=el.ratings;
let star=document.createElement("div");

for(let j=0;j<s;j++){
let x=document.createElement("span");
x.className="fa fa-star checked";
star.append(x)
}
div2.append(title,d)
    div.append(icon,image, price,star, div2);
    data_div.append(div);
  });
};
