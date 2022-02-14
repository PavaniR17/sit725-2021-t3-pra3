const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://praavi:Sripa2709@cluster0.cnrl8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// let dbConnection;

//  module.exports = {
//    connect: (callback) => {
//         client.connect((err, db ) => {
//           if(err || !db)
//               return callback(err);

//           dbConnection = db.db("pitch-project");  

//           console.log("Connected to mongo db 2 ");
//           // perform actions on the collection object
//           callback();
//         });   
//   },
//   async getDB : () => {
//       return  dbConnection;
//   }
// }


let db;

const loadDB = async () => {
    if (db) {
        return db;
    }
    try {
        const client = await MongoClient.connect(uri);
        db = client.db('pitch-project');
    } catch (err) {
        Raven.captureException(err);
    }
    return db;
};
module.exports = loadDB;