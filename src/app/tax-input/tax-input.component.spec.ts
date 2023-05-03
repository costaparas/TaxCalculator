import { TaxInputComponent } from './tax-input.component';

describe('TaxInputComponent', () => {

  it('no income', () => {
    const comp = new TaxInputComponent();
    expect(comp.getTaxInfo('au', 2023, 0)).toEqual({
      'taxDue': 0,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 0},
        {'low': 45001, 'high': 120000, 'amount': 0},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
    });
  });

  it('tax bracket 1', () => {
    const comp = new TaxInputComponent();
    expect(comp.getTaxInfo('au', 2023, 7500)).toEqual({
      'taxDue': 0,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 0},
        {'low': 45001, 'high': 120000, 'amount': 0},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
    });
  });

  it('tax bracket 2', () => {
    const comp = new TaxInputComponent();
    expect(comp.getTaxInfo('au', 2023, 40000)).toEqual({
      'taxDue': 4142,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 4142},
        {'low': 45001, 'high': 120000, 'amount': 0},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
    });
  });

  it('tax bracket 3', () => {
    const comp = new TaxInputComponent();
    expect(comp.getTaxInfo('au', 2023, 70000)).toEqual({
      'taxDue': 13217,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 8125},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
    });
  });

  it('boundary case 1', () => {
    const comp = new TaxInputComponent();
    expect(comp.getTaxInfo('au', 2023, 120000)).toEqual({
      'taxDue': 29467,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 24375},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
    });
  });

  it('boundary case 2', () => {
    const comp = new TaxInputComponent();
    expect(comp.getTaxInfo('au', 2023, 120001)).toEqual({
      'taxDue': 29467,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 24375},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
    });
  });

  it('tax bracket 4', () => {
    const comp = new TaxInputComponent();
    expect(comp.getTaxInfo('au', 2023, 135000)).toEqual({
      'taxDue': 35017,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 24375},
        {'low': 120001, 'high': 180000, 'amount': 5550},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
    });
  });

  it('tax bracket 5', () => {
    const comp = new TaxInputComponent();
    expect(comp.getTaxInfo('au', 2023, 195000)).toEqual({
      'taxDue': 58417,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 24375},
        {'low': 120001, 'high': 180000, 'amount': 22200},
        {'low': 180001, 'high': Infinity, 'amount': 6750},
      ],
    });
  });

});
