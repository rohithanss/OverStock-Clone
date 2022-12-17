function alertMsg(message, status) {
  if (document.getElementById("alertDiv") != undefined) {
    document.getElementById("alertDiv").remove();
  }
  let msgDiv = document.createElement("div");
  let msgBox = document.createElement("p");
  msgBox.innerText = message;
  msgBox.style.color = "white";
  let closeBtn = document.createElement("p");
  closeBtn.innerHTML = `<i style="color:white" class="fa-solid fa-xmark"></i>`;
  closeBtn.id = "closeAlert";
  closeBtn.style = `
  font-size: 20px;
  color: white;
  cursor: pointer;
  `;
  msgDiv.id = "alertDiv";
  msgDiv.append(msgBox, closeBtn);
  msgDiv.style = `
height: 50px;
display: flex;
padding: 7px 20px;
position: fixed;
align-items: center;
justify-content:space-between;
gap:50px;
top: -10px;
min-width: 20%;
left: 50%;
z-index: 1004;
transform: translateX(-50%);
color: white;
opacity: 0.6;
transition: all 500ms;
`;

  let backgrnd = null;
  if (status == "success") {
    backgrnd = "green";
  } else if (status == "fail") {
    backgrnd = "red";
  } else if (status == "error") {
    backgrnd = "orange";
  } else {
    alert("error at alertMsg function! Status is not valid");
  }
  msgDiv.style.backgroundColor = backgrnd;
  document.querySelector("body").append(msgDiv);
  setTimeout(() => {
    msgDiv.style.top = "20px";
  }, 50);

  document.querySelector("#closeAlert").onclick = () => {
    msgDiv.style.display = "none";
  };
}
export { alertMsg };
