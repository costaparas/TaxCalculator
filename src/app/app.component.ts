import { Component, OnInit } from '@angular/core';
import { trigger, animate, style, query, transition } from '@angular/animations';

import { TaxInfo } from './components/tax-form/tax-form.component';

// https://stackoverflow.com/questions/47248898/angular-4-5-6-7-simple-example-of-slide-in-out-animation-on-ngif
const slideInAnimation = [
  query(':enter', [style({ transform: 'translateX(100%)' }), animate('1s ease-out', style({ transform: 'translateX(0%)' }))], {
    optional: true,
  }),
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', slideInAnimation),
    ]),
  ]
})
export class AppComponent implements OnInit {

  taxInfo?: TaxInfo;

  ngOnInit() {

  }

  showResult(taxInfo: TaxInfo) {
    this.taxInfo = taxInfo;
  }

  reload(event: any) {
    this.taxInfo = undefined;
  }

}
