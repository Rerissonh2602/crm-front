import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { PlenaryVerticalNavigationComponent } from '@plenary/components/navigation/vertical/vertical.component';
import { PlenaryNavigationService } from '@plenary/components/navigation/navigation.service';
import { PlenaryNavigationItem } from '@plenary/components/navigation/navigation.types';

@Component({
  selector: 'plenary-vertical-navigation-group-item',
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlenaryVerticalNavigationGroupItemComponent
  implements OnInit, OnDestroy
{
  static ngAcceptInputType_autoCollapse: BooleanInput;

  @Input() autoCollapse: boolean;
  @Input() item: PlenaryNavigationItem;
  @Input() name: string;

  private _plenaryVerticalNavigationComponent: PlenaryVerticalNavigationComponent;
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _plenaryNavigationService: PlenaryNavigationService
  ) {}

  ngOnInit(): void {
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
}
