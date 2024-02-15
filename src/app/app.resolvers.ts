import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NavigationService } from 'app/core/navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
  constructor(private readonly navigationService: NavigationService) {}

  resolve(): Observable<any> {
    return forkJoin([this.navigationService.get()]);
  }
}
