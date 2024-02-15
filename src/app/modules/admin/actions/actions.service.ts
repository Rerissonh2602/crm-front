import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActionInterface } from './actions.types';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<ActionInterface[]> {
    return this.httpClient.get<ActionInterface[]>('@plenary-api/actions');
  }

  findOne(id: number): Observable<ActionInterface> {
    return this.httpClient.get<ActionInterface>(`@plenary-api/actions/${id}`);
  }

  create(
    data: ActionInterface
  ): Observable<{ message: string; action: ActionInterface }> {
    return this.httpClient.post<{ message: string; action: ActionInterface }>(
      '@plenary-api/actions',
      data
    );
  }

  update(
    id: number,
    data: ActionInterface
  ): Observable<{ message: string; action: ActionInterface }> {
    return this.httpClient.put<{ message: string; action: ActionInterface }>(
      `@plenary-api/actions/${id}`,
      data
    );
  }

  delete(id: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `@plenary-api/actions/${id}`
    );
  }
}
