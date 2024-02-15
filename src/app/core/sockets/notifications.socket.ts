import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class NotificationsSocket extends Socket {
  constructor() {
    super({ url: environment + '/notifications', options: {} });
  }
}
