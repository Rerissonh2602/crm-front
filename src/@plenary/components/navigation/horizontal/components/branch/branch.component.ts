import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { MatMenu } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';
import { PlenaryHorizontalNavigationComponent } from '@plenary/components/navigation/horizontal/horizontal.component';
import { PlenaryNavigationService } from '@plenary/components/navigation/navigation.service';
import { PlenaryNavigationItem } from '@plenary/components/navigation/navigation.types';

@Component({
  selector: 'plenary-horizontal-navigation-branch-item',
  templateUrl: './branch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlenaryHorizontalNavigationBranchItemComponent
  implements OnInit, OnDestroy
{
  static ngAcceptInputType_child: BooleanInput;

  @Input() child = false;
  @Input() item: PlenaryNavigationItem;
  @Input() name: string;
  @ViewChild('matMenu', { static: true }) matMenu: MatMenu;

  private _plenaryHorizontalNavigationComponent: PlenaryHorizontalNavigationComponent;
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _plenaryNavigationService: PlenaryNavigationService
  ) {}

  ngOnInit(): void {
    this._plenaryHorizontalNavigationComponent =
      this._plenaryNavigationService.getComponent(this.name);

    this._plenaryHorizontalNavigationComponent.onRefreshed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  triggerChangeDetection(): void {
    this._changeDetectorRef.markForCheck();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
