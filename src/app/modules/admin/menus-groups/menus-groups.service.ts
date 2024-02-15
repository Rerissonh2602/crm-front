import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuGroupInterface } from './menus-groups.types';

@Injectable({
  providedIn: 'root',
})
export class MenusGroupsService {
  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<MenuGroupInterface[]> {
    return this.httpClient.get<MenuGroupInterface[]>(
      '@plenary-api/menus-groups'
    );
  }

  findOne(id: number): Observable<MenuGroupInterface> {
    return this.httpClient.get<MenuGroupInterface>(
      `@plenary-api/menus-groups/${id}`
    );
  }

  create(
    data: MenuGroupInterface
  ): Observable<{ message: string; menuGroup: MenuGroupInterface }> {
    return this.httpClient.post<{
      message: string;
      menuGroup: MenuGroupInterface;
    }>('@plenary-api/menus-groups', data);
  }

  update(
    id: number,
    data: MenuGroupInterface
  ): Observable<{ message: string; menuGroup: MenuGroupInterface }> {
    return this.httpClient.put<{
      message: string;
      menuGroup: MenuGroupInterface;
    }>(`@plenary-api/menus-groups/${id}`, data);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(
      `@plenary-api/menus-groups/${id}`
    );
  }
}
