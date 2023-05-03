import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaxInfo } from '../components/tax-form/tax-form.component';

@Component({
  selector: 'app-tax-input',
  templateUrl: './tax-input.component.html',
  styleUrls: ['./tax-input.component.css']
})
export class TaxInputComponent implements OnInit {

  @Output() taxInfo = new EventEmitter<TaxInfo>();

  ngOnInit() {

  }

  emitTaxInfo(taxInfo: TaxInfo) {
    this.taxInfo.emit(taxInfo);
  }

}
