import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private userSrv: UserService = inject(UserService);
  private router: Router = inject(Router);

  login: string = '';
  password: string = '';
  errorMsg: string[] = [];

  async connection() {
    this.errorMsg = [];
    if (this.login.length < 3)
      this.errorMsg.push("Le login doit faire au moins 3 caractères.");
    if (this.password.length < 6)
      this.errorMsg.push("Le mot de passe doit faire au moins 6 caractères !");
    if (this.errorMsg.length === 0) {
      await this.userSrv.login(this.login);
      this.router.navigate(['/summary']);
    }
  }
}
