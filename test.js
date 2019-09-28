// function x1(){
//     setTimeout(function(){
//         return 1;
//     }, 100);
//     return 2
// }
// console.log('sss', x1());

function x2(myCallback){
    setTimeout(function(){
        myCallback(1)
    }, 100);
}

x2(function(result){
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

