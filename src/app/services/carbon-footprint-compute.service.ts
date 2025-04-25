import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResumeVoyage } from '../models/resume-voyage';
import { Voyage } from '../models/voyage';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private http: HttpClient = inject(HttpClient);

  private voyages: Voyage[] = [
    { distanceKm: 50, consommationPour100Km: 5, quantiteCO2: 0, vehicule: 'voiture', date: new Date(Date.now()) },
    { distanceKm: 150, consommationPour100Km: 6, quantiteCO2: 0, vehicule: 'voiture', date: new Date(Date.now()) },
    { distanceKm: 250, consommationPour100Km: 7, quantiteCO2: 0, vehicule: 'voiture', date: new Date(Date.now()) },
    { distanceKm: 350, consommationPour100Km: 8, quantiteCO2: 0, vehicule: 'voiture', date: new Date(Date.now()) },
    { distanceKm: 450, consommationPour100Km: 9, quantiteCO2: 0, vehicule: 'voiture', date: new Date(Date.now()) }
  ];
  urlServer: string = 'http://localhost:8080';


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
    if (voyage) {
      this.voyages.push(voyage);
      this.addCarbonFootprint(1, voyage.quantiteCO2);
    }
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

  getCarbonFootprint(id: number = 1) {
    return this.http.get(this.urlServer + '/monEmpreinteCarbone', { params: { idUtilisateur: id }});
  }

  addCarbonFootprint(id: number = 1, co2: number) {
    this.http.put(this.urlServer + '/ajouterEmpreinteCarbone', { idUtilisateur: id, empreinteCarbone: co2 }).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  calculerTrajet(vehicule: string, distanceKm: number, consommation: number = 0, typeCarburant: string = '') {
    let extendedUrl = '';

    if (vehicule === 'voiture') {
      extendedUrl = 'Voiture';
    } else if (vehicule === 'train') {
      extendedUrl = 'Train';
    } else {
      extendedUrl = 'Avion';
    }
    return this.http.get(this.urlServer + '/calculerTrajet' + extendedUrl, { params: { distanceKm: distanceKm, typeCarburant: typeCarburant, consommationPour100Km: consommation }});
  }

  removeCarbonFootprint(id: number = 1, co2: number) {
    this.http.put(this.urlServer + '/retirerEmpreinteCarbone', { idUtilisateur: id, empreinteCarbone: co2 }).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  deleteCarbonFootprint(id: number = 1) {
    this.http.post(this.urlServer + '/supprimerEmpreinteCarbone', { idUtilisateur: id }).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
      complete: () => {}
    });
  }
}
