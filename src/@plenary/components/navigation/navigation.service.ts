import { Injectable } from '@angular/core';
import { PlenaryNavigationItem } from '@plenary/components/navigation/navigation.types';

@Injectable({
  providedIn: 'root',
})
export class PlenaryNavigationService {
  private readonly _componentRegistry: Map<string, any> = new Map<
    string,
    any
  >();
  private readonly _navigationStore: Map<string, PlenaryNavigationItem[]> =
    new Map<string, any>();

  constructor() {}

  registerComponent(name: string, component: any): void {
    this._componentRegistry.set(name, component);
  }

  deregisterComponent(name: string): void {
    this._componentRegistry.delete(name);
  }

  getComponent<T>(name: string): T {
    return this._componentRegistry.get(name);
  }

  storeNavigation(key: string, navigation: PlenaryNavigationItem[]): void {
    this._navigationStore.set(key, navigation);
  }

  getNavigation(key: string): PlenaryNavigationItem[] {
    return this._navigationStore.get(key) ?? [];
  }

  deleteNavigation(key: string): void {
    if (!this._navigationStore.has(key)) {
      console.warn(
        `Navigation with the key '${key}' does not exist in the store.`
      );
    }

    this._navigationStore.delete(key);
  }

  getFlatNavigation(
    navigation: PlenaryNavigationItem[],
    flatNavigation: PlenaryNavigationItem[] = []
  ): PlenaryNavigationItem[] {
    for (const item of navigation) {
      if (item.type === 'basic') {
        flatNavigation.push(item);
        continue;
      }

      if (
        item.type === 'aside' ||
        item.type === 'collapsable' ||
        item.type === 'group'
      ) {
        if (item.children) {
          this.getFlatNavigation(item.children, flatNavigation);
        }
      }
    }

    return flatNavigation;
  }

  getItem(
    id: string,
    navigation: PlenaryNavigationItem[]
  ): PlenaryNavigationItem | undefined {
    for (const item of navigation) {
      if (item.id === id) {
        return item;
      }

      if (item.children) {
        const childItem = this.getItem(id, item.children);

        if (childItem) {
          return childItem;
        }
      }
    }

    return null;
  }

  getItemParent(
    id: string,
    navigation: PlenaryNavigationItem[],
    parent: PlenaryNavigationItem[] | PlenaryNavigationItem
  ): PlenaryNavigationItem[] | PlenaryNavigationItem | undefined {
    for (const item of navigation) {
      if (item.id === id) {
        return parent;
      }

      if (item.children) {
        const childItem = this.getItemParent(id, item.children, item);

        if (childItem) {
          return childItem;
        }
      }
    }

    return null;
  }
}
