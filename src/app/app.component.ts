import { Component } from '@angular/core';
import { HeaderComponent } from './ui/layout/header/header.component';
import { FooterComponent } from './ui/layout/footer/footer.component';
import { MainComponent } from './ui/layout/main/main.component';
import { RouterOutlet } from '@angular/router';
import { MessagesComponent } from './ui/messages/messages.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MainComponent, 
    HeaderComponent, 
    FooterComponent,
    RouterOutlet,
    MessagesComponent,
    SpinnerComponent
  ]
})
export class AppComponent {
  title = 'template-project';
}
