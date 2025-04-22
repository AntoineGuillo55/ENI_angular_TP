import { Component } from '@angular/core';
import { CarbonFootprintFormComponent } from '../carbon-footprint-form/carbon-footprint-form.component';
import { CarbonFootprintResultComponent } from '../carbon-footprint-result/carbon-footprint-result.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintFormComponent, CarbonFootprintResultComponent, CommonModule],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.scss'
})
export class CarbonFootprintComponent {

  distanceKm: number = 100;
  consommationPour100Km: number = 8;
  consommationTotale: number = (this.distanceKm *this.consommationPour100Km)/100;

  majData() {

    let sumDistanceKm = 0;
    let sumConsommationPour100Km = 0;

    this.voyages.forEach((element) => {
      sumDistanceKm += element.distanceKm;
      sumConsommationPour100Km += element.consommationPour100Km;
    })

    this.distanceKm = sumDistanceKm;
    this.consommationPour100Km = sumConsommationPour100Km;
  }

  add100Km() {
    this.distanceKm += 100;
  }

  generateTravel() {

    this.voyages.push({
      distanceKm: Math.random() * 100,
      consommationPour100Km: Math.random() * 10})

    this.majData();
  }

  voyages = [
    { distanceKm: 50, consommationPour100Km: 5 },
    { distanceKm: 150, consommationPour100Km: 6 },
    { distanceKm: 250, consommationPour100Km: 7 },
    { distanceKm: 350, consommationPour100Km: 8 },
    { distanceKm: 450, consommationPour100Km: 9 }
]

  // ngOnChanges() {
  //   this.majData();
  // }

  ngOnInit() {
    this.majData();
  }

  // ngDoCheck() {
  //   console.log('ngDoCheck');
  // }

  // ngAfterContentInit() {
  //   console.log('ngAfterContentInit');
  // }

  // ngAfterContentChecked() {
  //   console.log('ngAfterContentChecked');
  // }

  // ngAfterViewInit() {
  //   console.log('ngAfterViewInit');
  // }

  // ngAfterViewChecked() {
  //   console.log('ngAfterViewChecked');
  // }

  // ngOnDestroy() {
  //   console.log('ngOnDestroy');
  // }
}
