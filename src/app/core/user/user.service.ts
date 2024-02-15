import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import {
  NotificationInAppMetadataInterface,
  UserJWTInterface,
} from '../auth/auth.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _user: ReplaySubject<UserJWTInterface> =
    new ReplaySubject<UserJWTInterface>(1);

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  set user(value: UserJWTInterface) {
    this._user.next(value);
  }

  get user$(): Observable<UserJWTInterface> {
    return this._user.asObservable();
  }

  get(): Observable<UserJWTInterface> {
    return this.httpClient
      .get<UserJWTInterface>('@plenary-api/authentication/profile')
      .pipe(
        tap((response) => {
          this._user.next(response);
        })
      );
  }

  editProfile(data: {
    id: number;
    name: string;
    email: string;
  }): Observable<any> {
    return this.httpClient.post<UserJWTInterface>(
      '@plenary-api/authentication/edit-profile',
      data
    );
  }

  editPassword(data: {
    password: string;
    newPassword: string;
    confirmPassword: string;
  }): Observable<any> {
    return this.httpClient.post<UserJWTInterface>(
      '@plenary-api/authentication/edit-password',
      data
    );
  }

  getUserNotifications(): Observable<NotificationInAppMetadataInterface[]> {
    return this.httpClient.get<NotificationInAppMetadataInterface[]>(
      '@plenary-api/notifications'
    );
  }

  markAllNotificationRead(): Observable<any> {
    return this.httpClient.patch('@plenary-api/notifications', null);
  }

  markNotificationRead(id: number): Observable<any> {
    return this.httpClient.patch(`@plenary-api/notifications/${id}`, null);
  }
}
