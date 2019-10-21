const url = require('url');

let msgs = new Array();

exports.apiChat = function (req, res) {
    let q = url.parse(req.url, true);
    if (q.pathname == "/chat/listmsgs") { //msgs...globalni promenna typu pole deklarovana na zacatku tohoto zdroje
        res.writeHead(200, {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin":"*"
        });
        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));
    } else if (q.pathname == "/chat/addmsg") {
        res.writeHead(200, {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin":"*"
        });
        let obj = {};
        obj.text = q.query["msg"];
        obj.time = new Date();
        msgs.push(obj);
        res.end(JSON.stringify(obj));
    }
};