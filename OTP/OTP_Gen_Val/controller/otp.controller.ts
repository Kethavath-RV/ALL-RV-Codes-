import OTPModel from "../model/otp.model";
import {Request, Response} from 'express'
import * as otpRsaService1 from '../service/otp_rsa1.service'
import * as EmailOtp from '../service/sendEmail.service'
import * as MobileOtp from '../service/sendToMobile.service'
import * as config from '../config/config'


//Otp Generation
export let createOtpTrasaction = async (req:Request, res:Response)=>{
    try{
        let emailId = req.body.emailId
        let mobileNumber = req.body.mobileNumber
        let otp:string = "";
        for(let i:number=0;i<config.otpLength;i++){
            otp = otp + Math.floor(Math.random()*10)
        }
        //const otp = Math.floor((Math.random()*1000000)+1);  //6 digit otp generation using random function
        let currentTime = new Date()
        let expiryTime = otpRsaService1.setExpiryTime(currentTime,config.timeValidityInMinutes)   //setting expiry time 2 minutes
        
        let otpTransaction = new OTPModel({
            otp:otp,
            expiryDate:expiryTime,
            noOfAttempts:0,
            verifiedStatus:false
        })

        //Inserting data into database
        let createdOtpTransaction = await otpTransaction.save()

        if(emailId){
            EmailOtp.sendEmail(emailId,otp,expiryTime)
        }else if(mobileNumber){
            //otp sending to Mobile Number
            let b = await MobileOtp.sendotptomobile(req.body.mobileNumber,otp);
            console.log("otp sent to mobilenumber sent successuflly : ",b)
        }else{
            res.status(500).json({
                error:"Email or MobileNumber Must required"
            })
        }

        let info = {
            "email":emailId,
            "mobileNumber":mobileNumber,
            "otpTransactionId":createdOtpTransaction._id
        }

        //Encryption using RSA-algorithm
        let encryptedInfo = await otpRsaService1.encryption(JSON.stringify(info))

        // let decryptedInfo = await otpRsaService1.decryption(encryptedInfo)
        // let decryptedInfoData = JSON.parse(decryptedInfo)

        res.status(200).json({
            currentTime:new Date(),
            msg:"Successfully created otp transaction",
            data:createdOtpTransaction,
            info:info,
            encryptedInfo:encryptedInfo
        })
    }catch(err){
        res.status(500).json({
            error:err
        })
    }
}



//Otp Validation
export let validation = async (req:Request, res:Response)=>{
    try{
        let emailId = req.body.emailId;
        let mobileNumber = req.body.mobileNumber;
        let otp = req.body.otp;
        let encryptedData = req.body.encryptedInfo;

        //Decryption
        let decryptedData = await otpRsaService1.decryption(encryptedData)
        let decryptedInfo = JSON.parse(decryptedData)

        if(decryptedInfo.email == emailId || decryptedInfo.mobileNumber == mobileNumber){
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
                                                status:"Wrong OTP",
                                                doc:doc
                                            })
                                        }
                    
                                    }else{
                                        console.log("maximum attempts exceeded")
                                        res.status(500).json({
                                            status:"maximum attempts exceeded",
                                            doc:doc
                                        })
                                    }
                                }else{
                                    console.log("Already Verified")
                                    res.status(500).json({
                                        status:"Already Verified",
                                        doc:doc
                                    })
                                }
                            }else{
                                console.log("time exceed")
                                res.status(500).json({
                                    status:"time exceed",
                                    doc:doc
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
