import navbar  from "../components/navbar.js";
import footer from "../components/footer.js";
document.getElementById("navigations").innerHTML = navbar()

document.getElementById("footer").innerHTML = footer()

document.getElementById("logo").onclick = ()=>{
    location.href = "/"
}



const post=async()=>{

    const res=await fetch(`http://localhost:7010/cart`,{
        method:'GET',
        headers:{
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2Mzk5YTdkM2Y3YTA3NGRmMTQxMDQ4ZTgiLCJpYXQiOjE2NzEwODg0MDB9.avCkN2jMsbaw3g-4q6V7aJkC5EQ75An0fOMxQQo68zU",


        }

    })

    let data=await res.json();
    let adata=data.data;
    console.log(adata);
    append(adata);

    
}


post()




const append=async(data)=>{
    let postdiv=document.getElementById("cproduct");
    postdiv.innerHTML="";
    let yourtotal=0;
    let totalitam=0;

    data.forEach((ele)=>{
        let {productId: el} = ele;
        totalitam=totalitam+1;
        let card=document.createElement("div");
        postdiv.append(card);


        let image_div=document.createElement("div");

        let odetail_div=document.createElement("div");
        

        let image=document.createElement("img");
        image.src=el.image;

        let title=document.createElement("p");
        title.innerText=el.title;

        

        let price=document.createElement("h3");
        price.innerText="Sale INR  "+el.price;
        price.style.color="#c7212c"


        let pquantity=ele.quantity;
        let itamtotal=pquantity*el.price;
        yourtotal=yourtotal+itamtotal;


        let quantity=document.createElement("select");
        quantity.innerHTML= option();
        quantity.id="quantity"
        quantity.value = pquantity;
        function option(){
           return `
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>

            `  
        }
        
        quantity.onchange=(e)=>{
            
            pquantity=e.target.value;
             updateProductQuantity(pquantity,ele._id )
            // itamtotal=pquantity*el.price;
            //console.log(pquantity)
        }


        let button_div=document.createElement("div");
        button_div.id="cardbutton"

        let remove=document.createElement("button");
        remove.innerText="Remove";
        remove.addEventListener("click",()=>{
            removeitam(ele._id)

        })
        remove.style.cursor= "pointer";

        let saveleter=document.createElement("button");
        saveleter.innerText="Save For Later";
        saveleter.style.cursor= "pointer";
        saveleter.addEventListener("click",()=>{
            saveleteritam(ele._id)
        })

        button_div.append(remove,saveleter)
        image_div.append(image)
        odetail_div.append(title,price, quantity,button_div)
        

        card.append(image_div,odetail_div)
       
        //console.log(yourtotal)




        const checkout=()=>{
            let maindiv=document.getElementById("checkoutdetails");

            maindiv.innerHTML="";
        
            let itamdiv=document.createElement("div");
            itamdiv.id="itamdiv"
            let itam=document.createElement("p");
            itam.innerText=`(${totalitam})  Items :`
            let itamtotal=document.createElement("p");
            itamtotal.innerText="INR "+ yourtotal;

            itamdiv.append(itam,itamtotal)




            let cartline=document.createElement("div");
            cartline.id="cartline";
        
            

            let totaldiv=document.createElement("div");
            totaldiv.id="totaldiv";
             let ctotal=document.createElement("h3");
            ctotal.innerText="Your Total: "
            let gtotal=document.createElement("h3");
            gtotal.innerText="INR "+ yourtotal;

            totaldiv.append(ctotal,gtotal)

            let  checkoutbutton_div=document.createElement("div");
            checkoutbutton_div.id="checkoutbutton_div"
            let checkoutbutton=document.createElement("button");
            checkoutbutton.id="checkoutbutton";
            checkoutbutton.innerText="Check Out"
            
            checkoutbutton_div.append(checkoutbutton)
            
        
            maindiv.append(itamdiv,cartline,totaldiv,checkoutbutton_div)
        }
        checkout()

    })
}






async function updateProductQuantity(value,id ){
console.log(id)
    try{
        let res=await fetch(`http://localhost:7010/cart/update/${id}?quantity=${value}`,{
        method:"PATCH",
        headers:{
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2Mzk5YTdkM2Y3YTA3NGRmMTQxMDQ4ZTgiLCJpYXQiOjE2NzEwMjA0Nzd9.l31uwTvBfONgpBkP98RUcJqHubc-Ru5yi6YTAaPupiw",


        }
     })

     post();

    }
    catch(err){
        console.log(err);
    }
     
     
}



const removeitam=async(id)=>{

    try{
        let res=fetch(`http://localhost:7010/cart/delete/${id}`,{
            method:'DELETE',
            headers:{
                "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2Mzk5YTdkM2Y3YTA3NGRmMTQxMDQ4ZTgiLCJpYXQiOjE2NzEwODg0MDB9.avCkN2jMsbaw3g-4q6V7aJkC5EQ75An0fOMxQQo68zU",
            }

        })
        post();
    }
    catch(err){
        console.log(err);
    }

}


const saveleteritam=async(id)=>{

    try{
        let res=await fetch(`http://localhost:7010/wishlist/add/${id}`,{
            method:"POST",
            headers:{
                "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2Mzk5YTdkM2Y3YTA3NGRmMTQxMDQ4ZTgiLCJpYXQiOjE2NzEwODg0MDB9.avCkN2jMsbaw3g-4q6V7aJkC5EQ75An0fOMxQQo68zU",
            }

        });
        removeitam(id);
        post(); 

    }
    catch(err){
        console.log(err);
    }
}


//http://localhost:7010/cart/delete/6399c1b5ba4db38889d86808
// const checkout=()=>{
//     let maindiv=document.getElementById("checkoutdetails");

//     let itamdiv=document.createElement("div");
//     let itam=document.createElement("p");
//     itam.innerText=`(${totalitam})  Items`
//     let itamtotal=document.createElement("p");
//     itamtotal.innerText="INR "+ yourtotal;


//     itamdiv.append(itam,itamtotal)

//     maindiv.append(itamdiv)
// }


//  checkout();
