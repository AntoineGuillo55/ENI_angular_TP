import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarbonFootprintFormComponent } from "../carbon-footprint-form/carbon-footprint-form.component";
import { CarbonFootprintResultComponent } from "../carbon-footprint-result/carbon-footprint-result.component";
import { CarbonFootprintComputeService } from '../services/carbon-footprint-compute.service';
import { ResumeVoyage } from '../models/resume-voyage';
import { Voyage } from '../models/voyage';

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintFormComponent, CarbonFootprintResultComponent, CommonModule],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.scss'
})
export class CarbonFootprintComponent {

  distanceKm: number = 0;
  consommationPour100Km: number = 0;
  quantiteTotaleCO2: number = 0;
  voyages: Voyage[] = [];

  carbonFootPrintComputeSrv: CarbonFootprintComputeService = inject(CarbonFootprintComputeService);

  async ngOnInit() {
    this.voyages = await this.carbonFootPrintComputeSrv.getVoyages();
    this.updateResumeVoyage();
  }

  ajouter100km() {
    this.distanceKm += 100;
  }

  async genererVoyage() {
    // Génération d'un nouveau voyage
    const distance = Math.ceil(Math.random() * 600);
    const consommation = Math.ceil(Math.random() * 10) + 1;

    let nouveauVoyage: Voyage = {
      distanceKm: distance,
      consommationPour100Km: Math.ceil(Math.random() * 10) + 1,
      quantiteCO2: (distance * consommation) / 100 * 2.3,
      vehicule: 'voiture',
      date: new Date(Date.now())
    }
    // Ajout du voyage au tableau du service
    this.carbonFootPrintComputeSrv.addVoyage(nouveauVoyage);
    this.voyages = await this.carbonFootPrintComputeSrv.getVoyages();

    // Mise à jour des informations des voyages
    this.updateResumeVoyage();
  }

  async updateResumeVoyage() {
    const resumeVoyage: ResumeVoyage = await this.carbonFootPrintComputeSrv.getResumeVoyages();
    this.distanceKm = resumeVoyage.distanceTotale;
    this.consommationPour100Km = resumeVoyage.consommationMoyenne;
    this.quantiteTotaleCO2 = resumeVoyage.quantiteCO2Totale;
  }
}
