import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { AboutComponent } from "../../components/about/about.component";
import { ServicesComponent } from "../../components/services/services.component";
import { WhyChooseMeComponent } from "../../components/why-choose-me/why-choose-me.component";
import { CompaniesComponent } from "../../components/companies/companies.component";
import { ProjectsComponent } from "../../components/projects/projects.component";
import { SkillsComponent } from "../../components/skills/skills.component";
import { ContactComponent } from "../../components/contact/contact.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeroComponent, AboutComponent, ServicesComponent, WhyChooseMeComponent, CompaniesComponent, ProjectsComponent, SkillsComponent, ContactComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
