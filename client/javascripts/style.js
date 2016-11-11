'use strict'

$(document).ready(() => {

})

//
// contant
//

const URL = 'http://localhost:3000/api'

let list = () => {
  $.ajax({
    method: 'GET',
    url : URL,
    data : ,
    
  })
}


let delete = (id) => {
  $.ajax({
    method: "DELETE",
    url: URL + id,
    success: () => {

    }
  });
}
