let container = document.getElementById("orders");


let url = "http://localhost:7010";
let key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2Mzk5ODU3MjEwYzU0MWYyNmNlMGIyZjciLCJpYXQiOjE2NzEwMTkwNTB9.FDA8NpDCWwVN0KuduzHEwQCiJ1Mk3VoSEmRwenskSkg"

// import { alertMsg } from "./alertMsg.js";

// let res = {msg:"hi ", status: "success/fail/error"};

// alertMsg(res.msg, res.status)

let data = async () => {
  try {
    res = await fetch(`${url}/orders`, {
      headers: {
        Authorization:
          `Authorization ${key}`,
      },
    });
    let data = await res.json();
    let new_data = data.data;
    console.log(data.data);
    append(new_data);
  } catch (err) {
    console.log("fail while featching");
  }
};
data();

console.log("");

append = (data) => {
  data.forEach((el) => {
    let div = document.createElement("div");
    div.className = "minicontainer";

    let name = document.createElement("p");
    name.innerText = el.productId.title;

    let image = document.createElement("img");
    image.src = el.productId.image;
    image.className = "image_order";
    let status = document.createElement("p");
    status.innerText = `Status : ${el.orderStatus}`;

    let orderDate = document.createElement("p");
    orderDate.innerText = "Orderd On : " + el.createdAt;

    div3 = document.createElement("div");
    div3.className = "minicontainer3";

    let div2 = document.createElement("div");
    div2.className = "minicontainer2";

    let status_btn = document.createElement("button");
    let btnStatus;
    if (el.orderStatus == "delivered") {
      btnStatus = "Return";
    } else if (el.orderStatus == "shipped") {
      btnStatus = "Cancel";
    } else if (el.orderStatus == "cancelled") {
      btnStatus = "cancelled";
    } else if (el.orderStatus == "Placed") {
      btnStatus = "Cancel";
    } else if (el.orderStatus == "shipped") {
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
  console.log("AAA")
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

  if (status == "Shipped"||status == "shipped" || status == "Placed" || status == "delivered") {
    try {
      let responce = await fetch(`${url}/orders/${Status}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization:
          `Authorization ${key}`,
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
document.getElementById("MyReviews").addEventListener("click", () => {
  window.location = "";
});

document.getElementById("MyLists").addEventListener("click", () => {
  window.location = "";
});
