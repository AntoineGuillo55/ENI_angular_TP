import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private userSrv: UserService = inject(UserService);
  private router: Router = inject(Router);

  login(username: string) {

    this.userSrv.login(username);
    this.router.navigate(['/summary']);

  }

}
