const crypto = require("crypto");

function zamixujHeslo(pw) {
    // let mixPw = crypto.createHash("md5").update(pw).digest("hex");
    // mixPw = mixPw.split("").reverse().join("");
    // for (let i=0; i < 10; i++) {
    //     mixPw = crypto.createHash("md5").update(mixPw).digest("hex");
    // }
    let salt = pw.split("").reverse().join(""); //pozpatku
    let mixPw = crypto.createHmac("sha256", salt).update(pw).digest("hex");
    return mixPw;
}


let pwd = "testicek";
console.log(zamixujHeslo(pwd) + " a zkus na https://crackstation.net/");
