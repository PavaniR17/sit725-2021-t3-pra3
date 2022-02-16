//const testButtonFunction=()=>{
//  alert('Hello World!')
//}

// connect to the socket

let socket = io();


socket.on('number', (msg) => {
    //console.log('Random number: ' + msg);
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
         $('#projects-list').append (projectCard(project))
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
    
        // $('#projects-list').text(JSON.stringify(result))
    console.log(result)
  });


});
