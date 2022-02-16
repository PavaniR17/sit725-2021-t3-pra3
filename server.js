const { response } = require("express");
let express = require("express");
let app = express();

let http = require('http').createServer(app);
let io =  require('socket.io')(http);
let dbo = require('./db/conn');
const projectRouter = require('./routes/projects');
const studentRouter = require('./routes/student');

var port = process.env.PORT || 8080;

app.use(express.static(__dirname+ '/public'));
app.use(express.json({limit: '50mb'}));
app.use('/projects',projectRouter);
app.use('/api/student',studentRouter);


app.get("/add/:n1/:n2", function (request, response) {
    const a = parseInt(request.params.n1);
    const b = parseInt(request.params.n2);
    const result = a + b || null;
    if(result == null){
        response.status(400).json({error: 'bad input, the input should be two numbers'});
    }
    else {
        response.json ({result: result})
    }
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
