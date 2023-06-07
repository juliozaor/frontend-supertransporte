import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: string, formato: string): unknown {
    return DateTime.fromISO(fecha).toFormat(formato);
  }

}
