import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpService } from '../otp.service';

@Component({
  selector: 'app-otp-gen',
  templateUrl: './otp-gen.component.html',
  styleUrls: ['./otp-gen.component.css']
})
export class OtpGenComponent implements OnInit {
  otpGenerateRef = new FormGroup({
    emailId:new FormControl()
  })

  constructor(public otpService:OtpService, public router:Router) { }

  ngOnInit(): void {
  }

  sendMessg(){
    let payload = {
      message:"hii",
      sender:"navv",
      receiver:"srinu"
    }
    this.otpService.send(payload).subscribe((result:any)=>{
      console.log("result", result)
    },(err:any)=>{
      console.log("error",err)
    })
  }

  otpGenerate(){
    let emailId = this.otpGenerateRef.value
    console.log(emailId)
    this.otpService.generateOtp(emailId.emailId).subscribe((result: any)=>{
      this.router.navigate(["otpValidate"], {queryParams: result})
    },err=>{
      console.log(err)
    })
  }

}
