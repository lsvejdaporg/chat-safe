const url = require('url');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

let users = new Array();

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
                let obj = {};
                obj.name = entities.encode(body.name);
                obj.login = entities.encode(body.login);
                obj.password = entities.encode(body.password);
                obj.email = entities.encode(body.email);
                users.push(obj);
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
