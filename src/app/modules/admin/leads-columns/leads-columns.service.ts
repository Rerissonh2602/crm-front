import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LeadColumnInterface } from './leads-columns.types';

@Injectable({
  providedIn: 'root',
})
export class LeadsColumnsService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<LeadColumnInterface[]> {
    return this.httpClient.get<LeadColumnInterface[]>(
      '@plenary-api/leads-columns'
    );
  }

  findOne(id: number): Observable<LeadColumnInterface> {
    return this.httpClient.get<LeadColumnInterface>(
      `@plenary-api/leads-columns/${id}`
    );
  }

  create(
    data: LeadColumnInterface
  ): Observable<{ message: string; leadColumn: LeadColumnInterface }> {
    return this.httpClient.post<{
      message: string;
      leadColumn: LeadColumnInterface;
    }>('@plenary-api/leads-columns', data);
  }

  update(
    id: number,
    data: LeadColumnInterface
  ): Observable<{ message: string; leadColumn: LeadColumnInterface }> {
    return this.httpClient.put<{
      message: string;
      leadColumn: LeadColumnInterface;
    }>(`@plenary-api/leads-columns/${id}`, data);
  }

  updateLeadColumnPosition(data: LeadColumnInterface[]): Observable<any> {
    return this.httpClient.put(
      '@plenary-api/leads-columns/update-position',
      data
    );
  }

  delete(id: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `@plenary-api/leads-columns/${id}`
    );
  }
}
