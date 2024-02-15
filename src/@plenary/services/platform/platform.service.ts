import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root',
})
export class PlenaryPlatformService {
  osName = 'os-unknown';

  constructor(private readonly _platform: Platform) {
    if (!this._platform.isBrowser) {
      return;
    }

    if (navigator.userAgent.includes('Win')) {
      this.osName = 'os-windows';
    }

    if (navigator.userAgent.includes('Mac')) {
      this.osName = 'os-mac';
    }

    if (navigator.userAgent.includes('X11')) {
      this.osName = 'os-unix';
    }

    if (navigator.userAgent.includes('Linux')) {
      this.osName = 'os-linux';
    }

    if (this._platform.IOS) {
      this.osName = 'os-ios';
    }

    if (this._platform.ANDROID) {
      this.osName = 'os-android';
    }
  }
}
