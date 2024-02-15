import { Injectable } from '@angular/core';
import { PlenaryDrawerComponent } from '@plenary/components/drawer/drawer.component';

@Injectable({
  providedIn: 'root',
})
export class PlenaryDrawerService {
  private readonly _componentRegistry: Map<string, PlenaryDrawerComponent> =
    new Map<string, PlenaryDrawerComponent>();

  constructor() {}

  registerComponent(name: string, component: PlenaryDrawerComponent): void {
    this._componentRegistry.set(name, component);
  }

  deregisterComponent(name: string): void {
    this._componentRegistry.delete(name);
  }

  getComponent(name: string): PlenaryDrawerComponent | undefined {
    return this._componentRegistry.get(name);
  }
}
