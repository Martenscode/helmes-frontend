import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserFormFeature } from './features/user-form/user-form.feature';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UserFormFeature],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'helmes-frontend';
}
