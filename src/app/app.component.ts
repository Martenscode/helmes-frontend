import { Component } from '@angular/core';
import { UserFormFeature } from './features/user-form/user-form.feature';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserFormFeature],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'helmes-frontend';
}
