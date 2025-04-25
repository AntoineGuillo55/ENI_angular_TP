import { Injectable } from '@angular/core';
import { ResumeVoyage } from '../models/resume-voyage';
import { Voyage } from '../models/voyage';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private voyages: Voyage[] = [
    { distanceKm: 50, consommationPour100Km: 5, quantiteCO2: 0, vehicule: 'voiture', date: new Date(Date.now()) },
    { distanceKm: 150, consommationPour100Km: 6, quantiteCO2: 0, vehicule: 'voiture', date: new Date(Date.now()) },
    { distanceKm: 250, consommationPour100Km: 7, quantiteCO2: 0, vehicule: 'voiture', date: new Date(Date.now()) },
    { distanceKm: 350, consommationPour100Km: 8, quantiteCO2: 0, vehicule: 'voiture', date: new Date(Date.now()) },
    { distanceKm: 450, consommationPour100Km: 9, quantiteCO2: 0, vehicule: 'voiture', date: new Date(Date.now()) }
  ];

  constructor() {
    for (let voyage of this.voyages) {
      voyage.quantiteCO2 = (voyage.distanceKm * voyage.consommationPour100Km) / 100 * 2.3;
    }
  }

  getVoyages(): Promise<Voyage[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.voyages);
      }, 4500);
    })
  }

  async addVoyage(voyage: Voyage) {
    if (voyage)
      this.voyages.push(voyage);
  }

  async getResumeVoyages(): Promise<ResumeVoyage> {
    let distance = 0;
    let consommation = 0;
    let CO2 = 0;

    for (const voyage of this.voyages) {
      distance += voyage.distanceKm;
      consommation += voyage.consommationPour100Km;
      CO2 += voyage.quantiteCO2;
    }
    consommation /= this.voyages.length;

    return {
      distanceTotale: distance,
      consommationMoyenne: consommation,
      quantiteCO2Totale: CO2
    }
  }
}
