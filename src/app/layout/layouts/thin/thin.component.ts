import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PlenaryMediaWatcherService } from '@plenary/services/media-watcher';
import {
  PlenaryNavigationService,
  PlenaryVerticalNavigationComponent,
} from '@plenary/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';

@Component({
  selector: 'thin-layout',
  templateUrl: './thin.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ThinLayoutComponent implements OnInit, OnDestroy {
  public isScreenSmall: boolean;
  public navigation: Navigation;
  public navigationAppearance: 'default' | 'dense' = 'dense';
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly navigationService: NavigationService,
    private readonly plenaryMediaWatcherService: PlenaryMediaWatcherService,
    private readonly plenaryNavigationService: PlenaryNavigationService
  ) {}

  ngOnInit(): void {
    this.navigationService.navigation$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((navigation: Navigation) => {
        this.navigation = navigation;
      });

    this.plenaryMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        this.isScreenSmall = !matchingAliases.includes('md');
        this.navigationAppearance = 'default';
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  toggleNavigation(name: string): void {
    const navigation =
      this.plenaryNavigationService.getComponent<PlenaryVerticalNavigationComponent>(
        name
      );

    if (navigation) {
      navigation.toggle();
    }
  }

  toggleNavigationAppearance(): void {
    this.navigationAppearance =
      this.navigationAppearance === 'default' ? 'dense' : 'default';
  }
}
