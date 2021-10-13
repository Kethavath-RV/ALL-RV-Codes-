"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryption = exports.encryption = void 0;
var crypto_1 = __importDefault(require("crypto"));
// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//     // The standard secure default length for RSA keys is 2048 bits
//     modulusLength: 2048,
//   });
var _a = crypto_1.default.generateKeyPairSync("rsa", {
    modulusLength: 2048,
}), publicKey = _a.publicKey, privateKey = _a.privateKey;
var temp_encrypted;
var encryption = function (data) {
    var encryptedData = crypto_1.default.publicEncrypt({
        key: publicKey,
        padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    }, Buffer.from(data) // We convert the data string to a buffer using `Buffer.from`
    );
    temp_encrypted = encryptedData;
    console.log("encypted data: ", encryptedData);
    return encryptedData;
};
exports.encryption = encryption;
var decryption = function (ciphertext) {
    console.log("decryption started");
    var decryptedData = crypto_1.default.privateDecrypt({
        key: privateKey,
        padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    }, ciphertext);
    console.log("decrypted data is : ", decryptedData.toString());
    return decryptedData.toString();
};
exports.decryption = decryption;
