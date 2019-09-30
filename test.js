// function x1(){
//     setTimeout(function(){
//         return 1;
//     }, 100);
//     return 2
// }
// console.log('sss', x1());

function x2(myCallback) {
    setTimeout(function () {
        myCallback(1)
    }, 100);
}

x2(function (result) {
    console.log(result)
})

// function x3(num, myCallback){
//     setTimeout(function(){
//         if(num<10){
//             myCallback('FAIL');
//         }
//         else{
//             myCallback(null, 'SUCCESS');
//         }
//     }, 100);
// }

// x3(1, function(error, result){
//     if(error){
//         console.log('err:', error)
//     }
//     else{
//         console.log('ok:',result)
//     }
// })

// function x4(num, delay, myCallback){
//     setTimeout(function(){
//         if(num<10){
//             myCallback('FAIL');
//         }
//         else{
//             myCallback(null, 'SUCCESS');
//         }
//     }, delay);
// }

// x4(1, 100, function(error, result){
//     if(error){
//         console.log('err:', error)
//     }
//     else{
//         console.log('ok:',result)
//     }
// })

// x4(15, 50, function(error, result){
//     if(error){
//         console.log('err:', error)
//     }
//     else{
//         console.log('ok:',result)
//     }
// })

var Q = require('q')
var deferred = Q.defer()

function x5(num, delay) {
    const deferred = Q.defer()
    setTimeout(function () {
        if (num < 10) {
            console.log('inside x5 fail' + num)
            deferred.reject('FAIL ' + num)
        }
        else {
            console.log('inside x5 success' + num)
            deferred.resolve('SUCCESS ' + num);
        }
    }, delay);
    return deferred.promise;
}

// x5(5, 100)
//     .then(function (result) {
//         console.log('ok:', result)
//     })
//     .fail(function (error) {
//         console.log('err:', error)
//     })

Q.all([
    x5(15, 10),
    x5(25, 5),
    x5(5, 150)
])
    .then(function (result) {
        console.log('all ok:', result)
    })
    .fail(function (error) {
        console.log('all err:', error)
    });

// Q.allSettled([
//         x5(15, 100),
//         x5(5, 10),
//         x5(25, 150)
//     ])
//     .then(function (result) {
//         console.log('all settled:', result)
//     });

exports.addEmployee = (body, response) => {
    var deferred = q.defer()
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
        if (err) error(response, { message: ' Error message related to database' }, 503);
        else {

            var dbo = db.db("mydb");

            const dataStorage = {
                _id: body._id,
                data: body.data,
                org: body.org

            }
            const dataMap = {
                _id: body._id,
                parent: body.parent

            }
            q.all([
                dataStorageInsert(dataStorage, dbo),
                dataMapInsert(dataMap, dbo)
            ])
                .then(function (res) {
                    console.log(res)
                    console.log('all ok:', res)
                    deferred.resolve(res);
                })
                .fail(function (err) {
                    console.log(err)
                    console.log('all err:', err)
                    deferred.reject(err);
                });


        }
    });
    return deferred.promise;

}


function dataStorageInsert(dataStorage, dbo) {
    const deferred = q.defer()
    dbo.collection("dataStorage").insertOne(dataStorage, function (err, res) {
        if (err) {
            deferred.reject(err);
        }
        else {
            console.log('ok data storage');
            deferred.resolve(res);
        }
    });
    return deferred.promise;
}

function dataMapInsert(dataMap, dbo) {
    const deferred = q.defer()
    dbo.collection("dataMap").insertOne(dataMap, function (err, res) {
        if (err) {
            deferred.reject('err');
        }
        else {
            console.log('ok datamap')
            deferred.resolve('res');
        }
    });



    exports.addEmployee = (body, response) => {
        var deferred = q.defer()
        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
            if (err) error(response, { message: ' Error message related to database' }, 503);
            else {

                var dbo = db.db("mydb");

                const dataStorage = {
                    _id: body._id,
                    data: body.data,
                    org: body.org

                }
                const dataMap = {
                    _id: body._id,
                    parent: body.parent

                }
                q.allSettled([
                    dataStorageInsert(dataStorage, dbo),
                    dataMapInsert(dataMap, dbo)
                ])
                    .then(function (results) {
                        var countResolve = 0;
                        var countReject = 0;
                        results.forEach(function (result) {
                            if (result.state === "fulfilled") {
                                var value = result.value;
                                console.log(value.ops);
                                countResolve++;
                            } else {
                                var reason = result.reason;
                                console.log(reason);
                                countReject++;
                                // deferred.reject(err);

                            }
                        })
                        if (countResolve === 2) deferred.resolve(results);
                        else if (countReject === 2) deferred.reject('duplicate');
                        else {
                            console.log('noooooooooooooooooooooooooooooooooooooo')
                            var queryDataMap = { _id: dataMap._id };
                            var queryDataStorage = { _id: dataStorage._id };
                            rollBackInsert(queryDataMap, queryDataStorage, dbo)

                            deferred.reject('data base problem');
                        }

                    })
                // .fail(function (err) {
                //     // var queryDataMap = { _id: dataMap._id };
                //     // var queryDataStorage = { _id: dataStorage._id };
                //     console.log('all err:', err)
                //     rollBackInsert(queryDataMap, queryDataStorage, dbo)
                //     // deferred.reject(err);


                // });

            }
        });
        return deferred.promise;

    }
}

function rollBackInsert(queryDataMap, queryDataStorage, dbo) {
    // const deferred = q.defer()
    dbo.collection("dataMap").deleteOne(queryDataMap, function (err, obj) {

        if (err) {
            console.log(err)
            // deferred.reject(err);
        }
        else {
            // console.log(res)
            console.log('delete success datamap')
            // deferred.resolve(res);
            // ok(response, { message: 'Data saved ' }, 201)
        }
    });
    dbo.collection("dataStorage").deleteOne(queryDataStorage, function (err, obj) {
        if (err) {
            // console.log(err)
            // deferred.reject(err);
        }
        else {
            // console.log(res)
            console.log('delete success dataStorage')
            // deferred.resolve(res);
            // ok(response, { message: 'Data saved ' }, 201)
        }
    });
    // return deferred.promise;
}