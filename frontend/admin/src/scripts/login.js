import { alertMsg } from "./alertMsg.js";

const api = "https://kars-stock.onrender.com/admin/login";

const form = document.getElementById("admin_login_form");
window.onload = () => {
  form.onsubmit = (e) => {
    e.preventDefault();
    admin_login();
  };

  document.querySelector("#pass_div>i").onclick = (e) => {
    togglePasswordVisibility(e.target);
  };
};

async function admin_login() {
  let email = form.admin_email.value;
  let password = form.admin_password.value;
  if (email == "" || password == "") {
    alertMsg("Fields can not be empty", "fail");
    return;
  }
  try {
    let res = await fetch(api, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    res = await res.json();
    console.log(res);
    if (res.status == "fail" || res.status == "error") {
      alertMsg("Wrong Login Credentials", res.status);
      return;
    }
    localStorage.setItem("admin_token", res.token);
    window.location.href = "dashboard.html";
  } catch (err) {
    alertMsg("Try again later", "fail");
    return;
  }
}

function togglePasswordVisibility(btn) {
  let password_field = document.querySelector("#pass_div>input");
  let visibility = password_field.type;

  if (visibility == "text") {
    password_field.type = "password";
    btn.setAttribute("class", "fa-solid fa-eye-slash");
  } else {
    password_field.type = "text";
    btn.setAttribute("class", "fa-solid fa-eye");
  }
}
