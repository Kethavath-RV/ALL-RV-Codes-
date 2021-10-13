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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpValidationForMobile = exports.createOtpTrasactionForMobile = void 0;
var otp_model_1 = __importDefault(require("../model/otp.model"));
var otpRsaService1 = __importStar(require("../service/otp_rsa1.service"));
var MobileOtp = __importStar(require("../service/sendToMobile.service"));
var config = __importStar(require("../config/config"));
//Otp Generation
var createOtpTrasactionForMobile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mobileNumber, otp, i, currentTime, expiryTime, otpTransaction, createdOtpTransaction, b, info, encryptedInfo, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                mobileNumber = req.body.mobileNumber;
                otp = "";
                for (i = 0; i < config.otpLength; i++) {
                    otp = otp + Math.floor(Math.random() * 10);
                }
                currentTime = new Date();
                expiryTime = otpRsaService1.setExpiryTime(currentTime, config.timeValidityInMinutes) //setting expiry time 2 minutes
                ;
                otpTransaction = new otp_model_1.default({
                    otp: otp,
                    expiryDate: expiryTime,
                    noOfAttempts: 0,
                    verifiedStatus: false
                });
                return [4 /*yield*/, otpTransaction.save()];
            case 1:
                createdOtpTransaction = _a.sent();
                if (!mobileNumber) return [3 /*break*/, 3];
                return [4 /*yield*/, MobileOtp.sendotptomobile(req.body.mobileNumber, otp)];
            case 2:
                b = _a.sent();
                console.log("otp sent to mobilenumber sent successuflly : ", b);
                return [3 /*break*/, 4];
            case 3:
                res.status(500).json({
                    error: " MobileNumber Must required"
                });
                _a.label = 4;
            case 4:
                info = {
                    "mobileNumber": mobileNumber,
                    "otpTransactionId": createdOtpTransaction._id
                };
                return [4 /*yield*/, otpRsaService1.encryption(JSON.stringify(info))];
            case 5:
                encryptedInfo = _a.sent();
                res.status(200).json({
                    currentTime: new Date(),
                    msg: "Successfully created otp transaction",
                    data: createdOtpTransaction,
                    info: info,
                    encryptedInfo: encryptedInfo
                });
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                res.status(500).json({
                    error: err_1
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createOtpTrasactionForMobile = createOtpTrasactionForMobile;
//Otp Validation
var otpValidationForMobile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mobileNumber, otp_1, encryptedData, decryptedData, decryptedInfo_1, otpInfo_1, noOfAttempts, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                mobileNumber = req.body.mobileNumber;
                otp_1 = req.body.otp;
                encryptedData = req.body.encryptedInfo;
                return [4 /*yield*/, otpRsaService1.decryption(encryptedData)];
            case 1:
                decryptedData = _a.sent();
                decryptedInfo_1 = JSON.parse(decryptedData);
                if (!(decryptedInfo_1.mobileNumber == mobileNumber)) return [3 /*break*/, 3];
                return [4 /*yield*/, otp_model_1.default.findOne({
                        _id: decryptedInfo_1.otpTransactionId
                    })];
            case 2:
                otpInfo_1 = _a.sent();
                noOfAttempts = void 0;
                if (otpInfo_1) //if otpInfo exixts then do following
                 {
                    noOfAttempts = otpInfo_1.noOfAttempts + 1;
                    // Increment no of attempts
                    otp_model_1.default.findOneAndUpdate({ _id: decryptedInfo_1.otpTransactionId }, { $set: { noOfAttempts: noOfAttempts } }, { new: true }, function (err, doc) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (otpInfo_1) { //if otpInfo exixts then do following
                                if (otpRsaService1.validateExpiryTime(otpInfo_1.expiryDate)) {
                                    //validate verifiedStatus
                                    if (otpInfo_1.verifiedStatus == false) {
                                        //validate number of attempts
                                        if (otpInfo_1.noOfAttempts < config.noOfAttempts) {
                                            //validate otp
                                            if (otpInfo_1.otp == otp_1) {
                                                console.log("otp verified successfully ", otpInfo_1.otp);
                                                //update verified status
                                                otp_model_1.default.findOneAndUpdate({ _id: decryptedInfo_1.otpTransactionId }, { $set: { verifiedStatus: true } }, { new: true }, function (err, doc) {
                                                    console.log(doc);
                                                    if (!err) {
                                                        res.status(200).json({
                                                            doc: doc,
                                                            status: "OTP verified Successfully"
                                                        });
                                                    }
                                                    else {
                                                        console.log("error");
                                                        res.status(500).json({
                                                            error: err
                                                        });
                                                    }
                                                });
                                            }
                                            else {
                                                console.log("Wrong OTP");
                                                res.status(500).json({
                                                    status: "Wrong OTP",
                                                    doc: doc
                                                });
                                            }
                                        }
                                        else {
                                            console.log("maximum attempts exceeded");
                                            res.status(500).json({
                                                status: "maximum attempts exceeded",
                                                doc: doc
                                            });
                                        }
                                    }
                                    else {
                                        console.log("Already Verified");
                                        res.status(500).json({
                                            status: "Already Verified",
                                            doc: doc
                                        });
                                    }
                                }
                                else {
                                    console.log("time exceed");
                                    res.status(500).json({
                                        status: "time exceed",
                                        doc: doc
                                    });
                                }
                            }
                        }
                    });
                }
                else {
                    res.status(500).json({
                        status: "Cannot Find OTP details"
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                console.log("incorrect Mobile Number");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                res.status(500).json({
                    error: err_2
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.otpValidationForMobile = otpValidationForMobile;
