import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RoleInterface } from './roles.types';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<RoleInterface[]> {
    return this.httpClient.get<RoleInterface[]>('@plenary-api/roles');
  }

  findOne(id: number): Observable<RoleInterface> {
    return this.httpClient.get<RoleInterface>(`@plenary-api/roles/${id}`);
  }

  create(
    data: RoleInterface
  ): Observable<{ message: string; role: RoleInterface }> {
    return this.httpClient.post<{ message: string; role: RoleInterface }>(
      '@plenary-api/roles',
      data
    );
  }

  update(
    id: number,
    data: RoleInterface
  ): Observable<{ message: string; role: RoleInterface }> {
    return this.httpClient.put<{ message: string; role: RoleInterface }>(
      `@plenary-api/roles/${id}`,
      data
    );
  }

  delete(id: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `@plenary-api/roles/${id}`
    );
  }
}
