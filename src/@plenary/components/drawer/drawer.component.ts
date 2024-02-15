import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  style,
} from '@angular/animations';
import {
  PlenaryDrawerMode,
  PlenaryDrawerPosition,
} from '@plenary/components/drawer/drawer.types';
import { PlenaryDrawerService } from '@plenary/components/drawer/drawer.service';
import { PlenaryUtilsService } from '@plenary/services/utils/utils.service';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
@Component({
  selector: 'plenary-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'plenaryDrawer',
})
export class PlenaryDrawerComponent implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_fixed: BooleanInput;
  static ngAcceptInputType_opened: BooleanInput;
  static ngAcceptInputType_transparentOverlay: BooleanInput;
  @Input() fixed = false;
  @Input() mode: PlenaryDrawerMode = 'side';
  @Input() name: string = this.plenaryUtilsService.randomId();
  @Input() opened = false;
  @Input() position: PlenaryDrawerPosition = 'left';
  @Input() transparentOverlay = false;
  @Output() readonly fixedChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output() readonly modeChanged: EventEmitter<PlenaryDrawerMode> =
    new EventEmitter<PlenaryDrawerMode>();

  @Output() readonly openedChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output() readonly positionChanged: EventEmitter<PlenaryDrawerPosition> =
    new EventEmitter<PlenaryDrawerPosition>();

  private animationsEnabled = false;
  private readonly handleOverlayClick: any;
  private hovered = false;
  private overlay: HTMLElement;
  private player: AnimationPlayer;
  constructor(
    private readonly animationBuilder: AnimationBuilder,
    private readonly elementRef: ElementRef,
    private readonly renderer2: Renderer2,
    private readonly plenaryDrawerService: PlenaryDrawerService,
    private readonly plenaryUtilsService: PlenaryUtilsService
  ) {
    this.handleOverlayClick = (): void => {
      this.close();
    };
  }

  @HostBinding('class') get classList(): any {
    return {
      'plenary-drawer-animations-enabled': this.animationsEnabled,
      'plenary-drawer-fixed': this.fixed,
      'plenary-drawer-hover': this.hovered,
      [`plenary-drawer-mode-${this.mode}`]: true,
      'plenary-drawer-opened': this.opened,
      [`plenary-drawer-position-${this.position}`]: true,
    };
  }

  @HostBinding('style') get styleList(): any {
    return {
      visibility: this.opened ? 'visible' : 'hidden',
    };
  }

  @HostListener('mouseenter')
  private onMouseenter(): void {
    this.enableAnimations();
    this.hovered = true;
  }

  @HostListener('mouseleave')
  private onMouseleave(): void {
    this.enableAnimations();
    this.hovered = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('fixed' in changes) {
      this.fixed = coerceBooleanProperty(changes.fixed.currentValue);
      this.fixedChanged.next(this.fixed);
    }

    if ('mode' in changes) {
      const previousMode = changes.mode.previousValue;
      const currentMode = changes.mode.currentValue;
      this.disableAnimations();
      if (previousMode === 'over' && currentMode === 'side') {
        this.hideOverlay();
      }

      if (previousMode === 'side' && currentMode === 'over') {
        if (this.opened) {
          this.showOverlay();
        }
      }

      this.modeChanged.next(currentMode);
      setTimeout(() => {
        this.enableAnimations();
      }, 500);
    }

    if ('opened' in changes) {
      const open = coerceBooleanProperty(changes.opened.currentValue);
      this.toggleOpened(open);
    }

    if ('position' in changes) {
      this.positionChanged.next(this.position);
    }

    if ('transparentOverlay' in changes) {
      this.transparentOverlay = coerceBooleanProperty(
        changes.transparentOverlay.currentValue
      );
    }
  }

  ngOnInit(): void {
    this.plenaryDrawerService.registerComponent(this.name, this);
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.finish();
    }

    this.plenaryDrawerService.deregisterComponent(this.name);
  }

  open(): void {
    if (this.opened) {
      return;
    }

    this.toggleOpened(true);
  }

  close(): void {
    if (!this.opened) {
      return;
    }

    this.toggleOpened(false);
  }

  toggle(): void {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  private enableAnimations(): void {
    if (this.animationsEnabled) {
      return;
    }

    this.animationsEnabled = true;
  }

  private disableAnimations(): void {
    if (!this.animationsEnabled) {
      return;
    }

    this.animationsEnabled = false;
  }

  private showOverlay(): void {
    this.overlay = this.renderer2.createElement('div');
    this.overlay.classList.add('plenary-drawer-overlay');
    if (this.fixed) {
      this.overlay.classList.add('plenary-drawer-overlay-fixed');
    }

    if (this.transparentOverlay) {
      this.overlay.classList.add('plenary-drawer-overlay-transparent');
    }

    this.renderer2.appendChild(
      this.elementRef.nativeElement.parentElement,
      this.overlay
    );
    this.player = this.animationBuilder
      .build([
        style({ opacity: 0 }),
        animate(
          '300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 1 })
        ),
      ])
      .create(this.overlay);
    this.player.play();
    this.overlay.addEventListener('click', this.handleOverlayClick);
  }

  private hideOverlay(): void {
    if (!this.overlay) {
      return;
    }

    this.player = this.animationBuilder
      .build([
        animate(
          '300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 0 })
        ),
      ])
      .create(this.overlay);
    this.player.play();
    this.player.onDone(() => {
      if (this.overlay) {
        this.overlay.removeEventListener('click', this.handleOverlayClick);
        this.overlay.parentNode.removeChild(this.overlay);
        this.overlay = null;
      }
    });
  }

  private toggleOpened(open: boolean): void {
    this.opened = open;
    this.enableAnimations();
    if (this.mode === 'over') {
      if (open) {
        this.showOverlay();
      } else {
        this.hideOverlay();
      }
    }

    this.openedChanged.next(open);
  }
}
