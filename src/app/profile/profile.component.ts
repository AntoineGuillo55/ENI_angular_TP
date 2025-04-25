import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  utilisateur: string = '';

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.utilisateur = this.activatedRoute.snapshot.params['nom'];

    // Autre manière de récupérer le paramètre
    // this.activatedRoute.params.subscribe({
    //   next: (param: any) => this.utilisateur = param['nom']
    // });
  }

}
