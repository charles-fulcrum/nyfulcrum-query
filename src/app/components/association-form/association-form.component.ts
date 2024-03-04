import { Component, Input, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TermAssociationsType, TermType } from 'src/types';

@Component({
  selector: 'app-association-form',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    MultiSelectModule,
    ChipsModule,
    DropdownModule,
  ],
  templateUrl: './association-form.component.html',
  styleUrls: ['./association-form.component.scss'],
})
export class AssociationFormComponent {
  apiService = inject(ApiService);

  @Input('termOptions') termOptions: TermType[] = [];

  @ViewChild('termSelect') termSelectComponent!: Dropdown;

  isShowing = false;
  term?: TermType = undefined;
  selectedAssociatedTerms: TermType[] = [];
  filteredAssociatedTermOptions: TermType[] = [];
  termAssociationToEdit!: TermAssociationsType;
  isEditing = false;
  isSaving = false;

  show() {
    this.reset();
    this.isShowing = true;
    this.isEditing = false;
  }

  close() {
    this.isShowing = false;
  }

  showEdit(termAssociation: TermAssociationsType) {
    this.show();
    this.isEditing = true;
    this.term = termAssociation.term;
    this.termAssociationToEdit = termAssociation;
    this.selectedAssociatedTerms = termAssociation.associatedTerms;
    this.filterAssociatedTermOptions();
  }

  filterAssociatedTermOptions() {
    const term = this.term;
    if (!term) {
      this.filteredAssociatedTermOptions = this.termOptions;
      return;
    }

    this.filteredAssociatedTermOptions = this.termOptions.filter(option => option.id !== term.id);
  }

  reset() {
    this.termSelectComponent.clear();
    this.term = undefined;
    this.selectedAssociatedTerms = [];
  }

  protected async save() {
    this.isSaving = true;

    if (!this.term) {
      return;
    }

    const updatedAssociatedTerms = this.selectedAssociatedTerms.map(term => term.id);
    await this.apiService.updateAssociations(this.term?.id, updatedAssociatedTerms);

    this.isSaving = false;
    this.close();

    if (location) {
      location.reload();
    }
  }
}
