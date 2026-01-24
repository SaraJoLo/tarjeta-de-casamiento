import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RsvpEmailService } from '../../services/rsvp-email.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private fb = inject(FormBuilder);
  private emailService = inject(RsvpEmailService);

  enviado = false;
  error = false;
  enviando = false;

  rsvpForm = this.fb.group({
    nombre: ['', Validators.required],
    confirmacion: [false],
    alimentacion: ['', Validators.required],
    comentariosAlimentacion: [''],
    cancion: [''],
    mail: ['', [Validators.required, Validators.email]],
  });

  sendRsvp() {
    if (this.rsvpForm.invalid) {
      this.rsvpForm.markAllAsTouched();
      return;
    }

    this.enviando = true;

    const data = {
      ...this.rsvpForm.value,
      confirmacion: this.rsvpForm.value.confirmacion ? 'Sí' : 'No',
      to_email: this.rsvpForm.value.mail,
      tiempo: new Date().toLocaleString('es-AR'),
    };

    this.emailService.sendRsvpEmail(data)
      .then(() => {
        this.enviado = true;
        this.enviando = false;
        this.rsvpForm.disable();
      })
      .catch(() => {
        this.error = true;
        this.enviando = false;
      });
  }
}
