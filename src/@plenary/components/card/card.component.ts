import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { plenaryAnimations } from '@plenary/animations';
import { PlenaryCardFace } from '@plenary/components/card/card.types';

@Component({
  selector: 'plenary-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: plenaryAnimations,
  exportAs: 'plenaryCard',
})
export class PlenaryCardComponent implements OnChanges {
  static ngAcceptInputType_expanded: BooleanInput;
  static ngAcceptInputType_flippable: BooleanInput;

  @Input() expanded = false;
  @Input() face: PlenaryCardFace = 'front';
  @Input() flippable = false;

  constructor() {}

  @HostBinding('class') get classList(): any {
    return {
      'plenary-card-expanded': this.expanded,
      'plenary-card-face-back': this.flippable && this.face === 'back',
      'plenary-card-face-front': this.flippable && this.face === 'front',
      'plenary-card-flippable': this.flippable,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('expanded' in changes) {
      this.expanded = coerceBooleanProperty(changes.expanded.currentValue);
    }

    if ('flippable' in changes) {
      this.flippable = coerceBooleanProperty(changes.flippable.currentValue);
    }
  }
}
