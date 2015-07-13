var fs = require('fs')
var yaml = require('js-yaml')

module.exports = function loadFacilitators() {
  return yaml.safeLoad( fs.readFileSync('./facilitators.yml') )
}

