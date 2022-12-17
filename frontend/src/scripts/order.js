import navbar from "../components/navbar.js";
import footer from "../components/footer.js";
import { navEvents } from "../components/navevent.js";
import { alertMsg } from "./alertMsg.js";

document.getElementById("navigations").innerHTML = navbar();

document.getElementById("footer").innerHTML = footer();

navEvents();

let container = document.getElementById("orders");

let url = "https://kars-stock.onrender.com";
// let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2Mzk5ODU3MjEwYzU0MWYyNmNlMGIyZjciLCJpYXQiOjE2NzEwMTkwNTB9.FDA8NpDCWwVN0KuduzHEwQCiJ1Mk3VoSEmRwenskSkg";
let key = localStorage.getItem("user_token");
// import { alertMsg } from "./alertMsg.js";

// let res = {msg:"hi ", status: "success/fail/error"};

// alertMsg(res.msg, res.status)

let data = async () => {
  try {
    let res = await fetch(`${url}/orders`, {
      headers: {
        Authorization: `Authorization ${key}`,
      },
    });
    let data = await res.json();
    let new_data = data.data;
    console.log(data.data);
    append(new_data);
  } catch (err) {
    console.log(err);
    console.log("fail while featching");
  }
};

console.log("");

let append = (data) => {
  data.forEach((el) => {
    let div = document.createElement("div");
    div.className = "minicontainer";

    let name = document.createElement("h4");
    name.innerText = el.productId.title;
    name.className = "nameofOrde";

    let image = document.createElement("img");
    image.src = el.productId.image;
    image.className = "image_order";
    let status = document.createElement("p");
    status.innerText = `Status : ${el.orderStatus}`;
    status.className = "statusofOrder";

    let orderDate = document.createElement("p");

    let DAndT = el.createdAt;
    let DataOF_DandT = DAndT.split("T");
    let A = DataOF_DandT[0].split("-");
    let Date = A[2] + "/" + A[1] + "/" + A[0];

    orderDate.innerText = "Orderd On : " + Date;
    orderDate.className = "orderDate";

    let div3 = document.createElement("div");
    div3.className = "minicontainer3";

    let div2 = document.createElement("div");
    div2.className = "minicontainer2";

    let status_btn = document.createElement("button");
    let btnStatus;
    if (el.orderStatus == "delivered" || el.orderStatus == "Delivered") {
      btnStatus = "Return";
    } else if (el.orderStatus == "shipped" || el.orderStatus == "Shipped") {
      btnStatus = "Cancel";
    } else if (el.orderStatus == "cancelled" || el.orderStatus == "Cancelled") {
      btnStatus = "cancelled";
    } else if (el.orderStatus == "Placed" || el.orderStatus == "placed") {
      btnStatus = "Cancel";
    } else if (el.orderStatus == "shipped" || el.orderStatus == "Shipped") {
      btnStatus = "Cancel";
    } else {
      btnStatus = "Cancel";
    }

    status_btn.innerText = btnStatus;
    status_btn.className = "statusBtn";

    status_btn.addEventListener("click", () => {
      returnreq(el._id, el.orderStatus);
    });

    let buy_again = document.createElement("button");
    buy_again.innerText = "Buy it again";
    buy_again.className = "buyAgain";

    buy_again.addEventListener("click", () => {
      buyagain(el.productId._id);
    });
    div2.append(status_btn, buy_again);
    div3.append(name, status, orderDate);
    div.append(image, div3, div2);
    container.append(div);
  });
};

let returnreq = async (id, status) => {
  console.log("AAA");
  let Status;
  if (status == "delivered") {
    Status = "return";
  } else if (status == "shipped") {
    Status = "cancel";
  } else if (status == "cancelled") {
    Status = "cancel";
  } else if (status == "Placed") {
    Status = "cancel";
  } else if (status == "Shipped") {
    Status = "cancel";
  } else {
    Status = "cancel";
  }

  if (
    status == "Shipped" ||
    status == "shipped" ||
    status == "Placed" ||
    status == "delivered"
  ) {
    try {
      let responce = await fetch(`${url}/orders/${Status}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Authorization ${key}`,
        },
      });
      let data = await responce.json();
      // let res = { msg:data.msg, status: "success" };

      // alertMsg(res.msg, res.status);
      location.reload();
      console.log(data);
    } catch (err) {
      console.log("Error");
      console.log(err);
    }
  }
};

const buyagain = (id) => {
  console.log(id);
};

document.getElementById("Overview").addEventListener("click", () => {
  window.location = "./Overview.html";
});
document.getElementById("OrdersandReturns").addEventListener("click", () => {
  localStorage.setItem("page_name", "Order");
  location.reload();
});
// document.getElementById("MyReviews").addEventListener("click", () => {
//   window.location = "";
// });

document.getElementById("MyLists").addEventListener("click", () => {
  getData();
});

document.getElementById("Overview").style.backgroundColor = "white";

const getData = async () => {
  document.getElementById("MyLists").style.backgroundColor =
    "rgb(158, 112, 112)";
  document.getElementById("OrdersandReturns").style.backgroundColor = "white";
  document.getElementById("Overview").style.backgroundColor = "white";

  try {
    let res = await fetch(`${url}/wishlist`, {
      headers: {
        Authorization: `Authorization ${key}`,
      },
    });
    let data = await res.json();
    //   let new_data = data.data;
    console.log(data.data);
    appendData(data.data);
    //   append(new_data);
  } catch (err) {
    console.log("fail while featching fev List");
  }
};

const appendData = (data) => {
  container.innerHTML = null;
  let container1 = document.createElement("div");
  container1.setAttribute("id", "contentDiv");

  data.forEach((el) => {
    let div = document.createElement("div");
    div.className = "cards";

    let name = document.createElement("p");
    name.innerText = el.productId.title;
    name.className = "Name1";

    let image = document.createElement("img");
    image.src = el.productId.image;
    image.className = "image1";
    let minidiv = document.createElement("div");
    minidiv.className = "minidiv";
    minidiv.addEventListener("click", () => {
      remove(el._id);
    });

    let nameDiv = document.createElement("div");
    nameDiv.className = "nameDiv";

    let delimg = document.createElement("img");
    delimg.src =
      "https://w7.pngwing.com/pngs/271/838/png-transparent-computer-icons-delete-icon-white-text-logo.png";
    delimg.className = "delimg";
    let remov1e = document.createElement("p");
    remov1e.innerText = "Remove";
    remov1e.style.color = " rgb(255,31,44)";

    nameDiv.append(name);
    minidiv.append(delimg, remov1e);

    div.append(image, nameDiv, minidiv);
    container1.append(div);
    container.append(container1);
    // console.log(el.productId)
  });
};

let remove = async (id) => {
  console.log(id);

  try {
    let res = await fetch(`${url}/wishlist/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Authorization ${key}`,
      },
    });
    let data = res.json();
    console.log(data);

    getData();
  } catch (err) {
    console.log(err);
    console.log("error while removing element");
  }
};

let Page = localStorage.getItem("page_name");

if (Page == "Mylist") {
  getData();
} else {
  data();
}
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("user_token");
  window.location.href = "login.html";
});
