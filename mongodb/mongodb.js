const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const databaseName = 'mydb'
const Q = require('q')


MongoClient.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true
}, function (err, client) {
    if (err) {
        return console.log('Unable to connect to database!!')
    }

    const db = client.db(databaseName);


    exports.addUser = (User) => {
        const deferred = Q.defer()
        var myobj = { _id: User.id, data: User.data, org: User.org };
        db.collection("dataStorage").insertOne(myobj)
            .then((result) => {
                deferred.resolve(result)
            }).catch(err => {
                deferred.reject(err)
            })
        return deferred.promise
    }
    
    exports.dataStorage = (User) => {
        const deferred = Q.defer()
        var myobj = { _id: User.id, parent: User.parent };
        db.collection("dataStorage").insertOne(myobj)
            .then((result) => {
                deferred.resolve(result)
            }).catch(err => {
                deferred.reject(err)
            })
        return deferred.promise
    }
    exports.getUsers = () => {
        const deferred = Q.defer()
        db.collection("dataStorage").findOne({}).then(result => {
            deferred.resolve(result.data)
            console.log(result.data)
        }).catch(err => {
            deferred.reject(err)
        })
        return deferred.promise
    }

    exports.updateUser = (User) => {
        db.collection('dataStorage').updateOne(User, (error, result) => {
            if (error) {
                console.log(error)
            }
            console.log(result.ops)
        }).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    }
    // Q.all([
    //     addUser(User),
    //     dataStorage(User)
    // ]).then(function (result) {
    //     console.log('all ok:', result)
    // }).fail(function (error) {
    //     console.log('all err:', error)
    // });

})
