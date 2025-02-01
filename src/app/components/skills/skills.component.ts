import { FadeUpDirective } from './../../directives/fade-up.directive';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrophy, faAward, faLightbulb } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, FontAwesomeModule , FadeUpDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  faTrophy = faTrophy;
  faAward = faAward;
  faLightbulb = faLightbulb;

  achievements = [
    {
      icon: this.faTrophy,
      title: 'Top Performer',
      description: 'Awarded for outstanding performance  in 2023.'
    },
    {
      icon: this.faAward,
      title: 'Certification',
      description: 'Completed Advanced Full-Stack Development Certification.'
    },
    {
      icon: this.faLightbulb,
      title: 'Innovator Award',
      description: 'Recognized for implementing creative solutions to challenges.'
    },
    {
      icon: this.faLightbulb,
      title: 'Innovator Award',
      description: 'Recognized for implementing creative solutions to challenges.'
    }

  ];
}
