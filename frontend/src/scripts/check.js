import { alertMsg } from "./alertMsg.js";

async function check(id, res, icon) {
  try {
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].productId._id, id);
      if (res[i].productId._id == id) {
        console.log("Yes");
        icon.style.color = "red";
        icon.disabled = true;
        icon.onclick = () => {
          alertMsg("Product already added", "success");
        };
      }
    }
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
}
export { check };
