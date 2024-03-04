import { injectLoad } from '@analogjs/router';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AssociationFormComponent } from '@app/components/association-form/association-form.component';
import { ApiService } from '@app/services/api.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { load } from './associations.server';
import { TermAssociationsType } from 'src/types';

@Component({
  selector: 'app-admin-associations',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ButtonModule,
    TableModule,
    TagModule,
    AssociationFormComponent,
  ],
  templateUrl: './associations.page.html',
})
export default class AdminAssociationsPageComponent {
  apiService = inject(ApiService);

  data = toSignal(injectLoad<typeof load>(), { requireSync: true });
  associations = computed(() => this.data().associations);
  terms = computed(() => this.data().terms);

  @ViewChild('associationForm') associationFormComponent!: AssociationFormComponent;

  addAssociation() {
    this.associationFormComponent.show();
  }

  editAssociation(termAssociation: TermAssociationsType) {
    this.associationFormComponent.showEdit(termAssociation);
  }
}
