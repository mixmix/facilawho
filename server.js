var isProd = process.env.NODE_ENV === 'production'

var Router = require('routes')
var router = Router()
var http = require('http')
var url = require('url')
var fs = require('fs')
var request = require('request')
var stringify = require('json-stringify-safe') 

var keepAwake = require('./keepAwake')
var loadFacilitators = require('./loadFacilitators')

var facilitators = loadFacilitators()

router.addRoute('/', rootRequestResponse)
function rootRequestResponse(req, res, match) {
  res.writeHead(200, {'content-type': 'text/html'})
  fs.createReadStream('./index.html').pipe(res)
}

router.addRoute('/api/facilitators', facilitatorsResponse)
function facilitatorsResponse(req, res, match) {
  res.writeHead(200, {'content-type': 'application/json'})

  res.write( stringify(facilitators, null, 2) )
  res.end()
}


function handler(req, res) {
  var requestDetails = url.parse(req.url, true)
  var match = router.match(requestDetails.pathname)
  if (match) {
    match.fn(req, res, match)
  }
  // static-resources:
  else if (req.url === '/app.js') {
    fs.createReadStream('./build/client.js').pipe(res)
  }
  else if (req.url === '/styles.css') {
    fs.createReadStream('./styles.css').pipe(res)
  }
  else if (req.url === '/loading.gif') {
    fs.createReadStream('./loading.gif').pipe(res)
  }
}


function startServer() {
  var port = process.env.PORT || 5000
  http.createServer( handler ).listen(port)
}


startServer()
keepAwake()

