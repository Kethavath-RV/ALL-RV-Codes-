import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OtpService } from '../otp.service';

@Component({
  selector: 'app-otp-val',
  templateUrl: './otp-val.component.html',
  styleUrls: ['./otp-val.component.css']
})
export class OtpValComponent implements OnInit {

  otpValidateRef = new FormGroup({
    otp:new FormControl()
  })
  constructor(public otpService:OtpService, public router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams)
  }

  otpValidate(){
    let otpDetails = this.otpValidateRef.value

    //getting emailID and Encrypted data from query param using route
    otpDetails.emailId = this.route.snapshot.queryParams.emailId
    otpDetails.encryptedData = this.route.snapshot.queryParams.encryptedData

    //otp validate service
    this.otpService.validateOtp(otpDetails.otp, otpDetails.emailId, otpDetails.encryptedData).subscribe(result=>{
      console.log(result)
      //if no error then page redirects to homepage
      this.router.navigate(["homepage"],{queryParams:{emailId:otpDetails.emailId}})
    }, err=>{
      console.log(err.error.status)
    })
  }
}
