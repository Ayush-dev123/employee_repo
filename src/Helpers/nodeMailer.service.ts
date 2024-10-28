
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'techsolutions0017@gmail.com',
        pass: 'gtjx dara scwn ghsk',
      },
    });
  }

  async sendMail(mailOptions: any): Promise<any> {
    let info = await this.transporter.sendMail(mailOptions)
    if (info.error) {
      return {
        code:400,
        message:"error in sending mail...."
      }
    } else {
      return {
        code:200,
        message:"mail sent successfully"
      }
    }
  }

}




// mail.service.ts
// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class MailService {
//   private transporter;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com', // Replace with your SMTP host
//       port: 587,                 // Replace with your SMTP port
//       secure: false,             // true for 465, false for other ports
//       auth: {
//         user: 'techsolutions0017@gmail.com', // Replace with your email
//         pass: 'gtjx dara scwn ghsk',          // Replace with your email password
//       },
//     });
//   }

//   async sendMail(to: string, subject: string, text: string, html?: string) {
//     const mailOptions = {
//       from: 'your_email@example.com', // sender address
//       to,                             // list of receivers
//       subject,                        // Subject line
//       text,                           // plain text body
//       html,                           // HTML body (optional)
//     };

//     return this.transporter.sendMail(mailOptions);
//   }
// }

