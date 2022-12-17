const netbankingdetails=()=>{
    return `<div id="netbdetail">
    <div>
        <h3>Net Banking</h3>
    </div>
    <hr>
    <div>
        <p class="bankname"> AXIS <input type="radio" name="bank" checked></p>
        <p class="bankname"> HDFC <input type="radio" name="bank"></p>
        <p class="bankname"> ICICI <input type="radio" name="bank"></p>
        <p class="bankname"> KOTAK <input type="radio" name="bank"></p>
        <p class="bankname"> SBI <input type="radio" name="bank"></p>

    </div>
    

    <p id="savedetail"><input type="checkbox"> Save this card securely for future </p>

    <button id="paybutton">pay</button>
</div>`
}


export {netbankingdetails}