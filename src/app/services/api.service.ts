import { Injectable } from '@angular/core';
import { TermType } from 'src/types';

type RequestBody = { [key: string]: unknown } | unknown[];

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected async post(url: string, body: RequestBody) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return { response, data };
  }

  protected async delete(url: string) {
    const response = await fetch(url, { method: 'DELETE' });
    const data = await response.json();
    return { response, data };
  }

  protected async patch(url: string, body: RequestBody) {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return { response, data };
  }

  protected async put(url: string, body: RequestBody) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return { response, data };
  }

  createTerm(term: Omit<TermType, 'id'>) {
    return this.post('/api/terms', { name: term.name });
  }

  editTerm(termId: TermType['id'], editedTerm: Omit<TermType, 'id'>) {
    return this.patch(`/api/terms/${termId}`, editedTerm);
  }

  deleteTerm(termId: TermType['id']) {
    return this.delete(`/api/terms/${termId}`);
  }

  updateAssociations(termId: TermType['id'], updatedAssociatedTerms: TermType['id'][]) {
    return this.put(`/api/terms/${termId}/associations`, updatedAssociatedTerms);
  }
}
