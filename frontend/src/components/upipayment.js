const upipayment=()=>{
    return `<div id="upidetail">
    <div>
        <h3>UPI</h3>
    </div>
    <hr>
    <div>
        <input class="upidetail" id="upinumberbox" type="number" placeholder="Enter UPI id" >
    </div>
    

    <p id="savedetail"><input type="checkbox"> Save this card securely for future </p>

    <button id="paybutton">pay</button>
</div>`
}

export {upipayment}