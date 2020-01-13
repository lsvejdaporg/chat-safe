const url = require('url');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const fs = require('fs');
const crypto = require("crypto");

let users = new Array();
if (fs.existsSync("users.json")) {
    users = JSON.parse(fs.readFileSync("users.json"));
}

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

exports.apiUsers = function (req, res) {
    let q = url.parse(req.url, true);
    if (q.pathname.endsWith("/list")) {
        res.writeHead(200, {
            "Content-type": "application/json"
        });
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));
    } else if (q.pathname.endsWith("/add")) {
        let data = "";
        req.on('data', function (chunk) {
            try {
                data += chunk;
            } catch (e) {
                console.error(e);
            }
        })
        req.on('end', function () {
            if (data) {
                let body = JSON.parse(data);
                res.writeHead(200, {
                    "Content-type": "application/json"
                });
                let obj = {}
                obj.login = entities.encode(body.login);
                let userExists = false;
                for (let u of users) {
                    if (u.login === obj.login) {
                        userExists = true;
                        break;
                    }
                }
                if (userExists) {
                    obj.error = "User already exists.";
                } else {
                    obj.name = entities.encode(body.name);
                    obj.password = zamixujHeslo(entities.encode(body.password));
                    obj.email = entities.encode(body.email);
                    users.push(obj);
                    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
                }
                res.end(JSON.stringify(obj));
            };
        });
    } else if (q.pathname.endsWith("/login")) {
        let data = "";
        req.on('data', function (chunk) {
            try {
                data += chunk;
            } catch (e) {
                console.error(e);
            }
        })
        req.on('end', function () {
            if (data) {
                let body = JSON.parse(data);
                res.writeHead(200, {
                    "Content-type": "application/json"
                });
                let obj = {};
                let login = entities.encode(body.login);
                let found = false;
                for (let u of users) {
                    if (u.login === login) {
                        found = true;
                        if (u.password === entities.encode(body.password)) {
                            obj.name = u.name;
                        } else {
                            obj.error = "invalid password";
                        }
                        break; //vyskoceni z cyklu
                    }
                }
                if (!found) {
                    obj.error = "invalid login";
                }
                res.end(JSON.stringify(obj));
            };
        });
    }
};
