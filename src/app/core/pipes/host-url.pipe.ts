import { Pipe, PipeTransform } from '@angular/core';
import { HOST_URL } from 'src/environments/environment';

@Pipe({
  name: 'hostUrl',
  standalone: true
})
export class HostUrlPipe implements PipeTransform {

  transform(imageUrl: string = ''): string {
    return HOST_URL + '/' + imageUrl;
  }

}
