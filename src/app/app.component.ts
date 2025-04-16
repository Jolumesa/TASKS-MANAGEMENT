import { Component } from '@angular/core';

import { FirstComponent } from "./first/first.component";


@Component({
  selector: 'app-root',
  imports: [FirstComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lets-play';
}
