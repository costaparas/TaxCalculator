import { Component, OnInit } from '@angular/core';

import { TaxInfo } from './components/tax-form/tax-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
