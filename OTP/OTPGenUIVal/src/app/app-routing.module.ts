import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { OtpGenComponent } from './otp-gen/otp-gen.component';
import { OtpValComponent } from './otp-val/otp-val.component';

const routes: Routes = [
  {path:"otpGenerate",component:OtpGenComponent},
  {path:"otpValidate",component:OtpValComponent},
  {path:"homepage",component:HomepageComponent},
  {path:"",redirectTo:"otpGenerate",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




