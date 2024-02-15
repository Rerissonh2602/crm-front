import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { filter, Subject, takeUntil } from 'rxjs';
import { PlenaryVerticalNavigationComponent } from '@plenary/components/navigation/vertical/vertical.component';
import { PlenaryNavigationService } from '@plenary/components/navigation/navigation.service';
import { PlenaryNavigationItem } from '@plenary/components/navigation/navigation.types';

@Component({
  selector: 'plenary-vertical-navigation-aside-item',
  templateUrl: './aside.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlenaryVerticalNavigationAsideItemComponent
  implements OnChanges, OnInit, OnDestroy
{
  static ngAcceptInputType_autoCollapse: BooleanInput;
  static ngAcceptInputType_skipChildren: BooleanInput;

  @Input() activeItemId: string;
  @Input() autoCollapse: boolean;
  @Input() item: PlenaryNavigationItem;
  @Input() name: string;
  @Input() skipChildren: boolean;

  active = false;
  private _plenaryVerticalNavigationComponent: PlenaryVerticalNavigationComponent;
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _router: Router,
    private readonly _plenaryNavigationService: PlenaryNavigationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('activeItemId' in changes) {
      this._markIfActive(this._router.url);
    }
  }

  ngOnInit(): void {
    this._markIfActive(this._router.url);

    this._router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        this._markIfActive(event.urlAfterRedirects);
      });

    this._plenaryVerticalNavigationComponent =
      this._plenaryNavigationService.getComponent(this.name);

    this._plenaryVerticalNavigationComponent.onRefreshed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _hasActiveChild(
    item: PlenaryNavigationItem,
    currentUrl: string
  ): boolean {
    const { children } = item;

    if (!children) {
      return false;
    }

    for (const child of children) {
      if (child.children) {
        if (this._hasActiveChild(child, currentUrl)) {
          return true;
        }
      }

      if (child.type !== 'basic') {
        continue;
      }

      if (
        child.link &&
        this._router.isActive(child.link, child.exactMatch || false)
      ) {
        return true;
      }
    }

    return false;
  }

  private _markIfActive(currentUrl: string): void {
    this.active = this.activeItemId === this.item.id;

    if (this._hasActiveChild(this.item, currentUrl)) {
      this.active = true;
    }

    this._changeDetectorRef.markForCheck();
  }
}
