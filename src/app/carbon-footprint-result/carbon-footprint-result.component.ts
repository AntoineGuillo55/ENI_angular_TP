import { Component, inject } from '@angular/core';
import { CarbonFootprintComputeService } from '../services/carbon-footprint-compute.service';

@Component({
  selector: 'app-carbon-footprint-result',
  imports: [],
  templateUrl: './carbon-footprint-result.component.html',
  styleUrl: './carbon-footprint-result.component.scss'
})
export class CarbonFootprintResultComponent {

  private carbonFootprintComputeSrv: CarbonFootprintComputeService = inject(CarbonFootprintComputeService);
  carbonFootprint: number = 0;

  ngOnInit() {
    this.carbonFootprintComputeSrv.getCarbonFootprint().subscribe({
      next: (data: any) => this.carbonFootprint = data.empreinteCarbone,
      error: (err) => console.log,
      complete: () => {}
    });
  }
}
