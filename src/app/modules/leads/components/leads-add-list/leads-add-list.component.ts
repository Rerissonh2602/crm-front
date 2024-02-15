import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'leads-add-list',
  templateUrl: './leads-add-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsAddListComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @Input() buttonTitle = 'Adicionar uma nova coluna';
  @Output() readonly saved: EventEmitter<string> = new EventEmitter<string>();

  public form: UntypedFormGroup;
  public formVisible = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
    });
  }

  save(): void {
    const name = this.form.get('name').value;

    if (!name || name.trim() === '') {
      return;
    }

    this.saved.next(name.trim());

    this.form.get('name').setValue('');
    this.formVisible = false;

    this.changeDetectorRef.markForCheck();
  }

  toggleFormVisibility(): void {
    this.formVisible = !this.formVisible;

    if (this.formVisible) {
      this.nameInput.nativeElement.focus();
    }
  }
}
