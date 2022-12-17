import { container } from "../components/container.js";
import { orderDetail } from "../components/orderDetail.js";
import { productCard } from "../components/productCard.js";
import { alertMsg } from "./alertMsg.js";
const admin_token = localStorage.getItem("admin_token");
const api = "http://localhost:7010/admin/";

var count = 1;
var total_pages;
var sort = -1;
var filter = "";
window.onload = async () => {
  // ----------DEFAULT APPENDING -----------

  try {
    setTimeout(() => {
      let selected_option = document.getElementById("orders");
      selected_option.setAttribute("class", "selected");
    }, 125);
  } catch (err) {
    // console.log(err);
  }

  document.querySelector("section").innerHTML = container();

  fetchOrders(1, filter, sort);
  // ------------- SORTING ORDERS BY TIME --------------------

  document.getElementById("sort-by-date").onchange = () => {
    sort = sort == 1 ? -1 : 1;
    fetchOrders(1, filter, sort);
  };

  // ------------- FILTERING ORDERS BY ORDER STATUS --------------------

  document.getElementById("filter-by-status").onchange = (e) => {
    filter = e.target.value;
    fetchOrders(1, filter, sort);
  };
};

// --------------------------- DISPLAYING ALL ORDERS ON THE DOM -------------------

async function appendOrders(orders) {
  document.querySelector("tbody").innerHTML = null;

  //   EXTRACTING EACH ORDER DATA

  orders.forEach(async (el) => {
    let { _id, orderStatus, totalPrice, userId } = el;
    let customer;
    try {
      customer = await fetch(`${api}customer/${userId}`, {
        headers: {
          authorization: `Bearer ${admin_token}`,
        },
      });
      customer = await customer.json();
      // console.log(customer);
    } catch (err) {
      alertMsg("Error occurred while fetching Orders", "error");
      // console.log(err);
    }
    let { full_name, email } = customer;
    appendRow(el, _id, full_name, email, orderStatus, totalPrice);
  });
}

// ------------------------------- APPENDING TABLE ROWS ONE BY ONE -------------------------

function appendRow(order, ...data) {
  let tr = document.createElement("tr");
  data.forEach((el, i) => {
    let td = document.createElement("td");
    if (i == 0) {
      td.innerText = "#" + el;
    } else {
      td.innerText = el;
    }
    tr.append(td);
  });
  let td = document.createElement("td");
  td.innerText = "View";
  tr.append(td);
  tr.onclick = () => {
    switchToOrderDetail(order); // EVENT LISTENER TO VIEW ORDER DETAILS
  };

  // HOVER EFFECT FOR THE TABLE ROWS

  tr.onmouseover = (e) => {
    e.path[1].children[0].style.color = "rgb(180, 92, 235)";
    e.path[1].children[5].style.color = "rgb(180, 92, 235)";
  };
  tr.onmouseout = (e) => {
    e.path[1].children[0].style.color = e.path[1].children[1].style.color;
    e.path[1].children[5].style.color = e.path[1].children[1].style.color;
  };

  document.querySelector("tbody").append(tr);
}

// ----------------------------------- FUNCTION TO VIEW ORDER DETAILS --------------------

async function switchToOrderDetail(order) {
  // APPENDING BASIC LAYOUT

  document.querySelector("section").innerHTML = await orderDetail(order);

  // APPENDING ALL THE PRODUCTS IN AN ORDER

  let { quantity, orderStatus, totalPrice, productId } = order;
  let { image, title, price } = productId;
  productCard(image, title, quantity, price, 0, totalPrice);

  if (orderStatus == "cancelled") {
    document.getElementById(
      "order-status"
    ).innerHTML = `<option value="">Cancelled</option>
    <option value="Refunded">Refund</option>`;
    document.getElementById("order-status").disabled = true;
  } else if (orderStatus == "Return Request") {
    document.getElementById(
      "order-status"
    ).innerHTML = `<option value="">Update Status</option>
    <option value="Refunded">Refund</option>`;
  }
  // EVENT LISTENER TO VIEW ALL ORDERS AGAIN

  document.querySelector(".order-page>span:first-child").onclick = () => {
    window.location.reload();
  };

  // CHANGING ORDER STATUS FOR CUSTOMER AS WELL AS FOR THE ADMIN

  document.getElementById("order-status").onchange = (e) => {
    if (e.target.value != "") {
      changeOrderStatus(e, order); // FUNCTION TO CHANGE ORDER STATUS
    }
  };
}

// -------------------------------------- CHANGE ORDER STATUS FUNCTION ----------------------

async function changeOrderStatus(e, order) {
  try {
    //  update on dom
    let res;
    // console.log(e.target.value);
    res = await fetch(`${api}orders/${order._id}?status=${e.target.value}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${admin_token}`,
      },
    });
    // console.log(res);
    res = await res.json();
    // console.log(res);
    // console.log(order);
    order.orderStatus = e.target.value;
    switchToOrderDetail(order); // indirectly reloading the page
    alertMsg(res.msg, res.status);
  } catch (err) {
    alertMsg("some error occurred while updating status", "error");
    console.log(err);
  }
}

// ------------------------------------- FETCH ORDERS FUNCTIONS -----------------------------

async function fetchOrders(page, status, sort) {
  let res;
  let limit = 2;
  // console.log(page, status, sort);
  try {
    res = await fetch(
      `${api}orders?page=${page}&limit=${limit}&status=${
        status == undefined ? "" : status
      }&sort=${sort}`,
      {
        headers: {
          authorization: `Bearer ${admin_token}`,
        },
      }
    );
    res = await res.json();
    // console.log(res);

    // =================== PAGINATION

    total_pages = Math.ceil(res.total / limit);
    let start = (page - 1) * 2 + 1;
    let end = start + limit - 1;
    document.querySelector(
      ".container-pagination > div:first-child"
    ).innerHTML = `${start} - ${end > res.total ? res.total : end} of ${
      res.total
    } orders`;

    document.querySelector(
      ".container-pagination > div:last-child>span"
    ).innerHTML = `${page} of ${total_pages}`;

    let orders = await res.orders;
    // console.log(orders);
    // console.log(res);
    appendOrders(orders);
  } catch (err) {
    alertMsg("Error occurred while fetching Orders", "error");
    console.log(err);
  }

  // ------------------------------------- PAGINATION FUNCTIONS -----------------------------

  document.querySelector(".prevP").onclick = () => {
    if (count > 1) {
      count--;
      fetchOrders(count, filter, sort);
    }
  };
  document.querySelector(".nextP").onclick = () => {
    if (count > 0 && count < total_pages) {
      count++;

      fetchOrders(count, filter, sort);
    }
  };
}
