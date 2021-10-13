import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  rootUrl = "http://localhost:9090/otp"
  url = "http://localhost:5630"
  constructor(public http:HttpClient) { }

  send(payload:any){
    return this.http.post(this.url+"/send",{payload})
  }
  generateOtp(emailId:any){
    return this.http.post(this.rootUrl+"/emailOtpTransaction",{emailId})
  }
  validateOtp(otp:string,emailId:string,encryptedData:string){
    return this.http.post(this.rootUrl+"/emailOtpValidation",{otp,emailId,encryptedData})
  }
}
