import { Injectable } from '@angular/core';
import { CategoryType, TermType } from 'src/types';

type RequestBody = { [key: string]: unknown } | unknown[];

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private async request(url: string, method: string, body?: RequestBody) {
    const requestOptions: RequestInit = { method };
    if (body) {
      requestOptions.headers = {
        'Content-Type': 'application/json',
      };
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return { response, data };
  }

  protected async get(url: string) {
    return this.request(url, 'GET');
  }

  protected async post(url: string, body: RequestBody) {
    return this.request(url, 'POST', body);
  }

  protected async delete(url: string) {
    return this.request(url, 'DELETE');
  }

  protected async patch(url: string, body: RequestBody) {
    return this.request(url, 'PATCH', body);
  }

  protected async put(url: string, body: RequestBody) {
    return this.request(url, 'PUT', body);
  }

  query(query: string) {
    const queryParams = new URLSearchParams();
    queryParams.set('query', query);
    return this.get(`/api/query?${queryParams.toString()}`);
  }

  createTerm(term: Omit<TermType, 'id'>) {
    return this.post('/api/terms', term);
  }

  editTerm(
    termId: TermType['id'],
    editedTerm: Omit<TermType, 'id'> & { categories?: CategoryType['id'][] }
  ) {
    return this.patch(`/api/terms/${termId}`, editedTerm);
  }

  deleteTerm(termId: TermType['id']) {
    return this.delete(`/api/terms/${termId}`);
  }

  updateAssociations(termId: TermType['id'], updatedAssociatedTerms: TermType['id'][]) {
    return this.put(`/api/terms/${termId}/associations`, updatedAssociatedTerms);
  }
}
