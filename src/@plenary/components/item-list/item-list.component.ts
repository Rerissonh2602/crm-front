import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'plenary-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'plenaryTable',
})
export class PlenaryItemListComponent {
  @Input() dataSource: any;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() selection = new SelectionModel<number>(true, []);
  @Output() actionListener = new EventEmitter<any>();

  constructor() {}

  getKeyByValue(object: any, value: string): any {
    let keyFiltered;

    if (value.includes('.')) {
      keyFiltered = object;

      value.split('.').forEach((element) => {
        keyFiltered = keyFiltered[element];
      });

      return keyFiltered;
    }

    keyFiltered = object[value];

    return keyFiltered;
  }
}
