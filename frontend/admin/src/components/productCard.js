function productCard(imgUrl, title, quantity, price, discount, total_price) {
  title = title.split(",")[0];
  title = title.split("(")[0];
  title = title.split("/")[0];

  let imgDiv = document.createElement("div");
  let img = document.createElement("img");
  img.src = imgUrl;
  img.style = `
  height: 50px
  `;
  imgDiv.append(img);

  let td1 = document.createElement("td");
  td1.append(imgDiv);
  let td2 = document.createElement("td");
  td2.style = `
width: 60%;
  text-align: left;
  `;
  td2.innerText = title;
  let td3 = document.createElement("td");
  td3.innerHTML = price + " X";
  td3.style = `
  text-align: right;
  `;
  let td4 = document.createElement("td");
  td4.innerText = quantity;
  td4.style.textAlign = "left";
  let original_total = +quantity * +price;
  let discount_amt = (original_total * +discount) / 100;
  let dis = document.createElement("td");
  dis.innerText = `(${original_total} - ${discount_amt})`;
  dis.style = `
  color: red;
  font-weight: 500;
  `;
  let td5 = document.createElement("td");
  td5.innerText = "Rs. " + total_price;
  td5.style.fontWeight = "600";
  let tr = document.createElement("tr");
  tr.append(td1, td2, td3, td4, dis, td5);
  document.querySelector(".order-products").append(tr);
}
export { productCard };
