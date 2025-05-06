import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RsvpEmailService } from '../../services/rsvp-email.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private emailService = inject(RsvpEmailService);

  rsvpForm!: FormGroup;

  ngOnInit(): void {
    this.rsvpForm = this.fb.group({
      nombre: ['', Validators.required],
      nombrePareja: [''],
      confirmacion: [false],
      alimentacion: ['', Validators.required],
      comentariosAlimentacion: [''],
      cancion: [''],
      mail: ['', [Validators.required, Validators.email]],
    });
  }

  sendRsvp(event: Event): void {
    event.preventDefault();

    if (this.rsvpForm.invalid) {
      alert('Por favor, completa los campos requeridos correctamente.');
      return;
    }

    const formData = {
      ...this.rsvpForm.value,
      confirmacion: this.rsvpForm.value.confirmacion ? 'Sí' : 'No',
      to_email: this.rsvpForm.value.mail,
      tiempo: new Date().toLocaleString('es-AR', {
        dateStyle: 'short',
        timeStyle: 'short'
      }),
    };

    this.emailService.sendRsvpEmail(formData).then(() => {
      alert('¡Gracias por confirmar! Te esperamos 💕');
      this.rsvpForm.reset();
      this.router.navigate([], { fragment: 'presents' });
    }).catch((error) => {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un problema al enviar el formulario. Intentá más tarde.');
    });
  }
}
