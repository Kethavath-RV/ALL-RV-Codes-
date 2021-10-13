'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.setExpiryTime = void 0;
var crypto_1 = __importDefault(require("crypto"));
var setExpiryTime = function (currentDate, minutes) {
    var expiryTime = new Date(currentDate.getTime() + minutes * 60000);
    return expiryTime;
};
exports.setExpiryTime = setExpiryTime;
//const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
var IV_LENGTH = 16; // For AES, this is always 16
function encrypt(text) {
    console.log("ecryption started");
    var iv = crypto_1.default.randomBytes(IV_LENGTH);
    var key = crypto_1.default.randomBytes(32);
    //let buffer = Buffer.from("lets rock it")
    //console.log(buffer)
    console.log("iv:", iv);
    var cipher = crypto_1.default.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    console.log("l:", cipher);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
exports.encrypt = encrypt;
function decrypt(text) {
    var textParts = text.split(':');
    console.log("l12:", textParts);
    var key = crypto_1.default.randomBytes(32);
    var iv = Buffer.from(textParts.shift(), 'hex');
    //let buffer = Buffer.from("lets rock it")
    var encryptedText = Buffer.from(textParts.join(':'), 'hex');
    console.log("l21:", encryptedText);
    var decipher = crypto_1.default.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    console.log("sfdsf", decipher);
    var decrypted = decipher.update(encryptedText);
    console.log("la", decrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    console.log("lastr", decrypted);
    return decrypted.toString();
}
exports.decrypt = decrypt;
