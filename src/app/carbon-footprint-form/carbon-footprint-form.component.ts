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
    vehicule: new FormControl(this.listVehicules[0], Validators.required)
  });

  private carbonFootPrintComputeSrv: CarbonFootprintComputeService = inject(CarbonFootprintComputeService);

  async onSubmit() {
    if (this.voyageForm.valid) {
      let qteCO2 = 0;
      let consommation = 0;

      if (this.voyageForm.value.vehicule === 'voiture') {
        qteCO2 = (this.voyageForm.value.distance * this.voyageForm.value.consommation) / 100 * 2.3
        consommation = this.voyageForm.value.consommation
      }
      else if (this.voyageForm.value.vehicule === 'train')
        qteCO2 = this.voyageForm.value.distance * 0.03;
      else
        qteCO2 = this.voyageForm.value.distance * 0.2;

      await this.carbonFootPrintComputeSrv.addVoyage({
        distanceKm: this.voyageForm.value.distance,
        consommationPour100Km: consommation,
        vehicule: this.voyageForm.value.vehicule,
        quantiteCO2: qteCO2,
        date: this.voyageForm.value.date
      });
      this.updateVoyages.emit('update');
    }
  }
}
