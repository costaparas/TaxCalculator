import { TestBed } from '@angular/core/testing';
import { TaxInputComponent } from './tax-input.component';

describe('TaxInputComponent', () => {

  it('should show image', () => {
    const fixture = TestBed.createComponent(TaxInputComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img').src).toContain('https://cdn.shopify.com');
  });

  it('should show heading', () => {
    const fixture = TestBed.createComponent(TaxInputComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Calculate your income tax');
  });

});
