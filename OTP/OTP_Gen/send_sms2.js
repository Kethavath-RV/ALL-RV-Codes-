var AWS = require('aws-sdk')

var params = {
    Message: "phone_message",
    PhoneNumber: "9182984926"
};

//Send the params to AWS SNS using aws-sdk
var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
publishTextPromise.then(
    function (data) {
        console.log("Success")
        //return res.send({"Status":"Success","Details":encoded});
    }).catch(
    function (err) {
        console.log("Failed")
       // return res.status(400).send({"Status":"Failure","Details": err });
});
