import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { PlenaryLoadingService } from '@plenary/services/loading';

@Component({
  selector: 'plenary-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'plenaryLoadingBar',
})
export class PlenaryLoadingBarComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() autoMode = true;
  mode: 'determinate' | 'indeterminate';
  progress = 0;
  show = false;
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private readonly _plenaryLoadingService: PlenaryLoadingService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('autoMode' in changes) {
      this._plenaryLoadingService.setAutoMode(
        coerceBooleanProperty(changes.autoMode.currentValue)
      );
    }
  }

  ngOnInit(): void {
    this._plenaryLoadingService.mode$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.mode = value;
      });

    this._plenaryLoadingService.progress$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.progress = value;
      });

    this._plenaryLoadingService.show$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.show = value;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
