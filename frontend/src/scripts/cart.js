const data=[
    {
    image_url:"https://ak1.ostkcdn.com/images/products/is/images/direct/4de7cd530f73638a351daf876ae132bef35c04f8/Danya-B.-11-inch-Indoor-Outdoor-Portable-Tabletop-Fire-Pit---Ethanol.jpg?impolicy=mediumlow",
    title:"Danya B. 11-inch Indoor/Outdoor Portable Tabletop Fire Pit",
    color:"black",
    price:4764.23
    },
    {
        image_url:"https://ak1.ostkcdn.com/images/products/is/images/direct/4de7cd530f73638a351daf876ae132bef35c04f8/Danya-B.-11-inch-Indoor-Outdoor-Portable-Tabletop-Fire-Pit---Ethanol.jpg?impolicy=mediumlow",
        title:"Danya B. 11-inch Indoor/Outdoor Portable Tabletop Fire Pit",
        color:"black",
        price:4764.23
    }

]


const append=(data)=>{
    let postdiv=document.getElementById("cproduct");
    postdiv.innerHTML="";

    data.forEach((el)=>{
        let card=document.createElement("div");
        postdiv.append(card);


        let image_div=document.createElement("div");

        let odetail_div=document.createElement("div");
        

        let image=document.createElement("img");
        image.src=el.image_url;

        let title=document.createElement("p");
        title.innerText=el.title;

        let color=document.createElement("p");
        color.innerText=el.color;
        color.style.fontSize="small"

        let price=document.createElement("h3");
        price.innerText="Sale INR  "+el.price;
        price.style.color="#c7212c"

        image_div.append(image)
        odetail_div.append(title,color,price)

        card.append(image_div,odetail_div)
    })
}


append(data)
