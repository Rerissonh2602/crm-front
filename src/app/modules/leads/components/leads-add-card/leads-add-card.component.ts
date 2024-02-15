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
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'leads-add-card',
  templateUrl: './leads-add-card.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsAddCardComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('nameAutosize') nameAutosize: CdkTextareaAutosize;
  @Input() buttonTitle = 'Adicionar um novo lead';
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

    this.formVisible = false;
    this.form.get('name').setValue('');

    setTimeout(() => {
      this.nameInput.nativeElement.value = '';
      this.nameAutosize?.reset();
    });

    this.changeDetectorRef.markForCheck();
  }

  toggleFormVisibility(): void {
    this.formVisible = !this.formVisible;

    if (this.formVisible) {
      this.nameInput.nativeElement.focus();
    }
  }
}
