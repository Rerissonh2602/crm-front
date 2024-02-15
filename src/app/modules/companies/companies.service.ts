import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CompanyInterface } from './companies.types';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<CompanyInterface[]> {
    return this.httpClient.get<CompanyInterface[]>('@plenary-api/companies');
  }

  findOne(id: number): Observable<CompanyInterface> {
    return this.httpClient.get<CompanyInterface>(`@plenary-api/companies/${id}`);
  }

  create(
    data: CompanyInterface
  ): Observable<{ message: string; company: CompanyInterface }> {
    return this.httpClient.post<{ message: string; company: CompanyInterface }>(
      '@plenary-api/companies',
      data
    );
  }

  update(id: number, data: CompanyInterface): Observable<any> {
    return this.httpClient.put(`@plenary-api/companies/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`@plenary-api/companies/${id}`);
  }
}
