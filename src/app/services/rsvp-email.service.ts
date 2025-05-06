import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})

export class RsvpEmailService {
  private serviceID = 'service_yl271ph';
  private templateID = 'template_rsvp_boda';
  private publicKey = 'Wovzm0AAoLwjrpfBO';

  sendRsvpEmail(formData: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, formData, this.publicKey);
  }
}
