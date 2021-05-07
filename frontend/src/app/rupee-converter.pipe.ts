import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupeeConverter'
})
export class RupeeConverterPipe implements PipeTransform {

  transform(value: string): string {
    return parseFloat(value)*78+"";
  }

}
