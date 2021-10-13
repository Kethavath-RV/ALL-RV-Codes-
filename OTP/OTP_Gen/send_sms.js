const SendOtp = require('sendotp');
const sendOtp = new SendOtp('AuthKey');

console.log("started")
sendOtp.send("919182984926", "REALVARIABLE", "4635", function (error, data) {
  console.log(data);
});