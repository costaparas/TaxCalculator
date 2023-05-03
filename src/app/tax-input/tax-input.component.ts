import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface Country {
  value: string;
  display: string;
}

interface Year {
  value: number;
  display: string;
}

export interface TaxBracket {
  low: number;
  high: number;
  amount: number;
}

interface TaxInfo {
  taxDue: number;
  taxBrackets: Array<TaxBracket>;
}

@Component({
  selector: 'app-tax-input',
  templateUrl: './tax-input.component.html',
  styleUrls: ['./tax-input.component.css']
})
export class TaxInputComponent implements OnInit {

  taxForm: FormGroup;
  countries: Country[] = [
    {value: 'au', display: 'Australia'},
    // {value: 'nz', display: 'New Zealand'},
    // TODO: extend to more countries
  ];
  years: Year[] = [
    {value: 2023, display: '2022 - 2023'},
    // {value: 2022, display: '2021 - 2022'},
    // {value: 2021, display: '2020 - 2021'},
    // TODO: support previous years
  ];

  ngOnInit() {
    this.taxForm = new FormGroup({
      country: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      income: new FormControl(null, [Validators.required, Validators.min(0)]),
    });
  }

  getTaxInfo(country: string, year: number, income: number): TaxInfo {
    // NOTE: the country and year is ignored for now
    const taxBrackets = [];
    for (const {low, high, rate} of [
      {'low': 0, 'high': 18200, 'rate': 0},
      {'low': 18201, 'high': 45000, 'rate': 0.19},
      {'low': 45001, 'high': 120000, 'rate': 0.325},
      {'low': 120001, 'high': 180000, 'rate': 0.37},
      {'low': 180001, 'high': Infinity, 'rate': 0.45},
    ]) {
      taxBrackets.push(
        {'low': low, 'high': high, 'amount': this.calculateTaxBracket(income, low, high, rate)}
      );
    }
    const taxDue = taxBrackets.reduce((acc, current) => acc + current['amount'], 0);
    return {'taxDue': taxDue, 'taxBrackets': taxBrackets};
  }

  calculateTaxBracket(income: number, low: number, high: number, rate: number): number {
    if (income >= low) {
      return Math.round(rate * (Math.min(income, high) - low));
    } else {
      return 0;
    }
  }

  onSubmit() {
    const data = this.taxForm.value;
    console.log(this.getTaxInfo(data.country, data.year, data.income));
  }

}
