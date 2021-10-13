"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpRouter = void 0;
var express_1 = __importDefault(require("express"));
var otpController = __importStar(require("../controller/otp.controller"));
var mobileOtpController = __importStar(require("../controller/mobileOtp.controller"));
var emailOtpController = __importStar(require("../controller/emailOtp.controller"));
exports.otpRouter = express_1.default.Router();
//http://localhost:9090/otp/otptransaction
exports.otpRouter.post("/otptransaction", otpController.createOtpTrasaction);
//http://localhost:9090/otp/otpvalidation
exports.otpRouter.post("/otpvalidation", otpController.validation);
//---------------------------------------------------------------------------------------
//Mobile OTP 
//http://localhost:9090/otp/mobileOtpTransaction
exports.otpRouter.post("/mobileOtpTransaction", mobileOtpController.createOtpTrasactionForMobile);
//http://localhost:9090/otp/mobileOtpTransaction
exports.otpRouter.post("/mobileOtpValidation", mobileOtpController.otpValidationForMobile);
//-----------------------------------------------------------------------------------------
//Email OTP
//http://localhost:9090/otp/emailOtpTransaction
exports.otpRouter.post("/emailOtpTransaction", emailOtpController.createOtpTrasactionForEmail);
//http://localhost:9090/otp/emailOtpValidation
exports.otpRouter.post("/emailOtpValidation", emailOtpController.otpValidationForEmail);
//------------------------------------------------------------------------------------------
