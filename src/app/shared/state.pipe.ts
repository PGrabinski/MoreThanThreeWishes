import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'awaiting') {
      return 'Awaiting';
    } else if (value === 'cameTrue') {
      return 'Came true';
    } else {
      return '';
    }
  }

}
