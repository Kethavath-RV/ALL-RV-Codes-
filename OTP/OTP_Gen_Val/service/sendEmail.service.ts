import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import * as config from '../config/config'

export async function sendEmail(email: string, otp:String,expiryTime:Date) {
  
  //Template File Path
  const filePath = path.join(__dirname, '../../Templates/emailTemplates.html');
 
  //Reads that template file then convert to string
  const source = fs.readFileSync(filePath, 'utf-8').toString();

  //Using handlebars we replace the content in template
  const template = handlebars.compile(source);   
  let time = new Date()

  //content that needs to replace
  const replacements = {
    username: "Real M Pro",
    otp:otp,
    creditLimit:config.creditLimit,
    timeValidityInMinutes:config.timeValidityInMinutes,
    time:time.toLocaleString(),
    expiryTime:expiryTime.toLocaleString(),
    sender:{
        name:"RealVariable",
        mobileNumber:"9999000011", 
        address:"hyderabad"
    }
  };


  //here it replaces the content 
  const htmlToSend = template(replacements);
  
  //creating transaport using nodemailer
  let transporter = nodemailer.createTransport({
    service: 'gmail',                         
    auth: {                                     //Authentication
      user: 'naveen.kethavath@realvariable.com',  
      pass: 'mcbvycwlsyzffize'
    }
  });

  //creating mailoptions that means sending emailer Id From to To email Id and subject that needs to send and the template that we created
  const mailOptions = {
    from: 'naveen.kethavath@realvariable.com',
    to: email,
    subject:config.subject,
    html: htmlToSend
  };

  //Sending email 
  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}