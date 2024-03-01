import { injectLoad } from '@analogjs/router';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MainLayoutComponent } from '@app/layouts/main-layout/main-layout.component';
import { ButtonModule } from 'primeng/button';
import { load } from './about.server';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, ButtonModule, MainLayoutComponent],
  templateUrl: './about.page.html',
})
export default class AboutPageComponent {
  data = toSignal(injectLoad<typeof load>(), { requireSync: true });
}
