import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TaxInfo } from '../components/tax-form/tax-form.component';

@Component({
  selector: 'app-tax-result',
  templateUrl: './tax-result.component.html',
  styleUrls: ['./tax-result.component.css']
})
export class TaxResultComponent implements OnInit {

  @Input() taxInfo: TaxInfo;
  @Output() reload = new EventEmitter<TaxInfo>();

  ngOnInit() {

  }

  back() {
    this.reload.emit();
  }

}
