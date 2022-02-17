const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://praavi:Sripa2709@cluster0.cnrl8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

module.exports = {
    connect: (callback) => {
        client.connect((err, db ) => {
            if(err || !db)
                return callback(err);

            dbConnection = db.db("pitch-project") ;  

            console.log("Connected to mongo Atlas ");

            callback();
          });        
    },
    getDB : () => {
        return dbConnection;
    },
    disconnect : () => {
        client.close();
    }
}
