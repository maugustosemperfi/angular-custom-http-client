import { Component } from '@angular/core';
import { FeatureService } from './services/feature/feature.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-custom-http-client';

  constructor(private service: FeatureService) {
    this.service.getSomething();
  }
}
