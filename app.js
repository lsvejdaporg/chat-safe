const http = require('http');
const fs = require('fs');
const url = require('url');
const apiDenVTydnu = require('./api-denvtydnu').apiDenVTydnu;
const apiSvatky = require('./api-svatky').apiSvatky;
const apiChat = require('./api-chat').apiChat;
const apiUsers = require('./api-users').apiUsers;

const PORT = 8080;
let citac = 0;

function processStaticFiles(res, fileName) {
    fileName = fileName.substr(1); //zkopiruju od druheho znaku
    console.log(fileName);
    let contentType = "text/html";
    if (fileName.endsWith(".png")) {
        contentType = "image/png";
    } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
        contentType = "image/jpeg";
    }

    if (fs.existsSync(fileName)) {
        fs.readFile(fileName, function(err, data) {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(404); //soubor neexistuje
        res.end();
    }
}

http.createServer((req, res) => {
    console.log(req.url);
    let q = url.parse(req.url, true);
    console.log(q.pathname);
    if (q.pathname == "/") {
        citac++; //dtto citac=citac+1
        processStaticFiles(res, "/index.html");
        return;
    }
    if (q.pathname.indexOf(".") > -1 && q.pathname.length - q.pathname.lastIndexOf(".") < 6) {
        processStaticFiles(res, q.pathname);
        return;
    }
    if (q.pathname == "/kuk") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>blablabla</body></html>");
    } else if (q.pathname == "/jsondemo") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Bob";
        obj.prijmeni = "Bobíček";
        obj.rokNarozeni = 2002;
        res.end(JSON.stringify(obj));
    } else if (q.pathname == "/jsoncitac") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.pocetVolani = citac;
        res.end(JSON.stringify(obj));
    } else if (q.pathname == "/denvtydnu") {
        apiDenVTydnu(req, res);
    } else if (q.pathname == "/svatky") {
        apiSvatky(req, res);
    } else if (q.pathname.startsWith("/chat/")) {
        apiChat(req, res);
    } else if (q.pathname.startsWith("/users/")) {
        apiUsers(req, res);
    } else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Počet volání: " +citac + "</body></html>");
    }
}).listen(PORT);

console.log("Server bezi na adrese http://localhost:" + PORT)
