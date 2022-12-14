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
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2Mzk5YTdkM2Y3YTA3NGRmMTQxMDQ4ZTgiLCJpYXQiOjE2NzEwMjA0Nzd9.l31uwTvBfONgpBkP98RUcJqHubc-Ru5yi6YTAaPupiw",


        }

    })

    let data=await res.json();
    let adata=data.data;
    console.log(adata);
    append(adata);

    
}


post()




const append=(data)=>{
    let postdiv=document.getElementById("cproduct");
    postdiv.innerHTML="";

    data.forEach((ele)=>{
        let {productId: el} = ele;
        let card=document.createElement("div");
        postdiv.append(card);


        let image_div=document.createElement("div");

        let odetail_div=document.createElement("div");
        

        let image=document.createElement("img");
        image.src=el.image;

        let title=document.createElement("p");
        title.innerText=el.title;

        let color=document.createElement("p");
        color.innerText=el.color;
        color.style.fontSize="small"

        let price=document.createElement("h3");
        price.innerText="Sale INR  "+el.price;
        price.style.color="#c7212c"





        let quantity=document.createElement("select");
        quantity.innerHTML= option();
        quantity.id="quantity"
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
            updateProductQuantity(e.target.value,ele._id )
        }


        image_div.append(image)
        odetail_div.append(title,color,price, quantity)

        card.append(image_div,odetail_div)

       
    })
}


let x= document.getElementById("quantity");
console.log(x)



async function updateProductQuantity(value,id ){
    console.log(value, id)
}








// productId
// : 
// {_id: '6398144d62f78bae0ed9d0a3', title: "'Monoscape XLVII' Wrapped Canvas Wall Art by Karen Biery", image: 'https://ak1.ostkcdn.com/images/products/is/images/…VII%27-Wrapped-Canvas-Wall-Art-by-Karen-Biery.jpg', price: 4635, ratings: 5.8, …}
// quantity
// : 
// 1
// totalPrice
// : 
// 4635
// userId
// : 
// "6399a7d3f7a074df141048e8"
// __v
// : 
// 0
// _id
// : 
// "6399c1b5ba4db38889d86808"