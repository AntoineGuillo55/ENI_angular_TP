import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';

export const userGuard: CanActivateFn = async (route, state) => {
  const userSrv = inject(UserService);
  const router = inject(Router);

  const username = await userSrv.getUsername();
  if (username !== '')
    return true;
  else {
    router.navigate(['/']);
    return false;
  }
};
