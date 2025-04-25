import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarbonFootprintComputeService } from '../services/carbon-footprint-compute.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  utilisateur: string = '';
  carbonFootprint: number = 0;
  carbonToRemove: number = 0;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private carbonFootprintComputeSrv: CarbonFootprintComputeService = inject(CarbonFootprintComputeService);

  ngOnInit() {
    this.utilisateur = this.activatedRoute.snapshot.params['nom'];
    this.getCarbonFootprint();
  }

  async getCarbonFootprint() {
    this.carbonFootprintComputeSrv.getCarbonFootprint().subscribe({
      next: (data: any) => this.carbonFootprint = data.empreinteCarbone,
      error: (err) => console.log,
      complete: () => {}
    });
  }

  async deleteCarbonFootprint() {
    this.carbonFootprintComputeSrv.deleteCarbonFootprint();
    await this.getCarbonFootprint();
  }

  async removeCarbonFootprint() {
    this.carbonFootprintComputeSrv.removeCarbonFootprint(1, this.carbonToRemove);
    await this.getCarbonFootprint();
  }
}
