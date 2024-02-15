import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly _navigation: ReplaySubject<Navigation> =
    new ReplaySubject<Navigation>(1);

  constructor(private readonly _httpClient: HttpClient) {}

  get navigation$(): Observable<Navigation> {
    return this._navigation.asObservable();
  }

  get(): Observable<Navigation> {
    return this._httpClient
      .get<Navigation>('@plenary-api/authentication/profile')
      .pipe(
        tap((navigation: any) => {
          const menusGroups = navigation.menus
            .map((item) => ({
              name: item.menuGroup,
              icon: item.menuGroupIcon,
              description: item.menuGroupDescription,
            }))
            .filter((v, i, a) => a.findIndex((v2) => v2.name === v.name) === i);
          const items = [];

          menusGroups.forEach((menuGroup: any) => {
            const menus = [];

            navigation.menus
              .filter((item) => item.menuGroup === menuGroup.name)
              .forEach((item) => {
                menus.push({
                  id: item.route,
                  title: item.menu,
                  type: 'basic',
                  icon: item.icon,
                  link: `/${item.route}`,
                  isActiveMatchOptions: { paths: 'exacts' },
                });
              });

            items.push({
              id: menuGroup.name,
              title: menuGroup.name,
              subtitle: menuGroup.description,
              tooltip: menuGroup.name,
              type: 'group',
              icon: menuGroup.icon,
              children: menus,
            });
          });

          this._navigation.next({
            compact: items,
            default: [],
            futuristic: [],
            horizontal: [],
          });
        })
      );
  }
}
