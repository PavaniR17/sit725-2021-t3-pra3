//const testButtonFunction=()=>{
//  alert('Hello World!')
//}

// connect to the socket

let socket = io();


socket.on('project:update', (p) => {
  $('#projects-list').append(projectCard(p.project));
})

socket.on('chat:broadcast', (msg) => {
  $("#chat-msg-list").append(createMessage(msg,true));
})

function projectCard(project){
     return `
    <div class="col s6 m4 l3 x12" id = "project-id-${project.projectID}">
      <div class="card">
        <div class="card-image">
          <img src="${project.img ? project.img : 'assets/pav.jpg'}">
        </div>
        <div class="card-content">
        <span class="card-title">${project.title}</span>
          <p>${project.info}</p>
        </div>
        <div class="card-action">
          <a class = "waves-effect waves-light btn" href="project.html?pid=${project.projectID}">Open</a>
          <a class = "waves-effect waves-light red btn" onClick ="deleteProject(${project.projectID})" ><i class="material-icons">delete</i></a>
        </div>
      </div>`;
}

function getBase64(file) {

  return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject (error);
  });
}

function createProject(){

  let img = document.querySelector('#project-file').files[0];
  if(img){
    getBase64(img).then(
      d=> {
        const project = {
          "projectID": $('#project-id').val(),
          "title": $('#project-title').val(),
          "info":$('#project-info').val(),
          "img": d 
        };
        var settings = {
            "url": "/projects",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type" : "application/json"
            },
            "data": JSON.stringify({
              project
            })
      
        };
        $.ajax(settings).done(function (response){
      //   $('#projects-list').append (projectCard(project))
         $('#project-id').val('');
         $('#project-title').val('');
         $('#project-info').val('');
         $('#project-file').val('');
         $('.modal').modal('close');
        });
      }
    )
  }

}

function deleteProject(id){
  var settings = {
    "url": `projects/${id}`,
    "method": "DELETE",
    "timeout": 0
  }
  $.ajax(settings).done(function (response){
    $(`#project-id-${id}`).remove();

  });
}

$(document).ready(function(){
  $('.fixed-action-btn').floatingActionButton();
});

function createMessage(msg, isRight = false) {
  return `<p class= "${isRight? 'msg-right' : 'msg-left'}">
  ${msg}
  </p><br style = "clear:both"/>`;
}

$(document).ready(function(){
  console.log('Ready')
  
  //$('.right-align-navbar').right-align-navbar();

  $('.sidenav').sidenav();
  $('.modal').modal();
  $('#insert-project').click(() => {
    createProject();

  })




  //bind the button
  //$('#testButton').click(testButtonFunction)

  //test get call
  $.get('/projects',(result)=>{
    for(let p of result) {
      $('#projects-list').append(projectCard(p.project))
    }
    console.log(result)
  });


 
  $("#chat-send-btn").click(() => {
// send the chat to backend server
   socket.emit("chat:msg",$("#chat-msg").val())
//add this message to chat msg list on left side of the screen
    $("#chat-msg-list").append(createMessage( $("#chat-msg").val()));

//clear message int txt 
   $("#chat-msg").val("");
})


});
