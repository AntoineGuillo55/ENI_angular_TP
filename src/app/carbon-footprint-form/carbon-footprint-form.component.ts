import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarbonFootprintComputeService } from '../services/carbon-footprint-compute.service';

@Component({
  selector: 'app-carbon-footprint-form',
  imports: [ReactiveFormsModule],
  templateUrl: './carbon-footprint-form.component.html',
  styleUrl: './carbon-footprint-form.component.scss'
})
export class CarbonFootprintFormComponent {

  listVehicules: string[] = ['voiture', 'avion', 'train'];
  @Output()
  updateVoyages = new EventEmitter();

  voyageForm: FormGroup = new FormGroup({
    distance: new FormControl(0, [Validators.required, Validators.min(1)]),
    consommation: new FormControl(0),
    date: new FormControl(null, Validators.required),
    vehicule: new FormControl(this.listVehicules[0], Validators.required),
    carburant: new FormControl('', Validators.required)
  });

  private carbonFootPrintComputeSrv: CarbonFootprintComputeService = inject(CarbonFootprintComputeService);

  onSubmit() {
    if (this.voyageForm.valid) {
      let qteCO2 = 0;
      let consommation = 0;
      const vehicule = this.voyageForm.value.vehicule;
      const distance = this.voyageForm.value.distance;
      const carburant = this.voyageForm.value.carburant;

      if (vehicule === 'voiture') {
        consommation = this.voyageForm.value.consommation
      }

      this.carbonFootPrintComputeSrv.calculerTrajet(vehicule, distance, consommation, carburant).subscribe({
        next: async (result: any) => {
          qteCO2 = result.empreinteCarbone;
          await this.carbonFootPrintComputeSrv.addVoyage({
            distanceKm: distance,
            consommationPour100Km: consommation,
            vehicule: vehicule,
            quantiteCO2: qteCO2,
            date: this.voyageForm.value.date
          });
          this.updateVoyages.emit('update');

        }, error: (err) => console.log(err)
      });
    }
  }
}
