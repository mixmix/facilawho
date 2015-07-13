var url   = require('url')
var xhr   = require('xhr')
var dom   = require('domquery')

xhr({
  uri: '/api/facilitators',
  headers: {
    "Content-Type": "application/json"
  }
}, handleResponse)

function handleResponse (err, resp, body) {
  if (resp.statusCode == 400) {
    var insertContent = body
  }
  else {
    console.log(body)
    var facilitators = JSON.parse(body)
    var insertContent = Object.keys(facilitators).map( function(key) {
      return avatarify( facilitators[key] )
    }).join('')
  }

  dom('.container.target').replace('#loading', "<div class='facilitators'>{insert}</div>", {insert: insertContent} )

  //dom('.container.dependencies').add( "<pre>{insert}</pre>", {insert: treeToDependencies(results)} )
  //dom('.container.dependencies').toggleClass('hidden')
}


function avatarify( facilitatorInfo ) {
  return "<div class='facilitator'> <a href='"+ facilitatorInfo.slack +"'><img src='" + facilitatorInfo.image + "'><br />" + facilitatorInfo.name + "</a></div>"
}

//dom('.container.controls button.toggle-stitches').on('click', toggleStitches)
//dom('body').on('click', '.stitch-mark .collapser', toggleCollapse)

//function toggleStitches(evt) {
  //dom('.container.controls button.toggle-stitches').toggleClass('active')
  //dom('.stitch-mark').toggleClass('visible')

  //dom('.stitch-mark .collapser').toggleClass('hidden')
//} 

//function toggleCollapse(evt) {
  //var sectionHandle = evt.target.parentNode.attributes['data-url'].value

  //dom('.stitch-mark[data-url="'+sectionHandle+'"] .content').toggleClass('hidden')
//}


