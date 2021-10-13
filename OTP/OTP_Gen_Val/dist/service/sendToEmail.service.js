"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpToEmail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var sendOtpToEmail = function (otp, emailId) {
    var transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'naveen.kethavath@realvariable.com',
            pass: 'mcbvycwlsyzffize'
        }
    });
    var mailOptions = {
        from: 'naveen.kethavath@realvariable.com',
        to: "" + emailId,
        subject: 'First Otp ',
        text: "Dear User,\n"
            + (otp + " is your otp Please enter for verification. \n")
            + "\n\n\nRegards\n"
            + "Real Variable"
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
    return "Email Sent Succesfully";
};
exports.sendOtpToEmail = sendOtpToEmail;
