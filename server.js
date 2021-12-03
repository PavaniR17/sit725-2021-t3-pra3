let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);





var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

console.log(process.env.name)

app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});


//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});


let id = 1;
const projects = []

for (let id = 0; id < 21; id++ ){
  projects.push({
    prijectID: id,
    title: 'projects' + id,
    info: `This info is for project number ${id}`,
    img: null,
  });
}

app.get("/projects", function(request, response){
  response.json(projects);
});


//app.get("/projects", function(request, response){
 // response.end("Hello" + user_name + "!");
 //});

http.listen(port,()=>{
  console.log("Listening on port ", port);
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
