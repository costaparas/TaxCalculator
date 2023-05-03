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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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
      income: new FormControl(null, Validators.min(0)),
    });
  }

  getTaxInfo(country: string, year: number, income: number): number {
    return income / 2;  // TODO: actual calculation
  }

  onSubmit() {
    const data = this.taxForm.value;
    console.log(this.getTaxInfo(data.country, data.year, data.income));
  }

}
