const api = "https://kars-stock.onrender.com/admin/";
const admin_token = localStorage.getItem("admin_token");

async function orderDetail(order) {
  let { userId, totalPrice, orderStatus, _id, updatedAt, createdAt } = order;

  let res = await fetch(`${api}customer/${userId}`, {
    headers: {
      authorization: `Bearer ${admin_token}`,
    },
  });
  res = await res.json();
  console.log();
  let { email, full_name } = res;
  let letter_icon = full_name.toUpperCase()[0];
  return ` <div class="order-page">
  <span>Orders</span><i class="fa-solid fa-chevron-right"></i>
  <span>Order Details</span>
</div>
<div id="order-number">
  <div>
    <div>
      <h2>Order Number:</h2>
      <h2>#${_id}</h2>
    </div>
    <div>
      <span>Status: ${orderStatus} </span>
      <select name="order-status" id="order-status" >
        <option value="">Update Status</option>
        <option value="Placed">Placed</option>
        <option value="Shipped">Shipped</option>
        
        <option value="Rejected">Rejected</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>
  </div>
  <div>
    <div>
      <p>Ordered on:</p>
      <p>${createdAt.split("T")[0].split("-").reverse().join("-")}</p>
    </div>
    <div>
      <p>${orderStatus} on:</p>
      <p>${updatedAt.split("T")[0].split("-").reverse().join("-")}</p>
    </div>
  
    <div>
      <p>Payment:</p>
      <p>Received</p>
    </div>
  </div>
</div>
<div id="order-summary">
  <h1>Summary</h1>
  <table class="order-detail-table">
  <tbody class="order-products"></tbody>
</table>
 
  <div>
    <h4>Net Total</h4>
    <h2 id="total-amount">Rs.<span> ${totalPrice}</span></h2>
  </div>
</div>
<div id="order-customer">
<h1>Customer</h1>
<div>
<div class="letter_icon">${letter_icon}</div>
  <p>${full_name}</p>
</div>
<div>
    <div>
      <p>Email:</p>
      <p>${email}</p>
    </div>
    <div>
      <p>Mobile:</p>
      <p>1234214124</p>
    </div>
    <div>
      <p>Payment:</p>
      <p>Received</p>
    </div>
  </div>
</div>`;
}
export { orderDetail };
