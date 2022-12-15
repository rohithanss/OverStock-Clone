
// export {redtocart}
function navEvents(){
document.querySelector(".cart_btn").onclick = ()=>{
    redtocart()
}
}
const redtocart=()=>{
    location.href = "/cart.html"
}

export {navEvents}