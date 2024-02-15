import { Injectable } from '@angular/core';
import { Route, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private readonly service: UserService) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check(route, segments);
  }

  private check(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.service.user$.pipe(
      map((user) =>
        user.privileges
          .map((item) => item.key)
          .includes(`${route.data.menuKey}_MENU`)
      )
    );
  }
}
