import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PlenaryVerticalNavigationComponent } from '@plenary/components/navigation/vertical/vertical.component';
import { PlenaryNavigationService } from '@plenary/components/navigation/navigation.service';
import { PlenaryNavigationItem } from '@plenary/components/navigation/navigation.types';
import { PlenaryUtilsService } from '@plenary/services/utils/utils.service';

@Component({
  selector: 'plenary-vertical-navigation-basic-item',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlenaryVerticalNavigationBasicItemComponent
  implements OnInit, OnDestroy
{
  @Input() item: PlenaryNavigationItem;
  @Input() name: string;

  isActiveMatchOptions: IsActiveMatchOptions;
  private _plenaryVerticalNavigationComponent: PlenaryVerticalNavigationComponent;
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _plenaryNavigationService: PlenaryNavigationService,
    private readonly _plenaryUtilsService: PlenaryUtilsService
  ) {
    this.isActiveMatchOptions = this._plenaryUtilsService.subsetMatchOptions;
  }

  ngOnInit(): void {
    this.isActiveMatchOptions =
      this.item.isActiveMatchOptions ?? this.item.exactMatch
        ? this._plenaryUtilsService.exactMatchOptions
        : this._plenaryUtilsService.subsetMatchOptions;

    this._plenaryVerticalNavigationComponent =
      this._plenaryNavigationService.getComponent(this.name);

    this._changeDetectorRef.markForCheck();

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
}
