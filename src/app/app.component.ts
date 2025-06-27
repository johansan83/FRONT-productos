import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  // selector: 'app-root',
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONT-productos';
}
