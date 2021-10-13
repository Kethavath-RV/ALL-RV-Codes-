"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var otp_router_1 = require("./router/otp.router");
var app = express_1.default();
var portNumber = 9090 || process.env.PORT;
//let url = "mongodb://localhost:27017/ArogyaFarmacy"
var url = "mongodb+srv://admin:admin@meanstack-cluster.wcizr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(body_parser_1.default.json());
app.use(cors_1.default());
console.log("heysss");
var option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
//database connect
mongoose_1.default.connect(url).then(function (con) {
    console.log("DB connceted Successfully");
}).catch(function (err) {
    console.log(err);
});
//database connection
mongoose_1.default.connection;
app.use("/otp", otp_router_1.otpRouter);
app.listen(portNumber, function () {
    console.log("Server Running on port number " + portNumber);
});
