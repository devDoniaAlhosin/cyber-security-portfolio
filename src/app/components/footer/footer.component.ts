import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLinkedinIn  , faFacebook , faInstagram , faTwitter , faBehance} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  faLinkedinIn = faLinkedinIn;
  faFacebook =faFacebook;
  faInstagram =faInstagram;
  faTwitter=faTwitter;
  faBehance= faBehance;


}
