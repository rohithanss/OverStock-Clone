import { navBtnEvents } from "./navBtnEvents.js";
import { navbar } from "../components/navbar.js";
import { header } from "../components/header.js";
// const details = JSON.parse(localStorage.getItem("admin_details")) || null;

// -------------------------------- DEFAULT COMPONENTS APPENDING AND SETTING ----------------------------------

document.querySelector("nav").innerHTML = navbar();
document.querySelector("header").innerHTML = header();

// ------------------------------------- HEADER PROFILE ICON EVENT --------------------------------

document.getElementById("h_show-profile-menu").onclick = () => {
  let h_profileMenu = document.getElementById("h_profile_menu");
  if (h_profileMenu.style.display == "block") {
    h_profileMenu.style.display = "none";
  } else {
    h_profileMenu.style.display = "block";
  }
};

// ------------------------------------------ LOGOUT EVENT -------------------------------------

document.querySelector("#h_profile_menu>p:last-child").onclick = () => {
  localStorage.removeItem("admin_token");
  window.location.href = "login.html";
};

// ----------------------------------------- HAMBURGER EVENT ---------------------------------------

document.querySelector(".hamburger").onclick = () => {
  let nav = document.getElementById("nav");
  let overlay = document.getElementById("overlay");
  nav.classList.add("show-nav");
  overlay.style.display = "block";
};

// ========================================= DOCUMENT CLICK EVENT ====================================

document.onclick = (e) => {
  if (e.target.id != "profile_menu" && e.target.id != "show-profile-menu") {
    document.getElementById("profile_menu").style.display = "none";
  }
  if (e.target.id != "h_profile_menu" && e.target.id != "h_show-profile-menu") {
    document.getElementById("h_profile_menu").style.display = "none";
  }
  if (e.target.id == "overlay" || e.target.id == "hide-nav") {
    let nav = document.getElementById("nav");
    let overlay = document.getElementById("overlay");
    nav.classList.remove("show-nav");
    overlay.style.display = "none";
  }
  if (
    (e.target.id == "overlay" || e.target.id == "closePromtBox") &&
    e.target.id != "promtBox"
  ) {
    document.getElementById("overlay").style.display = "none";
  }
};

navBtnEvents();
