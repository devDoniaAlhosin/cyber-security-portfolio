import { FadeUpDirective } from './../../directives/fade-up.directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FadeUpDirective ,FormsModule , HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = { name: '', email: '', message: '', phone : ''};

  constructor(private http: HttpClient , private formBuilder: FormBuilder) { }

  onSubmit(form: any) {
    if (form.valid) {
      const emailData = {
        to: 'doniaelhussien@gmail.com',
        subject: 'New Contact Form Submission',
        body: `Name: ${this.formData.name}\nEmail: ${this.formData.email}\nMessage: ${this.formData.message}`
      };

      this.http.post('https://your-email-api-endpoint.com/send', emailData)
        .subscribe(
          response => {
            alert('Your message has been sent successfully!');
            this.formData = { name: '', email: '', message: '' , phone : ''};
          },
          error => {
            alert('There was an error sending your message.');
          }
        );
    }
  }

}
