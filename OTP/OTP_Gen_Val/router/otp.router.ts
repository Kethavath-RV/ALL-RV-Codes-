import express from 'express'
import * as otpController from '../controller/otp.controller'
import * as mobileOtpController from '../controller/mobileOtp.controller'
import * as emailOtpController from '../controller/emailOtp.controller'
export let otpRouter = express.Router()


//http://localhost:9090/otp/otptransaction
otpRouter.post("/otptransaction",otpController.createOtpTrasaction)
//http://localhost:9090/otp/otpvalidation
otpRouter.post("/otpvalidation",otpController.validation)


//---------------------------------------------------------------------------------------
//Mobile OTP 
//http://localhost:9090/otp/mobileOtpTransaction
otpRouter.post("/mobileOtpTransaction",mobileOtpController.createOtpTrasactionForMobile)

//http://localhost:9090/otp/mobileOtpTransaction
otpRouter.post("/mobileOtpValidation",mobileOtpController.otpValidationForMobile)

//-----------------------------------------------------------------------------------------

//Email OTP
//http://localhost:9090/otp/emailOtpTransaction
otpRouter.post("/emailOtpTransaction",emailOtpController.createOtpTrasactionForEmail)

//http://localhost:9090/otp/emailOtpValidation
otpRouter.post("/emailOtpValidation",emailOtpController.otpValidationForEmail)

//------------------------------------------------------------------------------------------