import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly user: UserService,
    private readonly router: Router
  ) {
    this.user.user$.pipe(takeUntil(this.unsubscribeAll)).subscribe((res) => {
      res.companyId && this.router.navigate(['/leads'])
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
