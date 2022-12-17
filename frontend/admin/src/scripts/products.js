import { alertMsg } from "../../../src/scripts/alertMsg.js";
setTimeout(() => {
  let selected_option = document.querySelector("#products");
  selected_option.setAttribute("class", "selected");
}, 200);

const admin_token = localStorage.getItem("admin_token");

const api = "https://kars-stock.onrender.com/admin/products";
let count = 0;

window.onload = async () => {
  // FETCHING ALL PRODUCTS FROM THE SERVER IN AN ARRAY
  let products;
  try {
    let data = await fetch(`${api}`, {
      headers: {
        authorization: `Bearer ${admin_token}`,
      },
    });
    data = await data.json();
    console.log(data);
    products = await data.products;
  } catch (err) {
    alertMsg("Error occurred while fetching Products", "error");
    console.log(err);
  }
  let allProducts = products;

  //   ---- SORTING EVENT ----

  document.getElementById("sort-by-stock").onchange = (e) => {
    count = 0;
    if (e.target.value == "lh") {
      allProducts.sort((a, b) => {
        return +a.stock - +b.stock;
      });
      appendProducts(allProducts, 0, 10);
    } else if (e.target.value == "hl") {
      allProducts.sort((a, b) => {
        return +b.stock - +a.stock;
      });
      appendProducts(allProducts, 0, 10);
    }
  };
  //   ---- FILTERING EVENT ----

  document.getElementById("filter-by-category").onchange = async (e) => {
    if (e.target.value !== "") {
      let filteredData = allProducts.filter((el) => {
        return el.category.toLowerCase() == e.target.value;
      });
      count = 0;
      appendProducts(filteredData, 0, 10);
    } else {
      count = 0;
      appendProducts(allProducts, 0, 10);
    }
  };

  //   ---- ADD NEW PRODUCT ----
  document.querySelector(".container-add-product > button").onclick = () => {
    let overlay = document.getElementById("overlay");
    addProduct();
    overlay.style.display = "flex";
  };

  let input_fields = document.querySelectorAll(".product-inputBox>input");
  input_fields.forEach((el) => {
    el.addEventListener("focus", (e) => {
      e.path[1].style = `
      border: 1px solid rgb(180, 92, 235);
      box-shadow: rgba(180, 92, 235, 0.2) 0px 2px 8px 0px;
      `;
    });
    el.addEventListener("blur", (e) => {
      e.path[1].style = `
      `;
    });
  });

  appendProducts(allProducts, 0, 10);
};

// ---------------------------- APPEND PRODUCTS FUNCTION -----------------------------

function appendProducts(products, s, e) {
  document.querySelector("tbody").innerHTML = null;
  //   ---- PAGINATION EVENT ----
  let total_pages = Math.ceil(products.length / 10);
  document.querySelector(".container-pagination .prevP").onclick = () => {
    prev_page(products);
  };
  document.querySelector(".container-pagination .nextP").onclick = () => {
    next_page(products, total_pages);
  };
  //   Updating page number and products number on the Dom

  document.querySelector(
    ".container-pagination > div:first-child"
  ).innerText = `${s + 1} - ${e > products.length ? products.length : e} of ${
    products.length
  } Products`;

  document.querySelector(
    ".container-pagination > div:last-child>span:first-child"
  ).innerText = `${count + 1} of ${total_pages}`;

  //   EXTRACTING EACH PRODUCT DATA
  for (let i = s; i < e; i++) {
    let product = products[i];
    if (product == undefined) {
      break;
    }
    let { _id, category: cate, title, image, stock } = product;

    let category = cate.charAt(0).toUpperCase() + cate.slice(1);
    title = title.split(",")[0];
    title = title.split("(")[0];
    title = title.split("-")[0];
    appendRow(product, _id, image, title, category, stock);
  }
  // HOVER EFFECT FOR THE TABLE ROWS

  //   let rows = document.querySelectorAll("tbody>tr");
  //   // console.log(rows);
  //   rows.forEach((el) => {
  //     el.onmouseover = (e) => {
  //       e.path[1].children[0].style.color = "rgb(180, 92, 235)";
  //       e.path[1].children[5].style.color = "rgb(180, 92, 235)";
  //     };
  //     el.onmouseout = (e) => {
  //       e.path[1].children[0].style.color = e.path[1].children[1].style.color;
  //       e.path[1].children[5].style.color = e.path[1].children[1].style.color;
  //     };
  //   });
}

// ---------------------------- Appending Product Row one By One --------------------------

function appendRow(product, ...data) {
  let tr = document.createElement("tr");
  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    let td = document.createElement("td");
    if (i == 0) {
      td.innerText = "#" + el;
    } else if (i == 1) {
      let img = document.createElement("img");
      img.src = el;
      img.style = `
      max-height:40px;
      padding: 0px 0;
      `;
      td.append(img);
    } else {
      td.innerText = el;
    }
    tr.append(td);
  }
  let td = document.createElement("td");
  td.innerText = "View";
  tr.append(td);
  tr.onclick = () => {
    updateProduct(product);
    // EVENT LISTENER TO VIEW PRODUCT DETAILS
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

// ------------------------------------- PAGINATION FUNCTIONS -----------------------------

function prev_page(allProducts) {
  if (count >= 1) {
    count--;
    let start = count * 10;
    let end = start + 10;
    appendProducts(allProducts, start, end);
  }
}
function next_page(allProducts, total_pages) {
  if (count >= 0 && count < total_pages - 1) {
    count++;
    let start = count * 10;
    let end = start + 10;
    appendProducts(allProducts, start, end);
  }
}

// ------------------------------- ADD  PRODUCT FUNCTION --------------------------------

async function addProduct() {
  let id;
  let name = document.getElementById("product_name");
  let product_id = document.querySelector(".product-id");
  let image = document.getElementById("image");
  let price = document.getElementById("price");
  let category = document.getElementById("product_category");
  let stock = document.getElementById("stock_quantity");
  let ratings = document.getElementById("ratings");
  let otherImages = document.getElementById("otherImages");
  let button = document.querySelector(".submit-product-form");

  name.value = "";
  price.value = 0;
  category.value = "";
  category.disabled = false;
  image.value = "";
  stock.value = 0;
  ratings.value = 0;
  otherImages.value = "";
  product_id.innerText = "Id will there after product added";
  button.innerText = "Add Product";

  // ----------------------------- ADDING THE NEW PRODUCT TO THE DATA BASE ----------------------

  button.onclick = async (e) => {
    if (
      e.target.innerText != "Add Product" ||
      name.value == "" ||
      price.value == "" ||
      image.value == "" ||
      stock.value == "" ||
      category.value == ""
    ) {
      alertMsg("Fields cannot be empty", "error");
      return;
    }

    // Data to append

    let sendData = {
      title: name.value,
      image: image.value,
      price: price.value,
      ratings: ratings.value,
      category: category.value,
      otherImages: otherImages.value,
      stock: stock.value,
    };

    try {
      // updating in all products

      let res = await fetch(`${api}/add`, {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });
      res = await res.json();
      alertMsg(res.msg, res.status);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      alertMsg("Error while adding product", "fail");
      console.log(err);
    }
  };
}

// ------------------------------- UPDATE  PRODUCT FUNCTION --------------------------------

async function updateProduct(product) {
  let name = document.getElementById("product_name");
  let product_id = document.querySelector(".product-id");
  let image = document.getElementById("image");
  let price = document.getElementById("price");
  let category = document.getElementById("product_category");
  let stock = document.getElementById("stock_quantity");
  let ratings = document.getElementById("ratings");
  let otherImages = document.getElementById("otherImages");
  let button = document.querySelector(".submit-product-form");

  // extracting category from product id
  name.value = product.title;
  price.value = +product.price;
  category.value = product.category;

  category.disabled = true;
  image.value = product.image;
  stock.value = +product.stock;
  ratings.value = +product.ratings || 0;
  otherImages.value = product.otherImages.join(",") || null;
  product_id.innerText = product._id;
  button.innerText = "Update Changes";

  document.getElementById("overlay").style.display = "flex";

  button.onclick = async (e) => {
    if (
      e.target.innerText != "Update Changes" ||
      name.value == "" ||
      price.value == "" ||
      image.value == "" ||
      stock.value == "" ||
      product_id.value == ""
    ) {
      alertMsg("Fields cannot be empty", "error");
      return;
    }

    let newData = {
      title: name.value,
      image: image.value,
      price: price.value,
      ratings: ratings.value,
      otherImages: otherImages.value.split(","),
      stock: stock.value,
    };
    try {
      let res = await fetch(`${api}/update/${product._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${admin_token}`,
        },
        body: JSON.stringify(newData),
      });
      res = await res.json();
      alertMsg(res.msg, res.status);
      // alertMsg("Product details updated successfully!", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      alertMsg("Error while updating product details", "fail");
      console.log(err);
    }
  };
}
