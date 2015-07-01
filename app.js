var static = require("node-static"),
    fileServer = new static.Server("./"),
    port = process.env.port || 1337;

require("http").createServer(function (request, response) {
    request.addListener("end", function () {
        fileServer.serve(request, response, function (err, result) {
            if (err) {
                sys.error("Error serving " + request.url + " - " + err.message);
                response.writeHead(err.status, err.headers);
                response.end();
            }
        });
    }).resume();
}).listen(port);

console.log("Server running at http://localhost:" + port);
