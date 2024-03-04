import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CategoryType, TermWithCategories } from 'src/types';

@Component({
  selector: 'app-term-form',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    MultiSelectModule,
    ChipsModule,
  ],
  templateUrl: './term-form.component.html',
  styleUrls: ['./term-form.component.scss'],
})
export class TermFormComponent {
  apiService = inject(ApiService);

  @Input('categoryOptions') categoryOptions: CategoryType[] = [];

  name = '';
  score = 0;
  selectedCategories: CategoryType[] = [];

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

  showEdit(term: TermWithCategories) {
    this.show();
    this.termToEditId = term.id;
    this.name = term.name;
    this.score = term.score;
    this.selectedCategories = term.categories;
  }

  protected async save() {
    this.isSaving = true;

    const categoryIds = this.selectedCategories.map(category => category.id);
    const termData = { name: this.name, score: this.score, categories: categoryIds };
    if (this.termToEditId) {
      await this.apiService.editTerm(this.termToEditId, termData);
    } else {
      await this.apiService.createTerm(termData);
    }

    this.isSaving = false;
    this.close();

    if (location) {
      location.reload();
    }
  }
}
