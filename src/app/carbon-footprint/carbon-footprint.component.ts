import { Component } from '@angular/core';
import { CarbonFootprintFormComponent } from '../carbon-footprint-form/carbon-footprint-form.component';
import { CarbonFootprintResultComponent } from '../carbon-footprint-result/carbon-footprint-result.component';
import { CommonModule } from '@angular/common';
import { CarbonFootprintComputeService } from '../services/carbon-footprint-compute.service';


@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintFormComponent, CarbonFootprintResultComponent, CommonModule],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.scss'
})
export class CarbonFootprintComponent {

  constructor(private voyageService : CarbonFootprintComputeService) {}

  distanceKm: number = 0;
  consommationPour100Km: number = 7;
  consommationTotale: number = (this.distanceKm *this.consommationPour100Km)/100;
  emissionsCO2Totale: number = 0


  voyages : any[] = [];

  majData() {
    let resumeVoyages = this.voyageService.getResumeVoyages();
    this.distanceKm = resumeVoyages.totalDist;
    this.consommationPour100Km = resumeVoyages.totalCons;
    this.emissionsCO2Totale = resumeVoyages.totalCO2;
  }

  add100Km() {
    this.distanceKm += 100;
  }

  // generateTravel() {

  //   let voyage = {
  //     distanceKm: Math.random() * 100,
  //     consommationPour100Km: Math.random() * 10,
  //     quantiteCO2: 0
  //   };

  //   voyage.quantiteCO2 = this.voyageService.calculateQuantityCO2(voyage.distanceKm, voyage.consommationPour100Km);

  //   this.voyageService.addVoyage(voyage)
  //   this.majData();
  // }

  ngOnInit() {
    this.voyages = this.voyageService.getVoyage();
    this.majData();
  }

}
