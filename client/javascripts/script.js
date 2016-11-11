$(document).ready(function() {
})

//NEW DATA ITEM
function createNewCard() {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/api/cards",
    data: {
      title: $(`#cardTitle`).val(),
      content: $(`#cardDesc`).val(),
      due_date: $(`#cardDueDate`).val(),
      status: 'todo',
      in_charge: $(`#cardInCharge`).val()
    },
    dataType: "json",
    success: function appendnew(data) {
      var newHTML = '';
      var newEdit = ``;
      var newDelete = ``;
      newHTML += `<!-- Single Card -->
      <div class="panel panel-default" id="card_${data.cardID}">
        <div class="panel-heading" role="tab" id="headingOne">
          <h4 class="panel-title">
            <button type="button" class="close" data-toggle="modal" data-target="#modalDelete_${data.cardID}"><span aria-hidden="true" class="glyphicon glyphicon-trash"></span></button>

            <button type="button" class="close" data-toggle="modal" data-target="#modalEdit_${data.cardID}"><span aria-hidden="true" class="glyphicon glyphicon-edit"></span></button>

            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne${data.cardID}" aria-expanded="true" aria-controls="collapseOne" id="currentTitle${data.cardID}">
              ${data.title}
            </a>
          </h4>
        </div>
        <div class="panel-body">
          <div class="alert alert-dismissible alert-info">
            <strong>In Charge : </strong> <span id="currentInCharge${data.cardID}">${data.in_charge}</span>
          </div>
        </div>
        <div id="collapseOne${data.cardID}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
            <div class="list-group">
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Description</h4>
                <p class="list-group-item-text text-left" id="currentContent${data.cardID}">${data.content}</p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Due Date</h4>
                <p class="list-group-item-text text-left" id="currentDueDate${data.cardID}">${data.due_date}</p>
              </a>
              <div class="list-group-item">
                <ul class="pager">
                  <li class="next"><a href="#" onclick="doing('${data.cardID}')">Doing &rarr;</a></li>
                </ul>
              </div>

            </div>
        </div>
      </div>
      <!-- Single Card -->`;
      newEdit += `    <!-- MODAL EDIT -->
          <div class="modal fade" id="modalEdit_${data.cardID}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Edit ${data.title}</h4>
                </div>
                <div class="modal-body">
                  <!-- INPUT FORM -->
                  <form id="editCard">
                    <div class="form-group">
                      <label class="control-label" for="cardTitle">Title</label>
                      <input class="form-control" id="cardTitle${data.cardID}" type="text" placeholder="Enter the thing you wanna do . ." value="${data.title}">
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="cardDesc">Description</label>
                      <textarea class="form-control" rows="3" id="cardDesc${data.cardID}" placeholder="Describe the thing you wanna do . .">${data.content}</textarea>
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="cardInCharge">In Charge</label>
                      <input class="form-control" id="cardInCharge${data.cardID}" type="text" placeholder="Enter the thing you wanna do . ." value="${data.in_charge}">
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="cardDueDate">Due Date</label>
                      <input class="form-control" id="cardDueDate${data.cardID}" type="text" placeholder="Enter the thing you wanna do . ." value="${data.due_date}">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-success" onclick="updateCard('${data.cardID}')" data-dismiss="modal">Save changes</button>
                </div>
              </div>
            </div>
          </div>`;

      newDelete += `<!-- MODAL DELETE -->
      <div class="modal fade" id="modalDelete_${data.cardID}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Delete ${data.title}</h4>
            </div>
            <div class="modal-body">
              Are you sure, want to delete this?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" onclick="deleteCard('${data.cardID}')" data-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
      `;
      $( '#addCardForm' ).each(function(){
          this.reset();
      });
      $(".todo").append(newHTML);
      $("body").append(newEdit);
      $("body").append(newDelete);
    }
  });
};

function doing(id) {
  $.ajax({
    url: "http://localhost:3000/api/cards/"+id,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      status: 'doing'
    },
    success: function(data) {
      console.log(data);
      $(`#card_${id}`).remove();
      var doing = `<!-- Single Card -->
      <div class="panel panel-default" id="card_${data.cardID}">
        <div class="panel-heading" role="tab" id="headingOne">
          <h4 class="panel-title">
            <button type="button" class="close" data-toggle="modal" data-target="#modalDelete_${data.cardID}"><span aria-hidden="true" class="glyphicon glyphicon-trash"></span></button>

            <button type="button" class="close" data-toggle="modal" data-target="#modalEdit_${data.cardID}"><span aria-hidden="true" class="glyphicon glyphicon-edit"></span></button>

            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne${data.cardID}" aria-expanded="true" aria-controls="collapseOne" id="currentTitle${data.cardID}">
              ${data.title}
            </a>
          </h4>
        </div>
        <div class="panel-body">
          <div class="alert alert-dismissible alert-info">
            <strong>In Charge : </strong> <span id="currentInCharge${data.cardID}">${data.in_charge}</span>
          </div>
        </div>
        <div id="collapseOne${data.cardID}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
            <div class="list-group">
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Description</h4>
                <p class="list-group-item-text text-left" id="currentContent${data.cardID}">${data.content}</p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Due Date</h4>
                <p class="list-group-item-text text-left" id="currentDueDate${data.cardID}">${data.due_date}</p>
              </a>
              <div class="list-group-item">
                <ul class="pager">
                  <li class="previous" onclick="todo('${data.cardID}')""><a href="#">&larr; To Do</a></li>
                  <li class="next"><a href="#" onclick="done('${data.cardID}')">Done &rarr;</a></li>
                </ul>
              </div>

            </div>
        </div>
      </div>
      <!-- Single Card -->`;
      $(`.doing`).append(doing);

    }
  })
}

function done(id) {
  $.ajax({
    url: "http://localhost:3000/api/cards/"+id,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      status: 'done'
    },
    success: function(data) {
      console.log(data);
      $(`#card_${id}`).remove();
      var done = `<!-- Single Card -->
      <div class="panel panel-default" id="card_${data.cardID}">
        <div class="panel-heading" role="tab" id="headingOne">
          <h4 class="panel-title">
            <button type="button" class="close" data-toggle="modal" data-target="#modalDelete_${data.cardID}"><span aria-hidden="true" class="glyphicon glyphicon-trash"></span></button>

            <button type="button" class="close" data-toggle="modal" data-target="#modalEdit_${data.cardID}"><span aria-hidden="true" class="glyphicon glyphicon-edit"></span></button>

            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne${data.cardID}" aria-expanded="true" aria-controls="collapseOne" id="currentTitle${data.cardID}">
              ${data.title}
            </a>
          </h4>
        </div>
        <div class="panel-body">
          <div class="alert alert-dismissible alert-info">
            <strong>In Charge : </strong> <span id="currentInCharge${data.cardID}">${data.in_charge}</span>
          </div>
        </div>
        <div id="collapseOne${data.cardID}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
            <div class="list-group">
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Description</h4>
                <p class="list-group-item-text text-left" id="currentContent${data.cardID}">${data.content}</p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Due Date</h4>
                <p class="list-group-item-text text-left" id="currentDueDate${data.cardID}">${data.due_date}</p>
              </a>
              <div class="list-group-item">
                <ul class="pager">
                  <li class="previous"><a href="#" onclick="doing('${data.cardID}')">&larr; Doing</a></li>
                </ul>
              </div>

            </div>
        </div>
      </div>
      <!-- Single Card -->`;
      $(`.done`).append(done);
    }
  })
}

function todo(id) {
  $.ajax({
    url: "http://localhost:3000/api/cards/"+id,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      status: 'todo'
    },
    success: function(data) {
      console.log(data);
      $(`#card_${id}`).remove();
      var todo = `<!-- Single Card -->
      <div class="panel panel-default" id="card_${data.cardID}">
        <div class="panel-heading" role="tab" id="headingOne">
          <h4 class="panel-title">
            <button type="button" class="close" data-toggle="modal" data-target="#modalDelete_${data.cardID}"><span aria-hidden="true" class="glyphicon glyphicon-trash"></span></button>

            <button type="button" class="close" data-toggle="modal" data-target="#modalEdit_${data.cardID}"><span aria-hidden="true" class="glyphicon glyphicon-edit"></span></button>

            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne${data.cardID}" aria-expanded="true" aria-controls="collapseOne" id="currentTitle${data.cardID}">
              ${data.title}
            </a>
          </h4>
        </div>
        <div class="panel-body">
          <div class="alert alert-dismissible alert-info">
            <strong>In Charge : </strong> <span id="currentInCharge${data.cardID}">${data.in_charge}</span>
          </div>
        </div>
        <div id="collapseOne${data.cardID}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
            <div class="list-group">
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Description</h4>
                <p class="list-group-item-text text-left" id="currentContent${data.cardID}">${data.content}</p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">Due Date</h4>
                <p class="list-group-item-text text-left" id="currentDueDate${data.cardID}">${data.due_date}</p>
              </a>
              <div class="list-group-item">
                <ul class="pager">
                  <li class="next"><a href="#" onclick="doing('${data.cardID}')">Doing &rarr;</a></li>
                </ul>
              </div>

            </div>
        </div>
      </div>
      <!-- Single Card -->`;
      $(`.todo`).append(todo);
    }
  })
}

function updateCard(id) {
  $.ajax({
    url: "http://localhost:3000/api/cards/"+id,
    method: 'PUT',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      title: $(`#cardTitle${id}`).val(),
      content: $(`#cardDesc${id}`).val(),
      due_date: $(`#cardDueDate${id}`).val(),
      in_charge: $(`#cardInCharge${id}`).val()
    },
    success: function(data) {
      console.log(data);
      var newtitle = `<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne${data.cardID}" aria-expanded="true" aria-controls="collapseOne" id="currentTitle${data.cardID}">
        ${data.title}
      </a>`;
      var newcontent = `<p class="list-group-item-text text-left" id="currentContent${data.cardID}">${data.content}</p>`;
      var newdue_date = `<p class="list-group-item-text text-left" id="currentDueDate${data.cardID}">${data.due_date}</p>`;
      var newin_charge = `<span id="currentInCharge${data.cardID}">${data.in_charge}</span>`;
      $(`#currentTitle${id}`).replaceWith(newtitle);
      $(`#currentContent${id}`).replaceWith(newcontent);
      $(`#currentInCharge${id}`).replaceWith(newin_charge);
      $(`#currentDueDate${id}`).replaceWith(newdue_date);
    }
  })
}

function getAll() {
  //GET ALL DATA ITEM
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/cards",
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded',
    success: function(data) {
      var todo ='';
      var doing = '';
      var done = '';
      var modaldelete = '';
      var modaledit = '';
      for (var i = 0; i < data.length; i++) {
        if (data[i].status == 'todo') {
          todo += `
          <!-- Single Card -->
          <div class="panel panel-default" id="card_${data[i].cardID}">
            <div class="panel-heading" role="tab" id="headingOne">
              <h4 class="panel-title">
                <button type="button" class="close" data-toggle="modal" data-target="#modalDelete_${data[i].cardID}"><span aria-hidden="true" class="glyphicon glyphicon-trash"></span></button>

                <button type="button" class="close" data-toggle="modal" data-target="#modalEdit_${data[i].cardID}"><span aria-hidden="true" class="glyphicon glyphicon-edit"></span></button>

                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne${data[i].cardID}" aria-expanded="true" aria-controls="collapseOne" id="currentTitle${data[i].cardID}">
                  ${data[i].title}
                </a>
              </h4>
            </div>
            <div class="panel-body">
              <div class="alert alert-dismissible alert-info">
                <strong>In Charge : </strong> <span id="currentInCharge${data[i].cardID}">${data[i].in_charge}</span>
              </div>
            </div>
            <div id="collapseOne${data[i].cardID}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                <div class="list-group">
                  <a href="#" class="list-group-item">
                    <h4 class="list-group-item-heading">Description</h4>
                    <p class="list-group-item-text text-left" id="currentContent${data[i].cardID}">${data[i].content}</p>
                  </a>
                  <a href="#" class="list-group-item">
                    <h4 class="list-group-item-heading">Due Date</h4>
                    <p class="list-group-item-text text-left" id="currentDueDate${data[i].cardID}">${data[i].due_date}</p>
                  </a>
                  <div class="list-group-item">
                    <ul class="pager">
                      <li class="next"><a href="#" onclick="doing('${data[i].cardID}')">Doing &rarr;</a></li>
                    </ul>
                  </div>

                </div>
            </div>
          </div>
          <!-- Single Card -->`;
        } else if(data[i].status == 'doing') {
          doing += `<!-- Single Card -->
          <div class="panel panel-default" id="card_${data[i].cardID}">
            <div class="panel-heading" role="tab" id="headingOne">
              <h4 class="panel-title">
                <button type="button" class="close" data-toggle="modal" data-target="#modalDelete_${data[i].cardID}"><span aria-hidden="true" class="glyphicon glyphicon-trash"></span></button>

                <button type="button" class="close" data-toggle="modal" data-target="#modalEdit_${data[i].cardID}"><span aria-hidden="true" class="glyphicon glyphicon-edit"></span></button>

                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne${data[i].cardID}" aria-expanded="true" aria-controls="collapseOne" id="currentTitle${data[i].cardID}">
                  ${data[i].title}
                </a>
              </h4>
            </div>
            <div class="panel-body">
              <div class="alert alert-dismissible alert-info">
                <strong>In Charge : </strong> <span id="currentInCharge${data[i].cardID}">${data[i].in_charge}</span>
              </div>
            </div>
            <div id="collapseOne${data[i].cardID}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                <div class="list-group">
                  <a href="#" class="list-group-item">
                    <h4 class="list-group-item-heading">Description</h4>
                    <p class="list-group-item-text text-left" id="currentContent${data[i].cardID}">${data[i].content}</p>
                  </a>
                  <a href="#" class="list-group-item">
                    <h4 class="list-group-item-heading">Due Date</h4>
                    <p class="list-group-item-text text-left" id="currentDueDate${data[i].cardID}">${data[i].due_date}</p>
                  </a>
                  <div class="list-group-item">
                    <ul class="pager">
                      <li class="previous" onclick="todo('${data[i].cardID}')""><a href="#">&larr; To Do</a></li>
                      <li class="next"><a href="#" onclick="done('${data[i].cardID}')">Done &rarr;</a></li>
                    </ul>
                  </div>

                </div>
            </div>
          </div>
          <!-- Single Card -->`;
        } else {
          done += `<!-- Single Card -->
          <div class="panel panel-default" id="card_${data[i].cardID}">
            <div class="panel-heading" role="tab" id="headingOne">
              <h4 class="panel-title">
                <button type="button" class="close" data-toggle="modal" data-target="#modalDelete_${data[i].cardID}"><span aria-hidden="true" class="glyphicon glyphicon-trash"></span></button>

                <button type="button" class="close" data-toggle="modal" data-target="#modalEdit_${data[i].cardID}"><span aria-hidden="true" class="glyphicon glyphicon-edit"></span></button>

                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne${data[i].cardID}" aria-expanded="true" aria-controls="collapseOne" id="currentTitle${data[i].cardID}">
                  ${data[i].title}
                </a>
              </h4>
            </div>
            <div class="panel-body">
              <div class="alert alert-dismissible alert-info">
                <strong>In Charge : </strong> <span id="currentInCharge${data[i].cardID}">${data[i].in_charge}</span>
              </div>
            </div>
            <div id="collapseOne${data[i].cardID}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                <div class="list-group">
                  <a href="#" class="list-group-item">
                    <h4 class="list-group-item-heading">Description</h4>
                    <p class="list-group-item-text text-left" id="currentContent${data[i].cardID}">${data[i].content}</p>
                  </a>
                  <a href="#" class="list-group-item">
                    <h4 class="list-group-item-heading">Due Date</h4>
                    <p class="list-group-item-text text-left" id="currentDueDate${data[i].cardID}">${data[i].due_date}</p>
                  </a>
                  <div class="list-group-item">
                    <ul class="pager">
                      <li class="previous"><a href="#" onclick="doing('${data[i].cardID}')">&larr; Doing</a></li>
                    </ul>
                  </div>

                </div>
            </div>
          </div>
          <!-- Single Card -->`;
        }

       modaledit += `<!-- MODAL EDIT -->
           <div class="modal fade" id="modalEdit_${data[i].cardID}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
             <div class="modal-dialog" role="document">
               <div class="modal-content">
                 <div class="modal-header">
                   <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                   <h4 class="modal-title" id="myModalLabel">Edit ${data[i].title}</h4>
                 </div>
                 <div class="modal-body">
                   <!-- INPUT FORM -->
                   <form id="editCard">
                     <div class="form-group">
                       <label class="control-label" for="cardTitle">Title</label>
                       <input class="form-control" id="cardTitle${data[i].cardID}" type="text" placeholder="Enter the thing you wanna do . ." value="${data[i].title}">
                     </div>
                     <div class="form-group">
                       <label class="control-label" for="cardDesc">Description</label>
                       <textarea class="form-control" rows="3" id="cardDesc${data[i].cardID}" placeholder="Describe the thing you wanna do . .">${data[i].content}</textarea>
                     </div>
                     <div class="form-group">
                       <label class="control-label" for="cardInCharge">In Charge</label>
                       <input class="form-control" id="cardInCharge${data[i].cardID}" type="text" placeholder="Enter the thing you wanna do . ." value="${data[i].in_charge}">
                     </div>
                     <div class="form-group">
                       <label class="control-label" for="cardDueDate">Due Date</label>
                       <input class="form-control" id="cardDueDate${data[i].cardID}" type="text" placeholder="Enter the thing you wanna do . ." value="${data[i].due_date}">
                     </div>
                   </form>
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                   <button type="button" class="btn btn-success" onclick="updateCard('${data[i].cardID}')" data-dismiss="modal">Save changes</button>
                 </div>
               </div>
             </div>
           </div>`;

       modaldelete += `<!-- MODAL DELETE -->
       <div class="modal fade" id="modalDelete_${data[i].cardID}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
         <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
               <h4 class="modal-title" id="myModalLabel">Delete ${data[i].title}</h4>
             </div>
             <div class="modal-body">
               Are you sure, want to delete this?
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
               <button type="button" class="btn btn-danger" onclick="deleteCard('${data[i].cardID}')" data-dismiss="modal">Delete</button>
             </div>
           </div>
         </div>
       </div>
       `;

      }
      $(".todo").append(todo);
      $(".doing").append(doing);
      $(".done").append(done);
      $("body").append(modaledit);
      $("body").append(modaldelete);

    }


  })

}

function deleteCard(id) {
  $.ajax({
    url         : 'http://localhost:3000/api/cards/'+id,
    type        : 'DELETE',
    dataType    : 'json',
    contentType : 'application/x-www-form-urlencoded',
    success     : function() {
      $(`#card_${id}`).remove();
      $(`#modalEdit_${id}`).remove();
      $(`#modalDelete_${id}`).remove();
      $(`.modal-backdrop`).remove();
    }
  })
}


function showmain() {
  $('#intro').hide();
  $('#main').show();
  getAll();
}
