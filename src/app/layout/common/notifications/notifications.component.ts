import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatButton } from '@angular/material/button';
import { Subject, filter, takeUntil } from 'rxjs';

import { UserService } from '../../../core/user/user.service';
import { NotificationInAppMetadataInterface } from '../../../core/auth/auth.types';
import { Socket } from 'ngx-socket-io';
import { environment } from 'environments/environment';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  exportAs: 'notifications',
})
export class NotificationsComponent implements OnInit, OnDestroy {
  @ViewChild('notificationsOrigin') private notificationsOrigin: MatButton;
  @ViewChild('notificationsPanel') private notificationsPanel: TemplateRef<any>;

  public chatSocket: Socket;
  public notifications: NotificationInAppMetadataInterface[] = [];
  private overlayRef: OverlayRef;
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();
  protected readonly open = open;
  protected readonly close = close;

  constructor(
    private readonly service: UserService,
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly router: Router,
    private readonly titleService: Title
  ) {
    this.getAll();
  }

  ngOnInit(): void {
    this.service.user$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((item) => {
        this.chatSocket = new Socket({
          url: environment.websocket,
          options: {
            path: '',
          },
        });
        this.chatSocket.ioSocket.nsp = '/notifications';
        this.chatSocket.fromEvent(item.id).subscribe(() => {
          this.getAll();
        });
      });
  }

  getAll(): void {
    this.service
      .getUserNotifications()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        const unReadMessages = res.filter((item) => !item.isRead).length ? `(${res.filter((item) => !item.isRead).length}) `: '';
        this.router.events
          .pipe(filter((event) => event instanceof NavigationEnd))
          .subscribe(() =>
            this.titleService.setTitle(
              `${unReadMessages}Agência M8`
            )
          );
        this.titleService.setTitle(
          `${unReadMessages}Agência M8`
        );
        console.log(res)
        this.notifications = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  getReadNotifications(): NotificationInAppMetadataInterface[] {
    return this.notifications.filter((item) => item.isRead);
  }

  getUnreadNotifications(): NotificationInAppMetadataInterface[] {
    return this.notifications.filter((item) => !item.isRead);
  }

  markAllRead(): void {
    this.service.markAllNotificationRead().subscribe(() => {
      this.getAll();
    });
  }

  markRead(id: number): void {
    this.service.markNotificationRead(id).subscribe(() => {
      this.getAll();
    });
  }

  openPanel(): void {
    if (!this.overlayRef) {
      this.createOverlay();
    }

    this.overlayRef.attach(
      new TemplatePortal(this.notificationsPanel, this.viewContainerRef)
    );
  }

  closePanel(): void {
    this.overlayRef.detach();
  }

  private createOverlay(): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'hubsd-backdrop-on-mobile',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.notificationsOrigin._elementRef.nativeElement)
        .withLockedPosition(true)
        .withPush(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
          },
        ]),
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });
  }
}
