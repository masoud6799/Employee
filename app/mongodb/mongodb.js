/* #region variable */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const databaseName = 'mydb'
const Q = require('q')
/* #endregion */

/* #region MongoClient connect */
mongoClient = () => {
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, client) {
        if (err) {
            return console.log('Unable to connect to database!!')
        }
        console.log('connecting to the database')
        db = client.db(databaseName)
    })
}

var db = mongoClient()

/* #endregion */

/* #region insertDataStorage */
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
/* #endregion */

/* #region insertDataMap */
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
/* #endregion */

/* #region addEmployee */
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
    // })
    return deferred.promise
}
/* #endregion */

/* #region getEmployee */
exports.getEmployee = (id) => {
    const deferred = Q.defer()

    db.collection("dataStorage").findOne({ _id: id }).then(result => {
        deferred.resolve(result.data)
        // console.log(result.data)
    }).catch(err => {
        deferred.reject(err)
    })

    return deferred.promise
}
/* #endregion */

/* #region updateEmployee */
exports.updateEmployee = (employee) => {
    const deferred = Q.defer()
    db.collection('dataStorage').findOne({
        _id: employee.id
    }).then(res => {
        if (res != null) {
            Q.all([
                updateDataStorage(employee)
                ,
                updateDataMap(employee)
            ]).then(function (result) {
                // return result
                deferred.resolve(result)
                // return result
            })
                .fail(function (error) {
                    console.log('all err:', error)
                    deferred.reject(error)
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
/* #endregion */

/* #region updateDataStorage */
updateDataStorage = (employee) => {
    const deferred = Q.defer()

    db.collection('dataStorage')
        .updateOne({ _id: employee.id }, { $set: { data: employee.data, org: employee.org } }, (error, result) => {
            if (error) {
                deferred.reject(error)
            }
            else {
                deferred.resolve(result)
            }
        })
    return deferred.promise
}
/* #endregion */

/* #region updateDataStorage */
updateDataMap = (employee) => {
    const deferred = Q.defer()

    db.collection('dataMap')
        .updateOne({ _id: employee.id }, { $set: { parent: employee.parent } }, (error, result) => {
            if (error) {
                deferred.reject(error)
            }
            else {
                deferred.resolve(result)
            }
        })
    return deferred.promise
}
/* #endregion */

/* #region rollback */
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
/* #endregion */
