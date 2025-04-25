import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CarbonFootprintComponent } from '../carbon-footprint/carbon-footprint.component';

@Component({
  selector: 'app-summary',
  imports: [HeaderComponent, CarbonFootprintComponent, FooterComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

}
