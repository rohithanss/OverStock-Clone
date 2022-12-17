async function getProfile() {
  let profile = await fetch("https://kars-stock.onrender.com/admin/myprofile", {
    headers: {
      authorization: `bearer ${localStorage.getItem("admin_token")}`,
    },
  });
  profile = await profile.json();
  return profile;
}

const { full_name } = await getProfile();
let letter_icon = `${full_name.toUpperCase()[0]}`;
function navbar() {
  return `        <div><div>
<img src="https://i.ibb.co/BGP5CcH/KARS.png" alt="" />
<h4>KARS Stock</h4></div><i id="hide-nav" class="fa-solid fa-xmark"></i>
</div>
<div id="options">
<p id="orders">
  <i class="fa-sharp fa-solid fa-dollar-sign"></i> Orders
</p>
<p id="products">
  <i class="fa-solid fa-tag"></i>
  Products
</p>
<p id="customers"><i class="fa-solid fa-user"></i> Customers</p>
<p><i class="fa-solid fa-percent"></i> Discounts</p>
<p><i class="fa-solid fa-gift"></i> Gift Cards</p>
<p><i class="fa-solid fa-sack-dollar"></i> Pricing</p>
<p><i class="fa-solid fa-gear"></i> Settings</p>
</div>
<div id="team_members"><p>Your Profile</p>
<div>
  <div>
  <div class="letter_icon">${letter_icon}</div>
    <p>${full_name.split(" ")[0]}</p>
  </div>
  <i id="show-profile-menu" class="fa-solid fa-ellipsis-vertical"></i>
</div>
<div id="profile_menu" >
  <p>Edit Profile</p>
  <p>Log out</p>
</div>
</div>`;
}

export { navbar, letter_icon };
