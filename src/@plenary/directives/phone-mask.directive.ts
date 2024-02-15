import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[plenaryPhoneMask]',
})
export class PhoneMaskDirective {
  constructor(private readonly el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = this.format(input.value);
  }

  @HostListener('ngModelChange', ['$event']) onNgModelChange(
    event: string
  ): void {
    this.el.nativeElement.value = this.format(event);
  }

  format(input: string): string {
    let value = input ? input.replace(/\D/g, '') : '';

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    return value;
  }
}
