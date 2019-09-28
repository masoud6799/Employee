const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const databaseName = 'mydb'
const Q = require('q')
const deferred = Q.defer()


MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName);

    exports.addUser = (User) => {
        var myobj = { _id: User.id, data: User.data, parent: User.parent };
        return  db.collection("dataStorage").insertOne(myobj)
        }

    exports.getUsers = () => {
        db.collection("datastorage").find({}).toArray(function (err, res) {
            if (err) throw err;
            console.log(res);
        })
    }
    // dbo.close();
})
