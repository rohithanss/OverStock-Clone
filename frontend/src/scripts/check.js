async function check(id, work, icon) {
  try {
    let token = localStorage.getItem("user_token") || null;
    let Api = `https://kars-stock.onrender.com/${work}`;
    let data = await fetch(Api, {
      // api/user/myprofile    in return  status = success or status fail or error
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = await data.json();
    let res = data.data;
    if (data.status == "error" || data.status == "fail") {
      window.stop();
      alert("Login to see this page");
      window.location.href = "login.html"; //  alertMsg("please login")
    } else {
      for (let i = 0; i < res.length; i++) {
           console.log(res[i].productId._id,id)
        if (res[i].productId._id == id) {
          console.log("Yes");
              icon.style.color="red";
          icon.disabled = true;
             icon.onclick=()=>{
                 alert("Product already added");
        }
        }
      }
    }
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
}
export { check };
