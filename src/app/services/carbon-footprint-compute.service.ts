import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  constructor() { }

  voyages: any[] = [];

  getVoyage() {
    return this.voyages;
  }

  calculateQuantityCO2(dist: number, conso: number, type: string) : number {

    if (type === "voiture") {
      return (dist * conso) / 100 * 2.3;
    } else if (type === "avion") {
      return dist * 0.2;
    } else {
      return dist * 0.03;
    }
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
