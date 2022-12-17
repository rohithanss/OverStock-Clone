import { letter_icon } from "../components/navbar.js";

function header() {
  return `   <div id="logo_name"><i class="fa-solid fa-bars hamburger"></i>
  <img src="/images/logo-white.png" alt="" />
  <h4>KARS Stock</h4>
  </div> <div id="searchBar">
    <i class="fa-solid fa-magnifying-glass"></i>
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Search anything..."
    />
  </div>
  <div>
    <i class="fa-regular fa-circle-question"></i
    ><i class="fa-sharp fa-regular fa-bell"></i>
    <div class="letter_icon" id="h_show-profile-menu">${letter_icon}</div>
  </div>
  <div id="h_profile_menu" >
  <p>Edit Profile</p>
  <p>Log out</p>
</div>
  `;
}

export { header };
