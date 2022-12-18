import { alertMsg } from "./alertMsg.js";

async function check(id, res, icon) {
  try {
    for (let i = 0; i < res.length; i++) {
     // console.log(res[i].productId._id, id);
      if (res[i].productId._id == id) {
        console.log("Yes");
      if(icon){
        icon.style.color = "red";
       icon.disabled = true;

      }
      let obj={present :true,
        wishlistid : res[i]._id
      };
      return obj;
        
      }
    }
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
}
export { check };
