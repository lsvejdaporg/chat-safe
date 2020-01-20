let msgs = new Array();

exports.apiChat = function (req, res) {
    if (req.pathname == "/chat/listmsgs") { //msgs...globalni promenna typu pole deklarovana na zacatku tohoto zdroje
        res.writeHead(200, {
            "Content-type": "application/json"
        });
        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));
    } else if (req.pathname == "/chat/addmsg") {
        res.writeHead(200, {
            "Content-type": "application/json"
        });
        let obj = {};
        obj.text = req.parameters.msg;
        console.log(obj.text);
        obj.time = new Date();
        msgs.push(obj);
        res.end(JSON.stringify(obj));
    }
};