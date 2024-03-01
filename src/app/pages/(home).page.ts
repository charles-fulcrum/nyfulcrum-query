import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainLayoutComponent } from '@app/layouts/main-layout/main-layout.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MainLayoutComponent, ButtonModule],
  templateUrl: './(home).page.html',
})
export default class HomePageComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
