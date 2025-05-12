import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RsvpEmailService {
  sendRsvpEmail(formData: any): Promise<EmailJSResponseStatus> {
    const serviceID = environment.emailjs.serviceID;
    const templateID = environment.emailjs.templateID;
    const publicKey = environment.emailjs.publicKey;
    
    return emailjs.send(serviceID, templateID, formData, publicKey);
  }
}
