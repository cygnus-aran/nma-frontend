import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rut'
})
export class RutPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    if (value) {
      // Este pipe toma un string le saca los . y -, despues lo transforma a un rut formato 00.000.000-0
      value = value.replace(/[\.\-]/g, '').toUpperCase();
      let df = value.slice(-1);
      value = value.slice(0, -1).replace(/(\d{1,2})(\d{3})(\d{3})/, '$1.$2.$3').concat('-' + df);
      return value;
    }
    return value;
  }
}
