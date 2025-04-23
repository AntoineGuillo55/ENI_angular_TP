import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  constructor() { }

  voyages = [
    { distanceKm: 50, consommationPour100Km: 5, quantiteCO2: 14000 },
    { distanceKm: 150, consommationPour100Km: 6, quantiteCO2: 16000 },
    { distanceKm: 250, consommationPour100Km: 7, quantiteCO2: 18000 },
    { distanceKm: 350, consommationPour100Km: 8, quantiteCO2: 20000 },
    { distanceKm: 450, consommationPour100Km: 9, quantiteCO2: 22000 }
  ]

  getVoyage() {
    return this.voyages;
  }

  calculateQuantityCO2(dist: number, conso: number) : number {
    return (dist * conso) / 100 * 2.3;
  }

  addVoyage(voyage: any) {
    this.voyages.push(voyage);
  }

  getResumeVoyages() {

    let totalDistance = 0;
    let totalConso = 0;
    let totalCO2 = 0;

    this.voyages.forEach((voyage) => {
      totalDistance += voyage.distanceKm;
      totalConso += voyage.consommationPour100Km;
      totalCO2 += voyage.quantiteCO2;
    })

    return {totalDist : totalDistance, totalCons : totalConso, totalCO2 : totalCO2}
  }
}
