import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private userSrv: UserService = inject(UserService);

  nomUtilisateur: string = "";

  ngOnInit() {

    this.nomUtilisateur = this.userSrv.getUsername();
  }
}
