var http = require('http')

module.exports = function keepAwake() {
  setInterval(
    function() {
      console.log('POKE')
      http.get("https://facilawho.herokuapp.com");
    }, 
    300000 // every 5 minutes (300000)
  ) 
}
