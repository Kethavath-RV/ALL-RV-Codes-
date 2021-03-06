"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var _a = crypto_1.default.generateKeyPairSync("rsa", {
    modulusLength: 2048,
}), publicKey = _a.publicKey, privateKey = _a.privateKey;
var data = "my secret data";
var encryptedData = crypto_1.default.publicEncrypt({
    key: publicKey,
    padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha512",
}, 
// We convert the data string to a buffer using `Buffer.from`
Buffer.from(data));
// The encrypted data is in the form of bytes, so we print it in base64 format
// so that it's displayed in a more readable form
console.log("encypted data: ", encryptedData.toString("base64"));
var decryptedData = crypto_1.default.privateDecrypt({
    key: privateKey,
    // In order to decrypt the data, we need to specify the
    // same hashing function and padding scheme that we used to
    // encrypt the data in the previous step
    padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha512",
}, encryptedData);
// The decrypted data is of the Buffer type, which we can convert to a
// string to reveal the original data
console.log("decrypted data: ", decryptedData.toString());
