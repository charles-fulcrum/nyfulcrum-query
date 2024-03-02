import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected async post(url: string, body: { [key: string]: unknown }) {
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

  async createTerm(name: string) {
    const { data } = await this.post('/api/terms', { name });
    return data;
  }
}
