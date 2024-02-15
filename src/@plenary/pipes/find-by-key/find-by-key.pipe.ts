import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plenaryFindByKey',
  pure: false,
})
export class PlenaryFindByKeyPipe implements PipeTransform {
  constructor() {}

  transform(value: string | string[], key: string, source: any[]): any {
    if (Array.isArray(value)) {
      return value.map((item) =>
        source.find((sourceItem) => sourceItem[key] === item)
      );
    }

    return source.find((sourceItem) => sourceItem[key] === value);
  }
}
