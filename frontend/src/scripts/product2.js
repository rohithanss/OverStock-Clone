import navbar  from "../components/navbar.js";
import footer from "../components/footer.js";
document.getElementById("navigations").innerHTML = navbar()

document.getElementById("footer").innerHTML = footer()

document.getElementById("logo").onclick = ()=>{
    location.href = "/"
}


const getProduct=async()=>{
    try{
    let result=await fetch(` http://localhost:3000/product2`)
    
    let data=await result.json()
    console.log(data)
    appendProduct(data)
    }
    catch(err){
    console.log(err)
    console.log("Something went wrong")
    }
    }

    getProduct()

    const appendProduct=(el)=>{
        let data_div=document.getElementById("")
   
             let image=document.createElement("img");
             image.class="imagepro";
             image.src=el.image;
            image.style.width="340px";
             let price=document.createElement("b");
             price.innerHTML=`Sale Starts at INR ${el.price}`
     
             let title=document.createElement("p");
             title.innerHTML=el.title;
            data_div.append(image,price,title)
        
          }
     
     