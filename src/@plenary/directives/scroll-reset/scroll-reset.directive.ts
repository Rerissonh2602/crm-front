import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[plenaryScrollReset]',
  exportAs: 'plenaryScrollReset',
})
export class PlenaryScrollResetDirective implements OnInit, OnDestroy {
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this._elementRef.nativeElement.scrollTop = 0;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
