import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { merge } from 'lodash-es';
import {
  ScrollbarGeometry,
  ScrollbarPosition,
} from '@plenary/directives/scrollbar/scrollbar.types';

@Directive({
  selector: '[plenaryScrollbar]',
  exportAs: 'plenaryScrollbar',
})
export class PlenaryScrollbarDirective implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_plenaryScrollbar: BooleanInput;

  @Input() plenaryScrollbar = true;
  @Input() plenaryScrollbarOptions: PerfectScrollbar.Options;

  private _animation: number;
  private _options: PerfectScrollbar.Options;
  private _ps: PerfectScrollbar;
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _platform: Platform,
    private readonly _router: Router
  ) {}

  get elementRef(): ElementRef {
    return this._elementRef;
  }

  get ps(): PerfectScrollbar | undefined {
    return this._ps;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('plenaryScrollbar' in changes) {
      this.plenaryScrollbar = coerceBooleanProperty(
        changes.plenaryScrollbar.currentValue
      );

      if (this.plenaryScrollbar) {
        this._init();
      } else {
        this._destroy();
      }
    }

    if ('plenaryScrollbarOptions' in changes) {
      this._options = merge(
        {},
        this._options,
        changes.plenaryScrollbarOptions.currentValue
      );

      if (!this._ps) {
        return;
      }

      setTimeout(() => {
        this._destroy();
      });

      setTimeout(() => {
        this._init();
      });
    }
  }

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this._unsubscribeAll), debounceTime(150))
      .subscribe(() => {
        this.update();
      });
  }

  ngOnDestroy(): void {
    this._destroy();
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  isEnabled(): boolean {
    return this.plenaryScrollbar;
  }

  update(): void {
    if (!this._ps) {
      return;
    }

    this._ps.update();
  }

  destroy(): void {
    this.ngOnDestroy();
  }

  geometry(prefix = 'scroll'): ScrollbarGeometry {
    return new ScrollbarGeometry(
      this._elementRef.nativeElement[prefix + 'Left'],
      this._elementRef.nativeElement[prefix + 'Top'],
      this._elementRef.nativeElement[prefix + 'Width'],
      this._elementRef.nativeElement[prefix + 'Height']
    );
  }

  position(absolute = false): ScrollbarPosition {
    let scrollbarPosition;

    if (!absolute && this._ps) {
      scrollbarPosition = new ScrollbarPosition(
        this._ps.reach.x || 0,
        this._ps.reach.y || 0
      );
    } else {
      scrollbarPosition = new ScrollbarPosition(
        this._elementRef.nativeElement.scrollLeft,
        this._elementRef.nativeElement.scrollTop
      );
    }

    return scrollbarPosition;
  }

  scrollTo(x: number, y?: number, speed?: number): void {
    if (y == null && speed == null) {
      this.animateScrolling('scrollTop', x, speed);
    } else {
      if (x != null) {
        this.animateScrolling('scrollLeft', x, speed);
      }

      if (y != null) {
        this.animateScrolling('scrollTop', y, speed);
      }
    }
  }

  scrollToX(x: number, speed?: number): void {
    this.animateScrolling('scrollLeft', x, speed);
  }

  scrollToY(y: number, speed?: number): void {
    this.animateScrolling('scrollTop', y, speed);
  }

  scrollToTop(offset = 0, speed?: number): void {
    this.animateScrolling('scrollTop', offset, speed);
  }

  scrollToBottom(offset = 0, speed?: number): void {
    const top =
      this._elementRef.nativeElement.scrollHeight -
      this._elementRef.nativeElement.clientHeight;
    this.animateScrolling('scrollTop', top - offset, speed);
  }

  scrollToLeft(offset = 0, speed?: number): void {
    this.animateScrolling('scrollLeft', offset, speed);
  }

  scrollToRight(offset = 0, speed?: number): void {
    const left =
      this._elementRef.nativeElement.scrollWidth -
      this._elementRef.nativeElement.clientWidth;
    this.animateScrolling('scrollLeft', left - offset, speed);
  }

  scrollToElement(
    qs: string,
    offset = 0,
    ignoreVisible = false,
    speed?: number
  ): void {
    const element = this._elementRef.nativeElement.querySelector(qs);

    if (!element) {
      return;
    }

    const elementPos = element.getBoundingClientRect();
    const scrollerPos = this._elementRef.nativeElement.getBoundingClientRect();

    if (this._elementRef.nativeElement.classList.contains('ps--active-x')) {
      if (
        ignoreVisible &&
        elementPos.right <= scrollerPos.right - Math.abs(offset)
      ) {
        return;
      }

      const currentPos = this._elementRef.nativeElement.scrollLeft;
      const position = elementPos.left - scrollerPos.left + currentPos;

      this.animateScrolling('scrollLeft', position + offset, speed);
    }

    if (this._elementRef.nativeElement.classList.contains('ps--active-y')) {
      if (
        ignoreVisible &&
        elementPos.bottom <= scrollerPos.bottom - Math.abs(offset)
      ) {
        return;
      }

      const currentPos = this._elementRef.nativeElement.scrollTop;
      const position = elementPos.top - scrollerPos.top + currentPos;

      this.animateScrolling('scrollTop', position + offset, speed);
    }
  }

  animateScrolling(target: string, value: number, speed?: number): void {
    if (this._animation) {
      window.cancelAnimationFrame(this._animation);
      this._animation = null;
    }

    if (!speed || typeof window === 'undefined') {
      this._elementRef.nativeElement[target] = value;
    } else if (value !== this._elementRef.nativeElement[target]) {
      let newValue = 0;
      let scrollCount = 0;

      let oldTimestamp = performance.now();
      let oldValue = this._elementRef.nativeElement[target];

      const cosParameter = (oldValue - value) / 2;

      const step = (newTimestamp: number): void => {
        scrollCount += Math.PI / (speed / (newTimestamp - oldTimestamp));
        newValue = Math.round(
          value + cosParameter + cosParameter * Math.cos(scrollCount)
        );

        if (this._elementRef.nativeElement[target] === oldValue) {
          if (scrollCount >= Math.PI) {
            this.animateScrolling(target, value, 0);
          } else {
            this._elementRef.nativeElement[target] = newValue;

            oldValue = this._elementRef.nativeElement[target];
            oldTimestamp = newTimestamp;

            this._animation = window.requestAnimationFrame(step);
          }
        }
      };

      window.requestAnimationFrame(step);
    }
  }

  private _init(): void {
    if (this._ps) {
      return;
    }

    if (
      this._platform.ANDROID ||
      this._platform.IOS ||
      !this._platform.isBrowser
    ) {
      this.plenaryScrollbar = false;
      return;
    }

    this._ps = new PerfectScrollbar(this._elementRef.nativeElement, {
      ...this._options,
    });
  }

  private _destroy(): void {
    if (!this._ps) {
      return;
    }

    this._ps.destroy();

    this._ps = null;
  }
}
