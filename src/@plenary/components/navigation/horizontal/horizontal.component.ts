import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { plenaryAnimations } from '@plenary/animations';
import { PlenaryNavigationItem } from '@plenary/components/navigation/navigation.types';
import { PlenaryNavigationService } from '@plenary/components/navigation/navigation.service';
import { PlenaryUtilsService } from '@plenary/services/utils/utils.service';

@Component({
  selector: 'plenary-horizontal-navigation',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
  animations: plenaryAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'plenaryHorizontalNavigation',
})
export class PlenaryHorizontalNavigationComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() name: string = this._plenaryUtilsService.randomId();
  @Input() navigation: PlenaryNavigationItem[];

  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _plenaryNavigationService: PlenaryNavigationService,
    private readonly _plenaryUtilsService: PlenaryUtilsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('navigation' in changes) {
      this._changeDetectorRef.markForCheck();
    }
  }

  ngOnInit(): void {
    if (this.name === '') {
      this.name = this._plenaryUtilsService.randomId();
    }

    this._plenaryNavigationService.registerComponent(this.name, this);
  }

  ngOnDestroy(): void {
    this._plenaryNavigationService.deregisterComponent(this.name);

    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  refresh(): void {
    this._changeDetectorRef.markForCheck();

    this.onRefreshed.next(true);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
