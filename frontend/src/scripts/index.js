import footer from "../components/footer.js";
import navbar  from "../components/navbar.js";
import { navEvents} from "../components/navevent.js";
console.log(document.getElementById("redtocart"))


document.getElementById("navigations").innerHTML = navbar()

document.getElementById("footer").innerHTML = footer()

document.getElementById("logo").onclick = ()=>{
    location.href = "/"
}




window.onload =()=>{
    navEvents()
}