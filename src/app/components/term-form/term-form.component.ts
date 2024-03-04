import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TermType } from 'src/types';

@Component({
  selector: 'app-term-form',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule, DialogModule],
  templateUrl: './term-form.component.html',
})
export class TermFormComponent {
  apiService = inject(ApiService);

  termName = '';
  termToEditId!: string | undefined;

  isShowing = false;
  isSaving = false;

  show() {
    this.isShowing = true;
    this.termToEditId = undefined;
  }

  close() {
    this.isShowing = false;
  }

  showEdit(term: TermType) {
    this.show();
    this.termToEditId = term.id;
    this.termName = term.name;
  }

  protected async save() {
    this.isSaving = true;

    if (this.termToEditId) {
      await this.apiService.editTerm(this.termToEditId, { name: this.termName, score: 0 });
    } else {
      await this.apiService.createTerm({ name: this.termName, score: 0 });
    }

    this.isSaving = false;
    this.close();

    if (location) {
      location.reload();
    }
  }
}
