import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserShield , faChartLine, faGraduationCap, } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-why-choose-me',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './why-choose-me.component.html',
  styleUrl: './why-choose-me.component.css'
})
export class WhyChooseMeComponent {
  faUserShield= faUserShield;
  faGraduationCap=faGraduationCap;
  faChartLine=faChartLine;
}
