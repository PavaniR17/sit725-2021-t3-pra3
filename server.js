let express = require("express");
let app = express();

let http = require('http').createServer(app);
let io =  require('socket.io')(http);
let dbo = require('./db/conn');

var port = process.env.PORT || 8080;

app.use(express.static(__dirname+ '/public'));
app.use(express.json());

app.get("/test", function (request, response) {
var user_name = request.query.user_name;
response.end("Hello "+ user_name + ":");
});
//socket test
io.on ('connection', (socket) => {
console.log('a user connected');
socket.on('disconnect', () => {
console.log('user disconnected');
});

setInterval(()=> {
socket.emit('number', parseInt(Math.random ()*10));}, 1000);

});



//  const projects = [];

//     for (let id =1; id < 21; id++) {
//     projects.push({
//     projectID: id,
//     title: 'project' +id,
//     info:`This info is for project number ${id}`,
//     img: null });
//     }



app.get("/projects", function (request, response) {
    dbo.getDB()
    .collection("projects")
    .find({})
    .toArray((err,res) => {
        if(err){
            throw err;
        }
        response.send(res);
    })
});

app.get("/project", function (request, response) {
    console.log(request.query.id)
    dbo.getDB()
    .collection("projects")
    .find({"project.projectID":request.query.id})
    .toArray((err,res) => {
        if(err){
            throw err;
        }
        response.send(res);
    })
   // response.json(projects);
});

app.post("/project", function (request, response) {

    if(!request.body)
        response.sendStatus(500);

    dbo.getDB().collection("projects").insertOne(request.body)    
    response.sendStatus(204);
});

dbo.connect((err)=> {
    if (err){
        console.log(err);
        process.exit();
    }
    http.listen (port, () => {
    console.log(" listening on port ", port);
    })
});

require("cf-deployment-tracker-client").track();
