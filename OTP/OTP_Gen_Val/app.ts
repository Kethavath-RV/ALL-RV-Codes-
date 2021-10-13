import express,{Application} from "express"
import bodyParser from "body-parser"
import  mongoose  from "mongoose"
import cors from 'cors';
import {otpRouter} from "./router/otp.router"

let app:Application = express()
let portNumber = 9090 || process.env.PORT;
//let url = "mongodb://localhost:27017/ArogyaFarmacy"
let url = "mongodb+srv://admin:admin@meanstack-cluster.wcizr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(bodyParser.json())
app.use(cors())
console.log("hey")
let option = {
        useNewUrlParser: true,
        useUnifiedTopology: true    
    }
//database connect
mongoose.connect(url).then(con=>{
    console.log("DB connceted Successfully")
}).catch(err=>{
    console.log(err)
})

//database connection
mongoose.connection;
app.use("/otp",otpRouter)



app.listen(portNumber,()=>{
    console.log(`Server Running on port number ${portNumber}`)
})