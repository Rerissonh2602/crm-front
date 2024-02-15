import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PlenaryHorizontalNavigationComponent } from '@plenary/components/navigation/horizontal/horizontal.component';
import { PlenaryNavigationService } from '@plenary/components/navigation/navigation.service';
import { PlenaryNavigationItem } from '@plenary/components/navigation/navigation.types';

@Component({
  selector: 'plenary-horizontal-navigation-spacer-item',
  templateUrl: './spacer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlenaryHorizontalNavigationSpacerItemComponent
  implements OnInit, OnDestroy
{
  @Input() item: PlenaryNavigationItem;
  @Input() name: string;

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
}
