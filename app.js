var nodeStatic = require('node-static')
var fileServer = new nodeStatic.Server('./')
var port = process.env.port || 1337

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response, function (err, result) {
      if (err) {
        console.error('Error serving ' + request.url + ' - ' + err.message)
        response.writeHead(err.status, err.headers)
        response.end()
      }
    })
  }).resume()
}).listen(port)

console.log('Server running at http://localhost:' + port)
