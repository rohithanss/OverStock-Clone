let url = "https://kars-stock.onrender.com";
let key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2Mzk5ODU3MjEwYzU0MWYyNmNlMGIyZjciLCJpYXQiOjE2NzEwMTkwNTB9.FDA8NpDCWwVN0KuduzHEwQCiJ1Mk3VoSEmRwenskSkg";

let data = async () => {
  try {
    res = await fetch(`${url}/user/myprofile`, {
      headers: {
        Authorization: `Authorization ${key}`,
      },
    });
    let data = await res.json();
    //   let new_data = data.data;
    // console.log(data.full_name);
    let name = document.getElementById("name");
    name.innerText = data.full_name;

    let FLetter = document.getElementById("FLetter");
    FLetter.innerText = data.full_name[0];
    //   append(new_data);
  } catch (err) {
    console.log("fail while featching");
  }
};
data();

document.getElementById("contentDiv");

const getData = async () => {
  try {
    res = await fetch(`${url}/wishlist`, {
      headers: {
        Authorization: `Authorization ${key}`,
      },
    });
    let data = await res.json();
    //   let new_data = data.data;
    console.log(data.data);
    appendData(data.data);
    //   append(new_data);
  } catch (err) {
    console.log("fail while featching fev List");
  }
};
getData();

const appendData = (data) => {
  let cotainer = document.getElementById("contentDiv");

  data.forEach((el) => {
    let div = document.createElement("div");
    div.className = "cards";

    let name = document.createElement("p");
    name.innerText = el.productId.title;
    name.className = "Name1";

    let image = document.createElement("img");
    image.src = el.productId.image;
    image.className = "image1";
    let minidiv = document.createElement("div");
    minidiv.className = "minidiv";
    minidiv.addEventListener("click",()=>{
      remove(el._id)
    })

    let nameDiv = document.createElement("div");
    nameDiv.className="nameDiv"



    let delimg = document.createElement("img");
    delimg.src =
      "https://w7.pngwing.com/pngs/271/838/png-transparent-computer-icons-delete-icon-white-text-logo.png";
    delimg.className = "delimg";
    let remov1e = document.createElement("p");
    remov1e.innerText = "Remove";
    remov1e.style.color = " rgb(255,31,44)";


    nameDiv.append(name)
    minidiv.append(delimg, remov1e);

    div.append(image, nameDiv, minidiv);
    cotainer.append(div);
    // console.log(el.productId)
  });
};



let remove=(id)=>{
  console.log(id)
}

