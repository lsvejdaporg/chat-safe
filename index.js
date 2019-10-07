const http = require('http');
const dateFormat = require('dateformat');
const fs = require('fs');

const DNY_V_TYDNU = ["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"];

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
    if (req.url == "/") {
        citac++; //dtto citac=citac+1
        processStaticFiles(res, "/index.html");
        return;
    }
    if (req.url.length - req.url.lastIndexOf(".") < 6) {
        processStaticFiles(res, req.url);
        return;
    }
    if (req.url == "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>blablabla</body></html>");
    } else if (req.url == "/jsondemo") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Bob";
        obj.prijmeni = "Bobíček";
        obj.rokNarozeni = 2002;
        res.end(JSON.stringify(obj));
    } else if (req.url == "/jsoncitac") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.pocetVolani = citac;
        res.end(JSON.stringify(obj));
    } else if (req.url == "/denvtydnu") {
        res.writeHead(200, {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin":"*"
        });
        let d = new Date();
        let obj = {};
        obj.systDatum = d;
        obj.denVTydnuCiselne = d.getDay(); //0...nedele, 1...pondeli,...
        obj.datumCesky = d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear(); //leden...0, unor...1,...
        obj.datumCeskyFormat = dateFormat(d, "dd.mm.yyyy");
        obj.datumACasCeskyFormat = dateFormat(d, "dd.mm.yyyy HH:MM:ss");
        obj.casCesky = d.getHours() + "." + d.getMinutes() + "." + d.getSeconds();
        obj.denVTydnuCesky = DNY_V_TYDNU[d.getDay()];
        res.end(JSON.stringify(obj));
    } else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Počet volání: " +citac + "</body></html>");
    }
}).listen(8888);
