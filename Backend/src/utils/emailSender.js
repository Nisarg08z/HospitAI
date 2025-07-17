import nodemailer from 'nodemailer';
import fs from 'fs';

export const sendPatientPDFEmail = async (email, filePath) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,    
      pass: process.env.EMAIL_PASS,    
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Hospital Registration Form',
    text: 'Please find your patient registration form attached as PDF.',
    attachments: [
      {
        filename: 'patient-info.pdf',
        content: fs.createReadStream(filePath),
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};
