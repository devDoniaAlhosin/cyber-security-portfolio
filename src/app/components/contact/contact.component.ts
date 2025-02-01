import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';  // Import EmailJS
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = { name: '', email: '', message: '', phone: '' };

  constructor() {}


  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const emailData = {
      to_name: 'Omar Tark',
      from_name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      message: this.formData.message,
    };

    emailjs.send('service_68pbsmq', 'template_nxeu08v', emailData, '5YtD15bhmpi5FMpWo')
      .then((response) => {
        alert('Your message has been sent successfully!');
        this.formData = { name: '', email: '', message: '', phone: '' };  // Reset form after submission
      })
      .catch((error) => {
        alert('There was an error sending your message. Please try again later.');
      });
  }
}
