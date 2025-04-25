import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  nomUtilisateur: string = '';
  private userSrv: UserService = inject(UserService);

  async ngOnInit() {
    this.nomUtilisateur = await this.userSrv.getUsername();
  }
}
