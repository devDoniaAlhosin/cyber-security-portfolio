import { FadeUpDirective } from './../../directives/fade-up.directive';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimelineElement } from './horizontal-timeline/timeline-element';
import { HorizontalTimelineComponent } from "./horizontal-timeline/horizontal-timeline.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FadeUpDirective ,FontAwesomeModule, NgFor, NgIf, NgClass, HorizontalTimelineComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {



  name = 'Angular 6';
  content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae
  ipsa, quia velit nulla adipiscs.`;

  timeline: TimelineElement[] = [];

  ngOnInit(): void {

    this.loadTimeline();
  }

  loadTimeline() {
    this.timeline = [];
    setTimeout(() => { // Simulate delay
      this.timeline = [
        { caption: '1 Jul', date: new Date(2014, 1, 16), title: 'Horizontal Timeline', content: this.content },
        { caption: '28 Feb', date: new Date(2014, 2, 28), title: 'Status#1', content: this.content },
        { caption: '20 Mar', date: new Date(2014, 3, 20), selected: true, title: 'Status#2', content: this.content },
        { caption: '20 May', date: new Date(2014, 5, 20), title: 'Status#3', content: this.content },
        { caption: '09 Jul', date: new Date(2014, 7, 9), title: 'Status#4', content: this.content },
        { caption: '30 Aug', date: new Date(2014, 8, 30), title: 'Status#5', content: this.content },
        { caption: '15 Sep', date: new Date(2014, 9, 15), title: 'Status#6', content: this.content },
        { caption: '01 Nov', date: new Date(2014, 11, 1), title: 'Status#7', content: this.content },
        { caption: '10 Dec', date: new Date(2014, 12, 10), title: 'Status#8', content: this.content },
        { caption: '29 Jan', date: new Date(2015, 1, 19), title: 'Status#9', content: this.content },
        { caption: '3 Mar', date: new Date(2015, 3, 3), title: 'Status#9', content: this.content },
      ];
    }, 2000);
  }
}
