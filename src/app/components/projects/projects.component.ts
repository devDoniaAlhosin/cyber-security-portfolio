import { animate } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import    { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules';
import Swiper from 'swiper';
import { FadeUpDirective } from '../../directives/fade-up.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor ,FadeUpDirective , NgIf],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  constructor(){

  }
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  achievements = [
    {
      title: 'IBM',
      description: 'Cyber Threat Management, IBM Consulting Way Habits - Foundational, Security and Privacy by Design Foundations, Think Like a Hacker, IBM QRadar SIEM Foundation , IBM Cybersecurity Analyst Professional Certificate',
      image: '../../../assets/ibm_logo.png',
      links:'https://www.credly.com/badges/772e8286-33aa-479f-8c7e-0bb7d9b0f5a4/linked_in_profile , https://www.credly.com/badges/d53d0114-385a-4257-9aef-200e01bda180/linked_in_profile , https://www.credly.com/badges/1aad2ddf-dcaf-4007-842e-6d7a226c39d4/linked_in_profile ,https://www.credly.com/badges/6957e842-ff41-45e1-836c-22875254a7a9/linked_in_profile , https://www.credly.com/badges/0af66751-1f33-4f9e-b908-1abd9e107c0d/public_url , https://www.youracclaim.com/badges/29d11f3d-9411-40ea-87b2-5b7f2fcdae6c/public_url'
    },
    {
      title: 'Cisco',
      description: 'CCNA , CyberOps Associate , CCNA: Enterprise Networking, Security, and Automation',
      image: '../../../assets/bhis.png',
      links:'https://drive.google.com/file/d/1gXqckb2iIDx63S3HvPRe6TyVSB6ovVJ6/view , https://www.credly.com/badges/75639c4c-5469-4c87-8dc6-7e3e4ce25eaa/public_url ,https://www.credly.com/badges/6a5ce5eb-6da7-456c-adeb-c81fb9373221/public_url '
    },
    {
      title: 'Active Countermeasures',
      description: 'Cyber Threat Hunting Level-1',
      image: '../../../assets/active_countermeasures_logo.jpeg',
      links:'https://issuer.gutenbergcerts.com/verify.html?url=https://issuer.gutenbergcerts.com/cert_issuer/api/v1.0/certificate/20220303-ACTI-h0q0_47966a2d-f5d7-4ef6-9b58-47b927984d7d.pdf'
    },
    {
      title: 'BHIS',
      description: 'Active Defense and Cyber Deception, SOC Core Skills | John Strand',
      image: '../../../assets/bhis.png',
      links:'#,https://drive.google.com/file/d/1Sva4EbUJ8yKQXj_cYbcxvAWpu6SZgh1y/view?usp=sharing'
    },
       {
      title: 'AttackIQ ',
      description: 'Foundations of Operationalizing MITRE ATT&CK',
      image: '../../../assets/attackiq_logo.jpeg',
      links:'#'
    },


  ];


  ngAfterViewInit(): void {
    new Swiper(this.swiperContainer.nativeElement, {
      modules: [EffectCards],
      effect: 'cards',
      grabCursor: true,

    });


  }
}
