import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { filter, Subject, takeUntil } from 'rxjs';
import { plenaryAnimations } from '@plenary/animations';
import { PlenaryVerticalNavigationComponent } from '@plenary/components/navigation/vertical/vertical.component';
import { PlenaryNavigationService } from '@plenary/components/navigation/navigation.service';
import { PlenaryNavigationItem } from '@plenary/components/navigation/navigation.types';

@Component({
  selector: 'plenary-vertical-navigation-collapsable-item',
  templateUrl: './collapsable.component.html',
  animations: plenaryAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlenaryVerticalNavigationCollapsableItemComponent
  implements OnInit, OnDestroy
{
  static ngAcceptInputType_autoCollapse: BooleanInput;

  @Input() autoCollapse: boolean;
  @Input() item: PlenaryNavigationItem;
  @Input() name: string;

  isCollapsed = true;
  isExpanded = false;
  private _plenaryVerticalNavigationComponent: PlenaryVerticalNavigationComponent;
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _router: Router,
    private readonly _plenaryNavigationService: PlenaryNavigationService
  ) {}

  @HostBinding('class') get classList(): any {
    return {
      'plenary-vertical-navigation-item-collapsed': this.isCollapsed,
      'plenary-vertical-navigation-item-expanded': this.isExpanded,
    };
  }

  ngOnInit(): void {
    this._plenaryVerticalNavigationComponent =
      this._plenaryNavigationService.getComponent(this.name);

    if (this._hasActiveChild(this.item, this._router.url)) {
      this.expand();
    } else if (this.autoCollapse) {
      this.collapse();
    }

    this._plenaryVerticalNavigationComponent.onCollapsableItemCollapsed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((collapsedItem) => {
        if (collapsedItem === null) {
          return;
        }

        if (this._isChildrenOf(collapsedItem, this.item)) {
          this.collapse();
        }
      });

    if (this.autoCollapse) {
      this._plenaryVerticalNavigationComponent.onCollapsableItemExpanded
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((expandedItem) => {
          if (expandedItem === null) {
            return;
          }

          if (this._isChildrenOf(this.item, expandedItem)) {
            return;
          }

          if (this._hasActiveChild(this.item, this._router.url)) {
            return;
          }

          if (this.item === expandedItem) {
            return;
          }

          this.collapse();
        });
    }

    this._router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        if (this._hasActiveChild(this.item, event.urlAfterRedirects)) {
          this.expand();
        } else if (this.autoCollapse) {
          this.collapse();
        }
      });

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

  collapse(): void {
    if (this.item.disabled) {
      return;
    }

    if (this.isCollapsed) {
      return;
    }

    this.isCollapsed = true;
    this.isExpanded = !this.isCollapsed;

    this._changeDetectorRef.markForCheck();

    this._plenaryVerticalNavigationComponent.onCollapsableItemCollapsed.next(
      this.item
    );
  }

  expand(): void {
    if (this.item.disabled) {
      return;
    }

    if (!this.isCollapsed) {
      return;
    }

    this.isCollapsed = false;
    this.isExpanded = !this.isCollapsed;

    this._changeDetectorRef.markForCheck();

    this._plenaryVerticalNavigationComponent.onCollapsableItemExpanded.next(
      this.item
    );
  }

  toggleCollapsable(): void {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
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

      if (
        child.link &&
        this._router.isActive(child.link, child.exactMatch || false)
      ) {
        return true;
      }
    }

    return false;
  }

  private _isChildrenOf(
    parent: PlenaryNavigationItem,
    item: PlenaryNavigationItem
  ): boolean {
    const { children } = parent;

    if (!children) {
      return false;
    }

    if (children.includes(item)) {
      return true;
    }

    for (const child of children) {
      if (child.children) {
        if (this._isChildrenOf(child, item)) {
          return true;
        }
      }
    }

    return false;
  }
}
