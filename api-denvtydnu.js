const dateFormat = require('dateformat');
const DNY_V_TYDNU = ["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"];

exports.apiDenVTydnu = function (req, res) {
    res.writeHead(200, {
        "Content-type": "application/json"
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
}