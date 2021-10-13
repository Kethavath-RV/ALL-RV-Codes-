import OTPModel from "../model/otp.model";
import {Request, Response} from 'express'
import * as otpRsaService1 from '../service/otp_rsa1.service'
import * as EmailOtp from '../service/sendEmail.service'
import * as config from '../config/config'


//Otp Generation
export let createOtpTrasactionForEmail = async (req:Request, res:Response)=>{
    try{
        console.log("hhh")
        let emailId = req.body.emailId
        console.log("===========",emailId)
        let otp:string = "";
        for(let i:number=0;i<config.otpLength;i++){
            otp = otp + Math.floor(Math.random()*10)
        }
        let currentTime = new Date()
        let expiryTime = otpRsaService1.setExpiryTime(currentTime,config.timeValidityInMinutes)   //setting expiry time 2 minutes

        let otpTransaction = new OTPModel({
            otp:otp,
            expiryDate:expiryTime,
            noOfAttempts:0,
            verifiedStatus:false
        })

        //Inserting OTP data into database
        let createdOtpTransaction = await otpTransaction.save()

        //sending otp to email
        if(emailId){
            EmailOtp.sendEmail(emailId,otp,expiryTime)
        }else{
            res.status(500).json({
                error:"Email Must required" 
            })
        }

        let info = {
            "email":emailId,
            "otpTransactionId":createdOtpTransaction._id
        }

        //Encrypting Info consist of emailId and otp transaction id using RSA (asymmetric algorithm)
        let encryptedData:any = await otpRsaService1.encryption(JSON.stringify(info))


        res.status(200).json({
           // currentTime:new Date(),
            emailId:emailId,
            msg:"Successfully created otp transaction",
            encryptedData:encryptedData
        })
    }catch(err){
        res.status(500).json({
            error:err
        })
    }
}



//Otp Validation
export let otpValidationForEmail = async (req:Request, res:Response)=>{
    try{
        let emailId = req.body.emailId;
        console.log("---------------", req.body.emailId)
        let otp = req.body.otp;
        let encryptedData = req.body.encryptedData;

        //Decryption
        let decryptedData = await otpRsaService1.decryption(encryptedData)
        let decryptedInfo = JSON.parse(decryptedData)

        if(decryptedInfo.email == emailId){
            //Fetching otp Transaction details using transaction id 
            let otpInfo = await OTPModel.findOne({
                _id:decryptedInfo.otpTransactionId
            })
            let noOfAttempts:number;
            if(otpInfo)  //if otpInfo exixts then do following
            {
                noOfAttempts = otpInfo.noOfAttempts + 1;
                // Increment no of attempts
                OTPModel.findOneAndUpdate({_id:decryptedInfo.otpTransactionId},{$set:{noOfAttempts:noOfAttempts} },{new:true},(err:any,doc:any)=>{
                    if(err){
                        console.log(err)
                    }else{
                        if(otpInfo){  //if otpInfo exixts then do following
                            if(otpRsaService1.validateExpiryTime(otpInfo.expiryDate)){
                                //validate verifiedStatus
                                if(otpInfo.verifiedStatus == false){
                                    //validate number of attempts
                                    if(otpInfo.noOfAttempts < config.noOfAttempts){
                                        //validate otp
                                        if(otpInfo.otp == otp){
                                            console.log("otp verified successfully ", otpInfo.otp)
                                            //update verified status
                                            OTPModel.findOneAndUpdate({_id:decryptedInfo.otpTransactionId},{$set:{verifiedStatus:true}},{ new:true },(err:any,doc:any)=>{
                                                console.log(doc)
                                                if(!err){
                                                    res.status(200).json({
                                                        doc:doc,
                                                        status:"OTP verified Successfully"
                                                    })
                                                }else{
                                                    console.log("error")
                                                    res.status(500).json({
                                                            error:err
                                                        })
                                                    }
                                            })
                                        }else{
                                            console.log("Wrong OTP")
                                            res.status(500).json({
                                                status:"Wrong OTP"
                                            })
                                        }
                    
                                    }else{
                                        console.log("maximum attempts exceeded")
                                        res.status(500).json({
                                            status:"maximum attempts exceeded"
                                        })
                                    }
                                }else{
                                    console.log("Already Verified")
                                    res.status(500).json({
                                        status:"Already Verified resend OTP"
                                    })
                                }
                            }else{
                                console.log("time exceed")
                                res.status(500).json({
                                    status:"time exceed"
                                })
                            }
                        }
                    }
                })
            }else{
                res.status(500).json({
                    status:"Cannot Find OTP details"
                })
            }
        }else{
            console.log("incorrect email address")
        }
    }catch(err){
        res.status(500).json({
            error:err
        })
    }
}
