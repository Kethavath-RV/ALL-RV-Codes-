import mongoose, { ObjectId, Schema } from 'mongoose';

interface OTP extends Document{
    otp:String;
    expiryDate:Date;
    noOfAttempts:number;
    verifiedStatus:boolean;
}


let OTPSchema:Schema = new Schema({ 
    otp:{
        type:String,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    },
    noOfAttempts:{
        type:Number,
        required:true
    },
    verifiedStatus:{
        type:Boolean,
        required:true
    }
})

let OTPModel = mongoose.model<OTP>("otp",OTPSchema);
export default OTPModel;