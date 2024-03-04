import { injectLoad } from '@analogjs/router';
import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { load } from './data.server';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TableModule, TagModule],
  templateUrl: './data.page.html',
})
export default class DataPageComponent {
  data = toSignal(injectLoad<typeof load>(), { requireSync: true });

  tableData = computed(() => {
    const terms = this.data().terms;
    return terms.filter(term => term.score !== 0).sort(a => (a.categories.length !== 0 ? -1 : 1));
  });
}
