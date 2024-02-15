import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuInterface } from './menus.types';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<MenuInterface[]> {
    return this.httpClient.get<MenuInterface[]>('@plenary-api/menus');
  }

  findOne(id: number): Observable<MenuInterface> {
    return this.httpClient.get<MenuInterface>(`@plenary-api/menus/${id}`);
  }

  create(
    data: MenuInterface
  ): Observable<{ message: string; menu: MenuInterface }> {
    return this.httpClient.post<{ message: string; menu: MenuInterface }>(
      '@plenary-api/menus',
      data
    );
  }

  update(
    id: number,
    data: MenuInterface
  ): Observable<{ message: string; menu: MenuInterface }> {
    return this.httpClient.put<{ message: string; menu: MenuInterface }>(
      `@plenary-api/menus/${id}`,
      data
    );
  }

  delete(id: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `@plenary-api/menus/${id}`
    );
  }
}
