import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { PlenaryToastConfigInterface } from '@plenary/components/toast/toast.types';

@Injectable({
  providedIn: 'root',
})
export class PlenaryToastService {
  private readonly _message$: BehaviorSubject<
    | {
        title: string;
        description?: string[];
      }
    | undefined
  > = new BehaviorSubject<
    | {
        title: string;
        description?: string[];
      }
    | undefined
  >(null);

  private readonly _show$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private readonly _icon$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private readonly _color$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  constructor() {}

  get show$(): Observable<boolean> {
    return this._show$.asObservable();
  }

  get message$(): Observable<{ title: string; description?: string[] }> {
    return this._message$.asObservable();
  }

  get icon$(): Observable<string> {
    return this._icon$.asObservable();
  }

  get color$(): Observable<string> {
    return this._color$.asObservable();
  }

  hide(): void {
    this._show$.next(false);
  }

  handleMessage(
    content: any,
    title?: string,
    config?: PlenaryToastConfigInterface
  ): void {
    this._show$.next(true);

    if (config?.handleRequest && content instanceof HttpErrorResponse) {
      this._icon$.next('mat_outline:cancel');
      this._color$.next('danger');
      if (Array.isArray(content.error.message)) {
        this._message$.next({ title, description: content.error.message });
      } else if (content.error.message !== undefined) {
        this._message$.next({ title: content.error.message });
      } else {
        this._message$.next({
          title: 'Algum erro interno ocorreu, por favor tente mais tarde!',
        });
      }
    } else if (config?.handleRequest && content?.message) {
      this._color$.next('primary');
      this._icon$.next('mat_outline:check_circle');
      this._message$.next({ title: content.message });
    } else {
      this._message$.next({ title: content });
    }
  }
}
