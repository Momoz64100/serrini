import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'workingTypeColor' })
export class WorkingTypeColorPipe implements PipeTransform {
  transform(type: string): string {

    let color: string;

    switch (type) {
      case 'En attente':
        color = 'warning';
        break;
      case 'En cours':
        color = 'success';
        break;
      case 'Urgent':
        color = 'danger';
        break;
      case 'Fait':
        color = 'primary';
        break;
      default:
        color = 'warning';
        break;
    }

    return 'label-' + color;
  }
}