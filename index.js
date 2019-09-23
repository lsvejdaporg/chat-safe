const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {"Content-type": "text/html"});
    res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Čauvejs!</body></html>");
}).listen(8888);
