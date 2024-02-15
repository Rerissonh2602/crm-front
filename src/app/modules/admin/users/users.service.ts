import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserInterface } from './users.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>('@plenary-api/users');
  }

  findOne(id: number): Observable<UserInterface> {
    return this.httpClient.get<UserInterface>(`@plenary-api/users/${id}`);
  }

  create(
    data: UserInterface
  ): Observable<{ message: string; user: UserInterface }> {
    return this.httpClient.post<{ message: string; user: UserInterface }>(
      '@plenary-api/users',
      data
    );
  }

  update(
    id: number,
    data: UserInterface
  ): Observable<{ message: string; user: UserInterface }> {
    return this.httpClient.put<{ message: string; user: UserInterface }>(
      `@plenary-api/users/${id}`,
      data
    );
  }

  delete(id: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `@plenary-api/users/${id}`
    );
  }
}
