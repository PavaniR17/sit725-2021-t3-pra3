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
  <div class="row">
    <div class="col s6 m4 l3 x12">
      <div class="card">
        <div class="card-image">
          <img src="${project.img ? project.img : 'assets/pav.jpg'}">
          <span class="card-title">${project.title}</span>
        </div>
        <div class="card-content">
          <p>${project.info}</p>
        </div>
        <div class="card-action">
          <a href="project.html?pid=${project.projectID}">This is a link</a>
        </div>
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
            "url": "/project",
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
