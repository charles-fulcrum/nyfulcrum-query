import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-term-form',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule, DialogModule],
  templateUrl: './add-term-form.component.html',
})
export class AddTermFormComponent {
  apiService = inject(ApiService);

  termName = '';
  isShowing = false;
  isSaving = false;

  show() {
    this.isShowing = true;
  }

  close() {
    this.isShowing = false;
  }

  protected async save() {
    this.isSaving = true;
    await this.apiService.createTerm(this.termName);
    this.isSaving = false;
    this.close();

    if (location) {
      location.reload();
    }
  }
}
