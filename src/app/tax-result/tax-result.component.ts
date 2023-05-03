import { Component, OnInit } from '@angular/core';

import { TaxBracket } from '../components/tax-form/tax-form.component';

@Component({
  selector: 'app-tax-result',
  templateUrl: './tax-result.component.html',
  styleUrls: ['./tax-result.component.css']
})
export class TaxResultComponent implements OnInit {

  taxBrackets: TaxBracket[] = [
    {'low': 0, 'high': 18200, 'amount': 20},
    {'low': 18201, 'high': 45000, 'amount': 100},
    {'low': 45001, 'high': 120000, 'amount': 0},
    {'low': 120001, 'high': 180000, 'amount': 0},
    {'low': 180001, 'high': Infinity, 'amount': 0},
  ];

  ngOnInit() {

  }

  back() {
    // TODO
  }

}
