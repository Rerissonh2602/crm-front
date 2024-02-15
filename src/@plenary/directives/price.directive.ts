import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[plenaryCurrency]'
})
export class CurrencyDirective {
  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    const numericValue = this.extractNumeric(event);
    this.control.valueAccessor.writeValue(this.formatAsCurrency(numericValue));
  }

  @HostListener('keydown.backspace', ['$event'])
  handleBackspace(event: KeyboardEvent) {
    if (this.control.value && event.key === 'Backspace') {
      const numericValue = this.extractNumeric(this.control.value);
      this.control.valueAccessor.writeValue(this.formatAsCurrency(numericValue));
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = (event.target as HTMLInputElement).value;
    const numericValue = this.extractNumeric(input);
    this.control.control.setValue(numericValue);
  }

  private extractNumeric(value: any): number {
    return parseFloat(value.replace(/[^\d]/g, '')) || 0;
  }

  private formatAsCurrency(value: number): string {
    const currencyString = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return currencyString;
  }
}
