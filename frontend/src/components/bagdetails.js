const bagdetail = () => {
  /*html*/
  return `<div id="bag">
    <h3>Bag</h3>
    <h3 id="titam">items</h3>
  </div>
  <hr>
  <div id="bagaddress">
    <h3>Deliver To</h3>
    <input type="text" id="useraddress" placeholder="Enter address">
  </div>
  <hr>
  <div id="bagmobile">
    <h3>Mobile No.</h3>
    <input type="text" id="usermobile" placeholder="Enter Mobile Number">
  </div>
  <hr>
  <div id="bagprice">
    <h3>Price Details</h3>
    <h3 id="tprice">price</h3>
  </div>`;
};

export { bagdetail };
