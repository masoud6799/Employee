var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    

    exports.addUser = (id, data, parent) => {
        var myobj = { _id: id, data: data, parent: parent };
        dbo.collection("dataStorage").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
    }

    exports.getUsers = () => {
        dbo.collection("datastorage").find({}).toArray(function(err, res) {
            if (err) throw err;
            console.log(res);
        })
    }

});