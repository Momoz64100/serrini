import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'effectifsTypeColor' })
export class EffectifsTypeColorPipe implements PipeTransform {
  transform(type: number): string {

    let className: string;

    switch (type) {
      case 1:
        className = 'green';
        break;
      case 2:
        className = 'orange';
        break;
      case 3:
        className = 'red';
        break;
      default:
        className = 'grey';
        break;
    }

    return 'bg-' + className;
  }
}