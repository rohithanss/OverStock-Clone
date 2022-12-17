function container() {
  /*html*/
  return `  <div id="container">
  <div class="container-heading">
  <h3>Orders</h3>
  <a href="dashboard.html">  <h3>Drafts</h3></a>
  </div>
  <div class="container-nav">
    <div>
      <select name="filter-by-status" id="filter-by-status">
        <option value="">Filter by Status</option>
        <option value="Placed">Placed</option>
        <option value="Shipped">Shipped</option>
        <option value="Return Request">Returned</option>
        <option value="Delivered">Delivered</option>
        <option value="Refund">Refund</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <select name="sort-by-date" id="sort-by-date">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
    <div class="container-searchBar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search anything..."
      />
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Order Id</th>
        <th>Customer</th>
        <th>Email</th>
        <th>Status</th>
        <th>Bill Amount</th>
        <th>View Detail</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <div class="container-pagination">
    <div>0 - 0 of 0 orders</div>
    <div>
      <span>0 of 0</span
      ><span>
        <i class="fa-solid fa-arrow-left prevP"> </i>
        <i class="fa-solid fa-arrow-right nextP"> </i>
      </span>
    </div>
  </div>
</div>`;
}
export { container };
