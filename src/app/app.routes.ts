import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { WhyChooseMeComponent } from './components/why-choose-me/why-choose-me.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: '**', component:NotFoundPageComponent }
];
