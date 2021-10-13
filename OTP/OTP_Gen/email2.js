var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'naveen.kethavath@realvariable.com',
    pass: 'mcbvycwlsyzffize'
  }
});

var mailOptions = {
  from: 'naveen.kethavath@realvariable.com',
  to: "kanakaratna18@gmail.com,naveenkethavath100@gmail.com",
  subject: 'Dont open this mail otherwise you will get hacked',
  text: 'Hey dont worry your safe'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});