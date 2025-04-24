import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { count } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private userSrv: UserService = inject(UserService);
  private router: Router = inject(Router);
  private fb = inject(FormBuilder);

  // myForm = this.fb.group({

  // });

  username: string = "";
  password: string = "";
  errors: any[] = [];

  onSubmitTemplateForm() {

    if (this.username === "") {
      this.errors.push("Le nom d'utilisateurest requis")
    }

    if (this.username.length < 3) {
      this.errors.push("Le nom d'utilisateur doit contenir au moins 3 caractères")
    }

    if (this.password === "") {
      this.errors.push("Le nom d'utilisateurest requis")
    }

    if (this.password.length < 6) {
      this.errors.push("Le mot de passe doit contenir au moins 6 caractères")
    }

    if (this.errors.length > 0) {
      return;
    }

    return this.login(this.username, this.password);
  }

  login(username: string, password: string) {

    this.userSrv.login(username, password);
    this.router.navigate(['/summary']);
  }

}
