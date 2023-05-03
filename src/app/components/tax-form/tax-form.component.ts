import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

export interface TaxInfo {
  taxDue: number;
  taxBrackets: Array<TaxBracket>;
  country: string;
}

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.css']
})
export class TaxFormComponent implements OnInit {

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

  @Input() disabled: boolean;
  @Output() taxInfo = new EventEmitter<TaxInfo>();

  ngOnInit() {
    this.taxForm = new FormGroup({
      country: this.disabled ? new FormControl({'value': 'au', 'disabled': true}) : new FormControl(null, Validators.required),
      year: this.disabled ? new FormControl({'value': 2023, 'disabled': true}) : new FormControl(null, Validators.required),
      income: this.disabled ? new FormControl({'value': 70000, 'disabled': true}) : new FormControl(null, [Validators.required, Validators.min(0)]),
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
    return {'taxDue': taxDue, 'taxBrackets': taxBrackets, 'country': country};
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
    this.taxInfo.emit(this.getTaxInfo(data.country, data.year, data.income));
    console.log("aaa");
  }

}
