import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  const isLoggedIn = userService.getUsername() !== '';

  if (!isLoggedIn) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
