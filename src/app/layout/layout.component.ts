import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';

import { PlenaryConfigService } from '@plenary/services/config';
import { PlenaryMediaWatcherService } from '@plenary/services/media-watcher';
import { PlenaryPlatformService } from '@plenary/services/platform';
import { PLENARY_VERSION } from '@plenary/version';

import { AppConfig } from 'app/core/config/app.config';
import { Layout } from 'app/layout/layout.types';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {
  public config: AppConfig;
  public layout: Layout;
  public scheme: 'dark' | 'light';
  public theme: string;
  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(DOCUMENT)
    private readonly document: any,

    private readonly activatedRoute: ActivatedRoute,
    private readonly renderer2: Renderer2,
    private readonly router: Router,
    private readonly plenaryConfigService: PlenaryConfigService,
    private readonly plenaryMediaWatcherService: PlenaryMediaWatcherService,
    private readonly plenaryPlatformService: PlenaryPlatformService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.plenaryConfigService.config$,
      this.plenaryMediaWatcherService.onMediaQueryChange$([
        '(prefers-color-scheme: dark)',
        '(prefers-color-scheme: light)',
      ]),
    ])
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(([config, mql]) => {
          const options = {
            scheme: config.scheme,
            theme: config.theme,
          };

          if (config.scheme === 'auto') {
            options.scheme = mql.breakpoints['(prefers-color-scheme: dark)']
              ? 'dark'
              : 'light';
          }

          return options;
        })
      )
      .subscribe((options) => {
        this.scheme = options.scheme;
        this.theme = options.theme;

        this._updateScheme();
        this._updateTheme();
      });

    this.plenaryConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        this.config = config;
        this._updateLayout();
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this._updateLayout();
      });

    this.renderer2.setAttribute(
      this.document.querySelector('[ng-version]'),
      'plenary-version',
      PLENARY_VERSION
    );

    this.renderer2.addClass(
      this.document.body,
      this.plenaryPlatformService.osName
    );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  private _updateLayout(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    this.layout = this.config.layout;

    const layoutFromQueryParam = route.snapshot.queryParamMap.get(
      'layout'
    ) as Layout;
    if (layoutFromQueryParam) {
      this.layout = layoutFromQueryParam;
      if (this.config) {
        this.config.layout = layoutFromQueryParam;
      }
    }

    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      if (path.routeConfig?.data?.layout) {
        this.layout = path.routeConfig.data.layout;
      }
    });
  }

  private _updateScheme(): void {
    this.document.body.classList.remove('light', 'dark');

    this.document.body.classList.add(this.scheme);
  }

  private _updateTheme(): void {
    this.document.body.classList.forEach((className: string) => {
      if (className.startsWith('theme-')) {
        this.document.body.classList.remove(className, className.split('-')[1]);
      }
    });

    this.document.body.classList.add(this.theme);
  }
}
