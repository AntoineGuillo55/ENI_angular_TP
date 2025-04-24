import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarbonFootprintComputeService } from '../services/carbon-footprint-compute.service';

@Component({
  selector: 'app-carbon-footprint-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './carbon-footprint-form.component.html',
  styleUrl: './carbon-footprint-form.component.scss'
})
export class CarbonFootprintFormComponent {


  listVehicules: string[] = ['voiture', 'avion', 'train'];

  voyageForm: FormGroup = new FormGroup({
    distance: new FormControl(0, [Validators.required, Validators.min(1)]),
    consommation: new FormControl(0),
    date: new FormControl(null, Validators.required),
    vehicule: new FormControl(this.listVehicules[0], Validators.required)
  });

  private carbonFootPrintComputeSrv: CarbonFootprintComputeService = inject(CarbonFootprintComputeService);

  onSubmit() {
    if (this.voyageForm.valid) {
      let qteCO2 = this.carbonFootPrintComputeSrv.calculateQuantityCO2(this.voyageForm.value.distance, this.voyageForm.value.consommation, this.voyageForm.value.vehicule);
      let consommation = 0;

      this.carbonFootPrintComputeSrv.addVoyage({
        distanceKm: this.voyageForm.value.distance,
        consommationPour100Km: consommation,
        vehicule: this.voyageForm.value.vehicule,
        quantiteCO2: qteCO2,
        date: this.voyageForm.value.date
      });
    }
  }
}
