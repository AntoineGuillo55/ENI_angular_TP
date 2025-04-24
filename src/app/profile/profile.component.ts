import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private activatedRoute: ActivatedRoute) {

  }

  name: string = "";

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.params['name'];
  }

}
