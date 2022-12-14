import navbar  from "../components/navbar.js";
import footer from "../components/footer.js";
document.getElementById("navigations").innerHTML = navbar()

document.getElementById("footer").innerHTML = footer()

document.getElementById("logo").onclick = ()=>{
    location.href = "/"
}