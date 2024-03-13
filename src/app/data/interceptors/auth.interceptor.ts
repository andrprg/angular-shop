import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from 'src/app/repository/auth.service';

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
     const authService = inject(AuthService);
     const userToken = authService.access_token; const modifiedReq = req.clone({
       headers: req.headers.set('Authorization', `Bearer ${userToken}`),
     });
  
     return next(modifiedReq);
  };