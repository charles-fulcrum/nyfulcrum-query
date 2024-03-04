import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TermType } from 'src/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './index.page.html',
})
export default class HomePageComponent {
  apiService = inject(ApiService);

  @ViewChild('queryInput') queryInputComponent!: ElementRef<HTMLInputElement>;

  queryText = '';

  isQuerying = false;

  hasMatch = false;
  noMatch = false;

  async query() {
    if (!this.queryText) {
      return;
    }

    this.hasMatch = false;
    this.noMatch = false;

    const formattedQuery = this.queryText.replaceAll(/\?|\!|\./g, '');
    this.isQuerying = true;
    const result = await this.apiService.query(formattedQuery);
    this.isQuerying = false;
    const data = result.data as { [word: string]: TermType[] };

    let hasMatches = false;
    for (const word in data) {
      if (data[word].length !== 0) {
        hasMatches = true;
      }
    }

    if (hasMatches) {
      this.hasMatch = true;
    } else {
      this.noMatch = true;
    }

    /* For some reason the page does not update if we do not focus and then blur the input... */
    this.queryInputComponent.nativeElement.focus();
    this.queryInputComponent.nativeElement.blur();
  }
}
