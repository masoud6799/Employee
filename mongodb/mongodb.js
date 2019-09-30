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
    console.log('connecting to the database')

    const db = client.db(databaseName);

    insertDataStorage = (myobj) => {
        const deferred = Q.defer()
        db.collection("dataStorage").insertOne(myobj)
            .then((result) => {
                deferred.resolve(result)
            }).catch(err => {
                deferred.reject(err)
            })
        return deferred.promise;
    }

    insertDataMap = (obj) => {
        const deferred = Q.defer()
        db.collection("dataMap").insertOne(obj)
            .then((result) => {
                deferred.resolve(result)
            }).catch(err => {
                deferred.reject(err)
            })
        return deferred.promise;
    }

    // start addEmployee
    exports.addEmployee = (employee) => {
        const deferred = Q.defer()
        let myobj = { _id: employee.id, data: employee.data, org: employee.org }
        let obj = { _id: employee.id, parent: employee.parent }
        var countResolve = 0;
        var countReject = 0;
        Q.allSettled(
            [
                insertDataStorage(myobj),
                insertDataMap(obj)
            ]
        )
            .then(function (results) {
                results.forEach(function (result) {
                    if (result.state === "fulfilled") {
                        var value = result.value;
                        countResolve++;
                    } else {
                        var reason = result.reason;
                        countReject++;
                    }
                })
                if (countResolve === 2)
                    deferred.resolve(results);
                else if (countReject === 2)
                    deferred.reject(new Error('id already exist in database'))
                else {
                    rollback(employee.id)
                    throw new Error('there is a problem in database!!!')
                }
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
                Q.all([
                    db.collection('dataStorage')
                        .updateOne(
                            { _id: employee.id },
                            {
                                $set: { data: employee.data, org: employee.org }
                            })
                        .then(result => {
                            deferred.resolve(result)
                        }).catch(error => {
                            deferred.reject(error)
                        }),

                    db.collection('dataMap')
                        .updateOne(
                            { _id: employee.id },
                            { $set: { parent: employee.parent } })
                ]).then(function (result) {
                    return result
                })
                    .fail(function (error) {
                        console.log('all err:', error)
                        return error
                    })
            }
            else {
                throw new Error('id does not exist in database')
            }
        }).catch(err => {
            deferred.reject(err)
        })

        return deferred.promise
    }
    // End updateEmployee

    rollback = (id) => {
        Q.all([
            db.collection('dataStorage').deleteOne(id)
                .then(result => {
                    console.log(result)
                }).catch(err => {
                    console.log(err)
                }),
            db.collection('dataMap').deleteOne(id)
                .then(result => {
                    console.log(result)
                }).catch(err => {
                    console.log(err)
                })
        ])
    }
})
