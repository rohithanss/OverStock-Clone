import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import { alertMsg } from "./alertMsg.js";

const api = "https://kars-stock.onrender.com/";
const loadingGif = `<img src="./admin/images/gg.gif" alt="" />`;
window.onload = () => {
  document.getElementById("navigations").innerHTML = navbar();

  document.getElementById("footer").innerHTML = footer();

  document.getElementById("logo").onclick = () => {
    location.href = "/";
  };

  let signup_form = document.getElementById("signup_form");
  inputFieldsValidation();
  signup_form.onsubmit = (e) => {
    e.preventDefault();

    signup(signup_form);
  };
  let login_form = document.getElementById("login_form");
  login_form.onsubmit = (e) => {
    e.preventDefault();

    login(login_form);
  };
};

async function signup(form) {
  let name = form.cname;
  let password = form.cpassword;
  let cpassword = form.ccpassword;
  let email = form.cemail;
  if (name.value.trim() == "") {
    name.style.border = `1px solid red`;
  }
  if (email.value.trim() == "") {
    email.style.border = `1px solid red`;
  }
  if (password.value.trim() == "") {
    password.style.border = `1px solid red`;
    cpassword.style.border = `1px solid red`;
  }

  if (
    name.value.trim() != "" &&
    email.value.trim() != "" &&
    password.value.trim() != "" &&
    password.value == cpassword.value
  ) {
    let btn = document.getElementById("signup_btn");
    btn.innerHTML = loadingGif;
    btn.disabled = true;
    btn.classList.add("signup_btn");
    try {
      let data = await fetch(`${api}user/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      });
      let res = await data.json();
      btn.innerHTML = "Create Account";
      btn.disabled = false;
      btn.classList.remove("signup_btn");

      alertMsg(res.msg, res.status);
    } catch (err) {
      btn.innerHTML = "Create Account";
      btn.disabled = false;
      btn.classList.remove("signup_btn");

      alertMsg("Something went wrong try again later", "error");
    }
  }
}
async function login(form) {
  let password = form.password;
  let email = form.email;

  if (email.value.trim() == "") {
    email.style.border = `1px solid red`;
  }
  if (password.value.trim() == "") {
    password.style.border = `1px solid red`;
  }

  if (email.value.trim() != "" && password.value.trim() != "") {
    let btn = document.getElementById("login_btn");
    btn.innerHTML = loadingGif;
    btn.disabled = true;
    btn.classList.add("login_btn");
    try {
      let data = await fetch(`${api}user/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
      let res = await data.json();
      btn.innerHTML = "Create Account";
      btn.disabled = false;
      btn.classList.remove("login_btn");
      if (res.status == "success") {
        localStorage.setItem("user_token", res.token);
      }
      alertMsg(res.msg, res.status);
    } catch (err) {
      btn.innerHTML = "Create Account";
      btn.disabled = false;
      btn.classList.remove("login_btn");

      alertMsg("Something went wrong try again later", "error");
    }
  }
}

function inputFieldsValidation() {
  let ccpassword = document.getElementById("ccpassword");
  let cpassword = document.getElementById("cpassword");
  let password = document.getElementById("password");
  let name = document.getElementById("cname");
  let cemail = document.getElementById("cemail");
  let email = document.getElementById("email");

  name.oninput = (e) => {
    if (e.target.value != "") {
      e.target.style.border = `1px solid gray `;
    }
  };
  cemail.oninput = (e) => {
    if (e.target.value != "") {
      e.target.style.border = `1px solid gray `;
    }
  };
  cpassword.oninput = (e) => {
    if (e.target.value != "" && e.target.value.length < 8) {
      e.target.style.border = `1px solid red`;
    } else {
      e.target.style.border = `1px solid gray `;
    }
  };
  email.oninput = (e) => {
    if (e.target.value != "") {
      e.target.style.border = `1px solid gray `;
    }
  };
  password.oninput = (e) => {
    if (e.target.value != "" && e.target.value.length < 8) {
      e.target.style.border = `1px solid red`;
    } else {
      e.target.style.border = `1px solid gray `;
    }
  };
  ccpassword.oninput = (e) => {
    let cpassword = document.getElementById("cpassword");
    if (
      (e.target.value != cpassword.value && e.target.value != "") ||
      e.target.value.length < 8
    ) {
      cpassword.style.border = `1px solid red`;
      e.target.style.border = `1px solid red`;
    } else {
      cpassword.style.border = `1px solid gray  `;
      e.target.style.border = `1px solid gray `;
    }
  };
}
