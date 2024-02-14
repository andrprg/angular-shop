import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HOST_URL } from 'src/environments/environment';


@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: HOST_URL + request.url });
    }
    return next.handle(request).pipe(
      tap(data => console.log('return'))
    );
  }
}
