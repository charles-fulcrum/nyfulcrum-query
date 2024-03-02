import { injectLoad } from '@analogjs/router';
import { Component, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AddTermFormComponent } from '@app/components/add-term-form/add-term-form.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { load } from './admin.server';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterLink,
    TableModule,
    ButtonModule,
    DialogModule,
    AddTermFormComponent,
  ],
  templateUrl: './admin.page.html',
})
export default class AdminPageComponent {
  @ViewChild('addTermForm') addTermFormComponent!: AddTermFormComponent;

  terms = toSignal(injectLoad<typeof load>(), { requireSync: true });

  add() {
    this.addTermFormComponent.show();
  }
}
