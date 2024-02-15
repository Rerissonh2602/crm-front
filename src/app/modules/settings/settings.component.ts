import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';

import { PlenaryMediaWatcherService } from '@plenary/services/media-watcher';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  public drawerMode: 'over' | 'side' = 'side';
  public drawerOpened = true;
  public panels: any[] = [];
  public selectedPanel = 'account';
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly mediaWatcherService: PlenaryMediaWatcherService
  ) {}

  ngOnInit(): void {
    this.panels = [
      {
        id: 'account',
        icon: 'heroicons_outline:user-circle',
        title: 'Minha conta',
        description: 'Gerencie seu perfil e informações pessoais',
      },
      {
        id: 'security',
        icon: 'heroicons_outline:lock-closed',
        title: 'Segurança',
        description: 'Gerencie suas preferências de senha',
      },
    ];

    this.mediaWatcherService.onMediaChange$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        if (matchingAliases.includes('md')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        } else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }

        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  getPanelInfo(id: string): any {
    return this.panels.find((panel) => panel.id === id);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
