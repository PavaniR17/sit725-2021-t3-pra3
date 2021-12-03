//const testButtonFunction=()=>{
//  alert('Hello World!')
//}

// connect to the socket

let socket = io();


socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})

function projectCard(project){
     return `
  <div class="row">
    <div class="col s4 m3 l2 xl1">
      <div class="card">
        <div class="card-image">
          <img src="${project.img ? project.img : 'assets/ale2.jpg'}">
          <span class="card-title">${project.title}</span>
        </div>
        <div class="card-content">
          <p>${project.info}</p>
        </div>
        <div class="card-action">
          <a href="project.html?pid=${project.projectID}">This is a link</a>
        </div>
      </div>
      </div>
    </div>`;
}


$(document).ready(function(){
  console.log('Ready')
  
  $('.right-align-navbar').right-align-navbar();

  //bind the button
  //$('#testButton').click(testButtonFunction)

  //test get call
  $.get('/projects',(result)=>{
    for(let p of result) {
      $('#projects-list').append(projectCard(p))
    }
    
        // $('#projects-list').text(JSON.stringify(result))
    console.log(result)
  })


})
