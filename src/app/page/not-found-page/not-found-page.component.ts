import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent {
  faHome=faHome

}
