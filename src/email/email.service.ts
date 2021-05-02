import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
 
@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;
 
  constructor(
    private readonly configService: ConfigService
  ) {
    this.nodemailerTransport = createTransport({
      service: this.configService.get('mail.validationSchema.EMAIL_SERVICE'),
      auth: {
        user: this.configService.get('mail.validationSchema.EMAIL_USER'),
        pass: this.configService.get('mail.validationSchema.EMAIL_PASSWORD'),
      }
    });
  }
 
  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}