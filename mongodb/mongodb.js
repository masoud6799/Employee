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
    // start addEmployee
    exports.addEmployee = (employee) => {
        const deferred = Q.defer()
        let myobj = { _id: employee.id, data: employee.data, org: employee.org }
        let obj = { _id: employee.id, parent: employee.parent }
        let countResolve = 0;
        let countReject = 0;
        Q.allSettled(
            [
                db.collection("dataStorage").insertOne(myobj)
                    .then((result) => {
                        deferred.resolve(result)
                    }).catch(err => {
                        deferred.reject(err)
                    }),
                db.collection("dataMap").insertOne(obj)
                    .then((result) => {
                        deferred.resolve(result)
                    }).catch(err => {
                        deferred.reject(err)
                    })]
        ).then(result => {
            result.forEach(element => {
                if (element.state === 'fulfilled') {
                    let value = result;
                    console.log(value);
                    countResolve++;
                }
                else {
                    let reason = result.reason;
                    console.log(reason);
                    countReject++;
                }
            })
            if (countResolve === 2) deferred.resolve(result)
            else if (countReject === 2) deferred.reject('duplicate');
            else {
                rollback(employee.id)
                deferred.reject('data base problem');
            }
            // return result
        }).fail(function (error) {
            console.log('all err:', error)
            return error
        });
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
