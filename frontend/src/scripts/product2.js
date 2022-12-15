import navbar  from "../components/navbar.js";
import footer from "../components/footer.js";
document.getElementById("navigations").innerHTML = navbar()

document.getElementById("footer").innerHTML = footer()

document.getElementById("logo").onclick = ()=>{
    location.href = "/"
}

document.getElementById("btn1").onclick = ()=>{
    plusDivs(-1)
}
document.getElementById("btn2").onclick = ()=>{
    plusDivs(1)
}
const productsid=localStorage.getItem("product_id");

const showDivs=async(n)=>{
    try{
    let result=await fetch(`https://kars-stock.onrender.com/products/${productsid}`)
    //  
    let data=await result.json()

   let el=(data.product);
  
   // let data_con=document.getElementById("details")

    let title=document.getElementById("title")
    title.innerHTML=el.title;

   // let star=document.getElementById("star");

        let flag=false;
            let r=+el.ratings;
            if((r*10)%10!==0){
           flag=true;
            }
            for(let i=1;i<=r;i++){
              let pstar=document.getElementById(`s${i}`);
              pstar.className="fa fa-star checked";
            if(flag==true && i==r){
                i++;
                let hstar=document.getElementById(`s${i}`);
              hstar.className="fa fa-star-half-full";  
            }
        }     
    
            let price=document.getElementById("price")
             price.innerHTML=`Sale Starts at INR ${el.price}`
             price.style.color="red"
     
    let x=el.otherImages;

    let img_get=document.getElementById("slide")

    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
   img_get.src= x[slideIndex-1]  

   let imgsee=document.getElementById("imgsee");
   imgsee.innerHTML=null;
   for(let i=0;i<5||x.length;i++){
   let y= document.createElement("img");
   y.src=x[i];
   y.style.width="17%";

    imgsee.append(y)
   }

    }
    catch(err){
    console.log(err)
    console.log("Something went wrong")
    }
    }


var slideIndex = 1;
showDivs(slideIndex);


function plusDivs(n) {
    showDivs(slideIndex += n);
  }
     
     