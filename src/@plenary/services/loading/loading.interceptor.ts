import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { PlenaryLoadingService } from '@plenary/services/loading/loading.service';

@Injectable()
export class PlenaryLoadingInterceptor implements HttpInterceptor {
  handleRequestsAutomatically: boolean;

  constructor(private readonly _plenaryLoadingService: PlenaryLoadingService) {
    this._plenaryLoadingService.auto$.subscribe((value) => {
      this.handleRequestsAutomatically = value;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.handleRequestsAutomatically) {
      return next.handle(req);
    }

    this._plenaryLoadingService._setLoadingStatus(true, req.url);

    return next.handle(req).pipe(
      finalize(() => {
        this._plenaryLoadingService._setLoadingStatus(false, req.url);
      })
    );
  }
}
