import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import { plenaryAnimations } from '@plenary/animations';
import {
  PlenaryAlertAppearance,
  PlenaryAlertType,
} from '@plenary/components/alert/alert.types';
import { PlenaryAlertService } from '@plenary/components/alert/alert.service';
import { PlenaryUtilsService } from '@plenary/services/utils/utils.service';

@Component({
  selector: 'plenary-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: plenaryAnimations,
  exportAs: 'plenaryAlert',
})
export class PlenaryAlertComponent implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_dismissible: BooleanInput;
  static ngAcceptInputType_dismissed: BooleanInput;
  static ngAcceptInputType_showIcon: BooleanInput;

  @Input() appearance: PlenaryAlertAppearance = 'soft';
  @Input() dismissed = false;
  @Input() dismissible = false;
  @Input() name: string = this.plenaryUtilsService.randomId();
  @Input() showIcon = true;
  @Input() type: PlenaryAlertType = 'primary';
  @Output() readonly dismissedChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly plenaryAlertService: PlenaryAlertService,
    private readonly plenaryUtilsService: PlenaryUtilsService
  ) {}

  @HostBinding('class') get classList(): any {
    return {
      'plenary-alert-appearance-border': this.appearance === 'border',
      'plenary-alert-appearance-fill': this.appearance === 'fill',
      'plenary-alert-appearance-outline': this.appearance === 'outline',
      'plenary-alert-appearance-soft': this.appearance === 'soft',
      'plenary-alert-dismissed': this.dismissed,
      'plenary-alert-dismissible': this.dismissible,
      'plenary-alert-show-icon': this.showIcon,
      'plenary-alert-type-primary': this.type === 'primary',
      'plenary-alert-type-accent': this.type === 'accent',
      'plenary-alert-type-warn': this.type === 'warn',
      'plenary-alert-type-basic': this.type === 'basic',
      'plenary-alert-type-info': this.type === 'info',
      'plenary-alert-type-success': this.type === 'success',
      'plenary-alert-type-warning': this.type === 'warning',
      'plenary-alert-type-error': this.type === 'error',
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('dismissed' in changes) {
      this.dismissed = coerceBooleanProperty(changes.dismissed.currentValue);

      this.toggleDismiss(this.dismissed);
    }

    if ('dismissible' in changes) {
      this.dismissible = coerceBooleanProperty(
        changes.dismissible.currentValue
      );
    }

    if ('showIcon' in changes) {
      this.showIcon = coerceBooleanProperty(changes.showIcon.currentValue);
    }
  }

  ngOnInit(): void {
    this.plenaryAlertService.onDismiss
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(() => {
        this.dismiss();
      });

    this.plenaryAlertService.onShow
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(() => {
        this.show();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  dismiss(): void {
    if (this.dismissed) {
      return;
    }

    this.toggleDismiss(true);
  }

  show(): void {
    if (!this.dismissed) {
      return;
    }

    this.toggleDismiss(false);
  }

  private toggleDismiss(dismissed: boolean): void {
    if (!this.dismissible) {
      return;
    }

    this.dismissed = dismissed;
    this.dismissedChanged.next(this.dismissed);
    this.changeDetectorRef.markForCheck();
  }
}
