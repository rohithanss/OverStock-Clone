import footer from "../components/footer.js";
import navbar from "../components/navbar.js";
import { navEvents } from "../components/navevent.js";

document.getElementById("navigations").innerHTML = navbar();

document.getElementById("footer").innerHTML = footer();
navEvents();
