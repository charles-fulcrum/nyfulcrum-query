import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, InputTextModule, ButtonModule],
  templateUrl: './index.page.html',
})
export default class HomePageComponent {}
