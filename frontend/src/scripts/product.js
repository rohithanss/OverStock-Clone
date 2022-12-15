import navbar  from "../components/navbar.js";
import footer from "../components/footer.js";
document.getElementById("navigations").innerHTML = navbar()

document.getElementById("footer").innerHTML = footer()

document.getElementById("logo").onclick = ()=>{
    location.href = "/"
}


const getProducts=async()=>{
try{
let result=await fetch(`http://localhost:7010/products?category=refrigerator`)

console.log(result)
let data= await result.json()
appendProducts(data.products)
}
catch(err){
console.log(err)
console.log("Something went wrong")
}
}
getProducts()
const appendProducts=(data)=>{
   let data_div=document.getElementById("betright1")

    data.forEach((el)=>{
       let div=document.createElement("div");
       div.setAttribute("class","singleProduct")
        let image=document.createElement("img");
        image.class="imagepro";
        image.src=el.image;
        image.style.width="340px";
        let price=document.createElement("b");
        price.innerHTML=`Sale Starts at INR ${el.price}`

        let title=document.createElement("p");
        title.innerHTML=el.title;
       div.append(image,price,title)
       data_div.append(div)
     })

}




