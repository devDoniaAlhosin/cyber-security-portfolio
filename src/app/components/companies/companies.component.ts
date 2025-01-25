import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit, OnDestroy {
  companies = [
    { name: 'IBM', logo: '../../../assets/ibm-logo-corporate-leadership-training-monty-halls-ltd-23-removebg-preview.png',
      customStyle: { height: '100px' }
    },

    { name: 'Cyber Dojo', logo: '../../../assets/cyber_dojo-removebg-preview.png' },
    {name:'Udacity', logo:'../../../assets/udacity_logo-removebg-preview.png'},
    { name: 'IT Academy', logo: '../../../assets/it_academy-removebg-preview.png' },
    { name: 'AMIT', logo: '../../../assets/AMIT-learnig-removebg-preview.png' },
    { name: 'AUC', logo: '../../../assets/auccc-removebg-preview.png' },
    {name: 'We Innovate', logo:'../../../assets/weinnovateme_logo-removebg-preview.png'},
{ name: 'EFG Hermes', logo: '../../../assets/efg_hermes_logo.jpeg' },
{ name: 'DEPI', logo: '../../../assets/digital_egypt_pioneers_initiative_depi_logo (1).jpeg'},

];

  visibleCompanies: any[] = [];
  interval: any;

  ngOnInit(): void {
    this.visibleCompanies = this.companies.slice(0, 6);

    this.interval = setInterval(() => {
      this.shiftLogos();
    }, 3000);
  }

  shiftLogos(): void {
    const first = this.companies.shift();
    if (first) {
      this.companies.push(first);
    }
    this.visibleCompanies = this.companies.slice(0, 6);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval); 
  }
}
