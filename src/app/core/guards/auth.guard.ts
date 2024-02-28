import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/repository/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1),
    map(isLogged => {
      if(isLogged) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    })
  );
};
