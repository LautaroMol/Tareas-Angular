// filtro-por-nombre.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorNombre'
})
export class FiltroPorNombrePipe implements PipeTransform {
  transform(items: any[], filtro: string): any[] {
    if (!items || !filtro) {
      return items;
    }

    return items.filter(item => item.nombreTarea.includes(filtro));
  }
}
