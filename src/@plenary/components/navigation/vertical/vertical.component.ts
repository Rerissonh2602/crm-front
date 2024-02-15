import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  style,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import {
  delay,
  filter,
  merge,
  ReplaySubject,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';
import { plenaryAnimations } from '@plenary/animations';
import {
  PlenaryNavigationItem,
  PlenaryVerticalNavigationAppearance,
  PlenaryVerticalNavigationMode,
  PlenaryVerticalNavigationPosition,
} from '@plenary/components/navigation/navigation.types';
import { PlenaryNavigationService } from '@plenary/components/navigation/navigation.service';
import { PlenaryScrollbarDirective } from '@plenary/directives/scrollbar/scrollbar.directive';
import { PlenaryUtilsService } from '@plenary/services/utils/utils.service';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'plenary-vertical-navigation',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  animations: plenaryAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'plenaryVerticalNavigation',
})
export class PlenaryVerticalNavigationComponent
  implements OnChanges, OnInit, AfterViewInit, OnDestroy
{
  static ngAcceptInputType_inner: BooleanInput;
  static ngAcceptInputType_opened: BooleanInput;
  static ngAcceptInputType_transparentOverlay: BooleanInput;

  @Input() appearance: PlenaryVerticalNavigationAppearance = 'default';
  @Input() autoCollapse = true;
  @Input() inner = false;
  @Input() mode: PlenaryVerticalNavigationMode = 'side';
  @Input() name: string = this._plenaryUtilsService.randomId();
  @Input() navigation: PlenaryNavigationItem[];
  @Input() opened = true;
  @Input() position: PlenaryVerticalNavigationPosition = 'left';
  @Input() transparentOverlay = false;
  @Output()
  readonly appearanceChanged: EventEmitter<PlenaryVerticalNavigationAppearance> =
    new EventEmitter<PlenaryVerticalNavigationAppearance>();

  @Output() readonly modeChanged: EventEmitter<PlenaryVerticalNavigationMode> =
    new EventEmitter<PlenaryVerticalNavigationMode>();

  @Output() readonly openedChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output()
  readonly positionChanged: EventEmitter<PlenaryVerticalNavigationPosition> =
    new EventEmitter<PlenaryVerticalNavigationPosition>();

  @ViewChild('navigationContent')
  private readonly _navigationContentEl: ElementRef;

  activeAsideItemId: string | undefined = null;
  onCollapsableItemCollapsed: ReplaySubject<PlenaryNavigationItem> =
    new ReplaySubject<PlenaryNavigationItem>(1);

  onCollapsableItemExpanded: ReplaySubject<PlenaryNavigationItem> =
    new ReplaySubject<PlenaryNavigationItem>(1);

  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _animationsEnabled = false;
  private _asideOverlay: HTMLElement;
  private readonly _handleAsideOverlayClick: any;
  private readonly _handleOverlayClick: any;
  private _hovered = false;
  private _mutationObserver: MutationObserver;
  private _overlay: HTMLElement;
  private _player: AnimationPlayer;
  private readonly _scrollStrategy: ScrollStrategy =
    this._scrollStrategyOptions.block();
  private _plenaryScrollbarDirectives!: QueryList<PlenaryScrollbarDirective>;
  private _plenaryScrollbarDirectivesSubscription: Subscription;
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(DOCUMENT) private readonly _document: Document,

    private readonly _animationBuilder: AnimationBuilder,
    private readonly _changeDetectorRef: ChangeDetectorRef,

    private readonly _elementRef: ElementRef,
    private readonly _renderer2: Renderer2,
    private readonly _router: Router,
    private readonly _scrollStrategyOptions: ScrollStrategyOptions,
    private readonly _plenaryNavigationService: PlenaryNavigationService,
    private readonly _plenaryUtilsService: PlenaryUtilsService
  ) {
    this._handleAsideOverlayClick = (): void => {
      this.closeAside();
    };

    this._handleOverlayClick = (): void => {
      this.close();
    };
  }

  @HostBinding('class') get classList(): any {
    return {
      'plenary-vertical-navigation-animations-enabled': this._animationsEnabled,
      [`plenary-vertical-navigation-appearance-${this.appearance}`]: true,
      'plenary-vertical-navigation-hover': this._hovered,
      'plenary-vertical-navigation-inner': this.inner,
      'plenary-vertical-navigation-mode-over': this.mode === 'over',
      'plenary-vertical-navigation-mode-side': this.mode === 'side',
      'plenary-vertical-navigation-opened': this.opened,
      'plenary-vertical-navigation-position-left': this.position === 'left',
      'plenary-vertical-navigation-position-right': this.position === 'right',
    };
  }

  @HostBinding('style') get styleList(): any {
    return {
      visibility: this.opened ? 'visible' : 'hidden',
    };
  }

  @ViewChildren(PlenaryScrollbarDirective)
  set plenaryScrollbarDirectives(
    plenaryScrollbarDirectives: QueryList<PlenaryScrollbarDirective>
  ) {
    this._plenaryScrollbarDirectives = plenaryScrollbarDirectives;

    if (plenaryScrollbarDirectives.length === 0) {
      return;
    }

    if (this._plenaryScrollbarDirectivesSubscription) {
      this._plenaryScrollbarDirectivesSubscription.unsubscribe();
    }

    this._plenaryScrollbarDirectivesSubscription = merge(
      this.onCollapsableItemCollapsed,
      this.onCollapsableItemExpanded
    )
      .pipe(takeUntil(this._unsubscribeAll), delay(250))
      .subscribe(() => {
        plenaryScrollbarDirectives.forEach((plenaryScrollbarDirective) => {
          plenaryScrollbarDirective.update();
        });
      });
  }

  @HostListener('mouseenter')
  private _onMouseenter(): void {
    this._enableAnimations();

    this._hovered = true;
  }

  @HostListener('mouseleave')
  private _onMouseleave(): void {
    this._enableAnimations();

    this._hovered = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('appearance' in changes) {
      this.appearanceChanged.next(changes.appearance.currentValue);
    }

    if ('inner' in changes) {
      this.inner = coerceBooleanProperty(changes.inner.currentValue);
    }

    if ('mode' in changes) {
      const currentMode = changes.mode.currentValue;
      const previousMode = changes.mode.previousValue;

      this._disableAnimations();
      if (previousMode === 'over' && currentMode === 'side') {
        this._hideOverlay();
      }

      if (previousMode === 'side' && currentMode === 'over') {
        this.closeAside();

        if (this.opened) {
          this._showOverlay();
        }
      }

      this.modeChanged.next(currentMode);

      setTimeout(() => {
        this._enableAnimations();
      }, 500);
    }

    if ('navigation' in changes) {
      this._changeDetectorRef.markForCheck();
    }

    if ('opened' in changes) {
      this.opened = coerceBooleanProperty(changes.opened.currentValue);

      this._toggleOpened(this.opened);
    }

    if ('position' in changes) {
      this.positionChanged.next(changes.position.currentValue);
    }

    if ('transparentOverlay' in changes) {
      this.transparentOverlay = coerceBooleanProperty(
        changes.transparentOverlay.currentValue
      );
    }
  }

  ngOnInit(): void {
    if (this.name === '') {
      this.name = this._plenaryUtilsService.randomId();
    }

    this._plenaryNavigationService.registerComponent(this.name, this);

    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        if (this.mode === 'over' && this.opened) {
          this.close();
        }

        if (this.mode === 'side' && this.activeAsideItemId) {
          this.closeAside();
        }
      });
  }

  ngAfterViewInit(): void {
    this._mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const mutationTarget = mutation.target as HTMLElement;
        if (mutation.attributeName === 'class') {
          if (mutationTarget.classList.contains('cdk-global-scrollblock')) {
            const top = parseInt(mutationTarget.style.top, 10);
            this._renderer2.setStyle(
              this._elementRef.nativeElement,
              'margin-top',
              `${Math.abs(top)}px`
            );
          } else {
            this._renderer2.setStyle(
              this._elementRef.nativeElement,
              'margin-top',
              null
            );
          }
        }
      });
    });
    this._mutationObserver.observe(this._document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    setTimeout(() => {
      if (!this._navigationContentEl) {
        return;
      }

      if (!this._navigationContentEl.nativeElement.classList.contains('ps')) {
        const activeItem =
          this._navigationContentEl.nativeElement.querySelector(
            '.plenary-vertical-navigation-item-active'
          );

        if (activeItem) {
          activeItem.scrollIntoView();
        }
      } else {
        this._plenaryScrollbarDirectives.forEach(
          (plenaryScrollbarDirective) => {
            if (!plenaryScrollbarDirective.isEnabled()) {
              return;
            }

            plenaryScrollbarDirective.scrollToElement(
              '.plenary-vertical-navigation-item-active',
              -120,
              true
            );
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this._mutationObserver.disconnect();

    this.close();
    this.closeAside();

    this._plenaryNavigationService.deregisterComponent(this.name);

    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  refresh(): void {
    this._changeDetectorRef.markForCheck();

    this.onRefreshed.next(true);
  }

  open(): void {
    if (this.opened) {
      return;
    }

    this._toggleOpened(true);
  }

  close(): void {
    if (!this.opened) {
      return;
    }

    this.closeAside();

    this._toggleOpened(false);
  }

  toggle(): void {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  openAside(item: PlenaryNavigationItem): void {
    if (item.disabled || !item.id) {
      return;
    }

    this.activeAsideItemId = item.id;

    this._showAsideOverlay();

    this._changeDetectorRef.markForCheck();
  }

  closeAside(): void {
    this.activeAsideItemId = null;
    this._hideAsideOverlay();

    this._changeDetectorRef.markForCheck();
  }

  toggleAside(item: PlenaryNavigationItem): void {
    if (this.activeAsideItemId === item.id) {
      this.closeAside();
    } else {
      this.openAside(item);
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _enableAnimations(): void {
    if (this._animationsEnabled) {
      return;
    }

    this._animationsEnabled = true;
  }

  private _disableAnimations(): void {
    if (!this._animationsEnabled) {
      return;
    }

    this._animationsEnabled = false;
  }

  private _showOverlay(): void {
    if (this._asideOverlay) {
      return;
    }

    this._overlay = this._renderer2.createElement('div');

    this._overlay.classList.add('plenary-vertical-navigation-overlay');

    if (this.transparentOverlay) {
      this._overlay.classList.add(
        'plenary-vertical-navigation-overlay-transparent'
      );
    }

    this._renderer2.appendChild(
      this._elementRef.nativeElement.parentElement,
      this._overlay
    );

    this._scrollStrategy.enable();

    this._player = this._animationBuilder
      .build([
        animate(
          '300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 1 })
        ),
      ])
      .create(this._overlay);

    this._player.play();

    this._overlay.addEventListener('click', this._handleOverlayClick);
  }

  private _hideOverlay(): void {
    if (!this._overlay) {
      return;
    }

    this._player = this._animationBuilder
      .build([
        animate(
          '300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 0 })
        ),
      ])
      .create(this._overlay);

    this._player.play();

    this._player.onDone(() => {
      if (this._overlay) {
        this._overlay.removeEventListener('click', this._handleOverlayClick);

        this._overlay.parentNode.removeChild(this._overlay);
        this._overlay = null;
      }

      this._scrollStrategy.disable();
    });
  }

  private _showAsideOverlay(): void {
    if (this._asideOverlay) {
      return;
    }

    this._asideOverlay = this._renderer2.createElement('div');

    this._asideOverlay.classList.add(
      'plenary-vertical-navigation-aside-overlay'
    );

    this._renderer2.appendChild(
      this._elementRef.nativeElement.parentElement,
      this._asideOverlay
    );

    this._player = this._animationBuilder
      .build([
        animate(
          '300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 1 })
        ),
      ])
      .create(this._asideOverlay);

    this._player.play();

    this._asideOverlay.addEventListener('click', this._handleAsideOverlayClick);
  }

  private _hideAsideOverlay(): void {
    if (!this._asideOverlay) {
      return;
    }

    this._player = this._animationBuilder
      .build([
        animate(
          '300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 0 })
        ),
      ])
      .create(this._asideOverlay);

    this._player.play();

    this._player.onDone(() => {
      if (this._asideOverlay) {
        this._asideOverlay.removeEventListener(
          'click',
          this._handleAsideOverlayClick
        );

        this._asideOverlay.parentNode.removeChild(this._asideOverlay);
        this._asideOverlay = null;
      }
    });
  }

  private _toggleOpened(open: boolean): void {
    this.opened = open;

    this._enableAnimations();

    if (this.mode === 'over') {
      if (this.opened) {
        this._showOverlay();
      } else {
        this._hideOverlay();
      }
    }

    this.openedChanged.next(open);
  }
}
