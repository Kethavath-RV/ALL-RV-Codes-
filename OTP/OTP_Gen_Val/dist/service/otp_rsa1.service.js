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
exports.validateExpiryTime = exports.setExpiryTime = exports.decryption = exports.encryption = void 0;
var node_rsa_1 = __importDefault(require("node-rsa"));
var fs = __importStar(require("fs"));
var generateKeyPairs = function () {
    //Generating public private key pairs
    var key = new node_rsa_1.default({ b: 2048 });
    //exporting public key
    var publicKey = key.exportKey('pkcs8-public-pem');
    fs.writeFileSync("./key1.pem", publicKey, 'utf-8'); //stroring public key
    //exporting Private Key
    var privateKey = key.exportKey('pkcs1-pem');
    fs.writeFileSync("./key.pem", privateKey, 'utf-8'); //storing private key(pem string format)  in .pem file
};
var encryptData = function (data) {
    var key = new node_rsa_1.default();
    var publicKey = fs.readFileSync("./key1.pem").toString(); //reading public key
    key.importKey(publicKey, "pkcs8-public"); //importing publickey
    var encryptedData = key.encrypt(data, 'base64'); //encrypting data
    return encryptedData;
};
var decryptData = function (cipherData) {
    var key = new node_rsa_1.default();
    var privateKey = fs.readFileSync("./key.pem").toString(); //reading private key in string format
    key.importKey(privateKey, "pkcs1"); //Importing private key using above retrieved string format key
    var decryptedData = key.decrypt(cipherData, 'utf8'); //decrypting data
    return decryptedData;
};
var encryption = function (data) {
    if (fs.existsSync('./key1.pem')) { //checks whether file exists or not if exists do following
        var encryptedData = encryptData(data);
        return encryptedData;
    }
    else { //if not exists then 
        generateKeyPairs();
        exports.encryption(data);
    }
};
exports.encryption = encryption;
var decryption = function (cipherData) {
    if (fs.existsSync('./key.pem')) { //checks whether file exists or not if exists do following
        var decryptedData = decryptData(cipherData);
        return decryptedData;
    }
    else { //if not exists then 
        return;
    }
};
exports.decryption = decryption;
var setExpiryTime = function (currentDate, minutes) {
    var expiryTime = new Date(currentDate.getTime() + minutes * 60000);
    return expiryTime;
};
exports.setExpiryTime = setExpiryTime;
var validateExpiryTime = function (expiryTime) {
    var currentTime = new Date();
    if (currentTime > expiryTime) {
        return false;
    }
    else
        return true;
};
exports.validateExpiryTime = validateExpiryTime;
