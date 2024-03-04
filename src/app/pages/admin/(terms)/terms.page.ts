import { injectLoad } from '@analogjs/router';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TermFormComponent } from '@app/components/term-form/term-form.component';
import { ApiService } from '@app/services/api.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TermType } from 'src/types';
import { load } from './terms.server';

@Component({
  selector: 'app-admin-terms',
  standalone: true,
  imports: [RouterLink, CommonModule, TableModule, ButtonModule, DialogModule, TermFormComponent],
  templateUrl: './terms.page.html',
})
export default class AdminTermsPageComponent {
  apiService = inject(ApiService);

  @ViewChild('termForm') termFormComponent!: TermFormComponent;

  terms = toSignal(injectLoad<typeof load>(), { requireSync: true });

  termToDelete!: TermType | undefined;
  isShowingDeleteConfirm = false;
  isDeletingTerm = false;

  addTerm() {
    this.termFormComponent.show();
  }

  editTerm(term: TermType) {
    this.termFormComponent.showEdit(term);
  }

  deleteTerm(term: TermType) {
    this.termToDelete = term;
    this.isShowingDeleteConfirm = true;
  }

  async confirmDeleteTerm() {
    if (!this.termToDelete) {
      return;
    }

    this.isDeletingTerm = true;
    await this.apiService.deleteTerm(this.termToDelete.id);
    this.isDeletingTerm = false;

    this.termToDelete = undefined;

    if (location) {
      location.reload();
    }
  }
}
