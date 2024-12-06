import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faEnvelope , faFileDownload  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  faFileDownload=faFileDownload;
  faEnvelope=faEnvelope;


  onContactClick(): void {
    alert('Navigating to the contact page...');
    // Add routing logic here if necessary
  }

  onDownloadCV(): void {
    const cvUrl = 'assets/CV_Omar_Tarek.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Omar_Tarek_CV.pdf';
    link.click();
  }
}
