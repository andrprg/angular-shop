import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'hostUrl',
  standalone: true
})
export class HostUrlPipe implements PipeTransform {

  transform(imageUrl: string = ''): string {
    return environment.hostUrl+ '/' + imageUrl;
  }

}
