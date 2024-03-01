import { injectLoad } from '@analogjs/router';
import { DatePipe, JsonPipe, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderComponent } from '@app/components/header/header.component';
import { MainLayoutComponent } from '@app/layouts/main-layout/main-layout.component';
import { UserType } from '@app/types';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { load } from './users.server';

const mockUsers: UserType[] = [
  { id: '1', email: 'john@asdf.com', createdAt: '' },
  { id: '2', email: 'doe@asdf.com', createdAt: '' },
  { id: '3', email: 'foo@asdf.com', createdAt: '' },
  { id: '4', email: 'bar@asdf.com', createdAt: '' },
  { id: '5', email: 'baz@asdf.com', createdAt: '' },
  { id: '6', email: 'xyz@asdf.com', createdAt: '' },
];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MainLayoutComponent,
    HeaderComponent,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    DatePipe,
    JsonPipe,
  ],
  templateUrl: './users.page.html',
})
export default class UsersPageComponent implements OnInit {
  data = toSignal(injectLoad<typeof load>());

  platformId = inject(PLATFORM_ID);

  mounted = false;

  users = new Array(10).fill(0).flatMap(() => mockUsers);

  visibleTableRows = 0;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.mounted = true;
      this.onWindowRezise();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowRezise() {
    const viewHeight = window.innerHeight;

    let rows = 10;
    if (viewHeight > 1400) {
      rows = 20;
    }

    if (viewHeight < 900) {
      rows = 5;
    }

    this.visibleTableRows = rows;
  }
}
