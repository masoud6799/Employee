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
    // start addEmployee
    exports.addEmployee = (employee) => {
        const deferred = Q.defer()
        var myobj = { _id: employee.id, data: employee.data, org: employee.org }

        db.collection("dataStorage").insertOne(myobj)
            .then((result) => {
                deferred.resolve(result)
            }).catch(err => {
                deferred.reject(err)
            })

        return deferred.promise
    }

    // End addEmployee

    // start getEmployee
    exports.getEmployee = (id) => {
        const deferred = Q.defer()
        db.collection("dataStorage").findOne({ _id: id }).then(result => {
            deferred.resolve(result.data)
            console.log(result.data)
        }).catch(err => {
            deferred.reject(err)
        })
        return deferred.promise
    }
    // End getEmployee

    // start updateEmployee
    exports.updateEmployee = (employee) => {
        const deferred = Q.defer()
        db.collection('dataStorage').findOne({
            _id: employee.id
        }).then(res => {
            if (res != null) {
                db.collection('dataStorage').updateOne({ _id: employee.id }, {
                    $set: { data: employee.data, parent: employee.parent, org: employee.org }
                }).then(result => {
                    deferred.resolve(result)
                }).catch(error => {
                    deferred.reject(error)
                })
            }
            else {  // این قسمت موقتی است و باید تغییر کند
                return console.log('id does not exist in database ')
            }
        }).catch(err => {
            deferred.reject(err)
        })

        return deferred.promise
    }
    // End updateEmployee

})
