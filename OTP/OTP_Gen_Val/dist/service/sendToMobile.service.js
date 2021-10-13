"use strict";
// import AWS from 'aws-sdk'
// export let sendToMobile = (message:any, mobileNumber:any)=>{
//     let params = {  //parametres for sms
//         Message:message,
//         MobileNumber:mobileNumber
//     }
//     //send params to AWS sns using aws-sdk
//     let publishMessagePromise = new AWS.SNS({
//         apiVersion:'2010-03-31'
//     }).publish(params).promise();
//    return "Sent Succesfully"
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendotptomobile = void 0;
//const TwoFactor = new(require('2factor'))(07e7bcb3-302a-11e9-8806-0200cd936042)
var sendotptomobile = function (mobilenumber, otp) {
    var TwoFactor = new (require('2factor'))("07e7bcb3-302a-11e9-8806-0200cd936042");
    TwoFactor.sendOTP(mobilenumber, { otp: otp, template: 'Please enter to verify it' });
};
exports.sendotptomobile = sendotptomobile;
