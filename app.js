const createSpaServer = require("spaserver").createSpaServer;
const apiDenVTydnu = require('./api-denvtydnu').apiDenVTydnu;
const apiSvatky = require('./api-svatky').apiSvatky;
const apiChat = require('./api-chat').apiChat;
const apiUsers = require('./api-users').apiUsers;

const PORT = 8080;
let citac = 0;

function processApi(req, res) {
    console.log(req.url);
    if (req.pathname == "/kuk") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>blablabla</body></html>");
    } else if (req.pathname == "/pokusy") {
        res.writeHead(302, { 'Location': '/datumovepokusy.html'});
        res.end();
    } else if (req.pathname == "/jsondemo") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Bob";
        obj.prijmeni = "Bobíček";
        obj.rokNarozeni = 2002;
        res.end(JSON.stringify(obj));
    } else if (req.pathname == "/jsoncitac") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.pocetVolani = citac;
        res.end(JSON.stringify(obj));
    } else if (req.pathname == "/denvtydnu") {
        apiDenVTydnu(req, res);
    } else if (req.pathname == "/svatky") {
        apiSvatky(req, res);
    } else if (req.pathname.startsWith("/chat/")) {
        apiChat(req, res);
    } else if (req.pathname.startsWith("/users/")) {
        apiUsers(req, res);
    } else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Počet volání: " +citac + "</body></html>");
    }
}

createSpaServer(PORT, processApi);
