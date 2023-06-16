import { TaxFormComponent } from './tax-form.component';

describe('TaxFormComponent', () => {

  it('no income', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 0, true)).toEqual({
      'taxDue': 0,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 0},
        {'low': 45001, 'high': 120000, 'amount': 0},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 0, 'rate': 0},
      'medicareLevySurcharge': {'amount': 0, 'rate': 0},
      'input': {'country': 'au', 'year': 2023, 'income': 0, 'privateHealth': true}
    });
  });

  it('tax bracket 1', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 7500, true)).toEqual({
      'taxDue': 0,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 0},
        {'low': 45001, 'high': 120000, 'amount': 0},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 0, 'rate': 0},
      'medicareLevySurcharge': {'amount': 0, 'rate': 0},
      'input': {'country': 'au', 'year': 2023, 'income': 7500, 'privateHealth': true}
    });
  });

  it('medicare boundary 1', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 24276, true)).toEqual({
      'taxDue': 1154,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 1154},
        {'low': 45001, 'high': 120000, 'amount': 0},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 0, 'rate': 0},
      'medicareLevySurcharge': {'amount': 0, 'rate': 0},
      'input': {'country': 'au', 'year': 2023, 'income': 24276, 'privateHealth': true}
    });
  });

  it('medicare boundary 2', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 24277, true)).toEqual({
      'taxDue': 1639.54,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 1154},
        {'low': 45001, 'high': 120000, 'amount': 0},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 485.54, 'rate': 2},
      'medicareLevySurcharge': {'amount': 0, 'rate': 0},
      'input': {'country': 'au', 'year': 2023, 'income': 24277, 'privateHealth': true}
    });
  });

  it('tax bracket 2', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 40000, true)).toEqual({
      'taxDue': 4942,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 4142},
        {'low': 45001, 'high': 120000, 'amount': 0},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 800, 'rate': 2},
      'medicareLevySurcharge': {'amount': 0, 'rate': 0},
      'input': {'country': 'au', 'year': 2023, 'income': 40000, 'privateHealth': true}
    });
  });

  it('tax bracket 3', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 70000, true)).toEqual({
      'taxDue': 14617,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 8125},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 1400, 'rate': 2},
      'medicareLevySurcharge': {'amount': 0, 'rate': 0},
      'input': {'country': 'au', 'year': 2023, 'income': 70000, 'privateHealth': true}
    });
  });

  it('medicare levy surcharge bracket 1', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 105000, false)).toEqual({
      'taxDue': 27742,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 19500},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 2100, 'rate': 2},
      'medicareLevySurcharge': {'amount': 1050, 'rate': 1},
      'input': {'country': 'au', 'year': 2023, 'income': 105000, 'privateHealth': false}
    });
  });

  it('boundary case 1', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 120000, true)).toEqual({
      'taxDue': 31867,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 24375},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 2400, 'rate': 2},
      'medicareLevySurcharge': {'amount': 0, 'rate': 0},
      'input': {'country': 'au', 'year': 2023, 'income': 120000, 'privateHealth': true}
    });
  });

  it('boundary case 2', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 120001, true)).toEqual({
      'taxDue': 31867.02,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 24375},
        {'low': 120001, 'high': 180000, 'amount': 0},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 2400.02, 'rate': 2},
      'medicareLevySurcharge': {'amount': 0, 'rate': 0},
      'input': {'country': 'au', 'year': 2023, 'income': 120001, 'privateHealth': true}
    });
  });

  it('tax bracket 4', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 135000, true)).toEqual({
      'taxDue': 37717,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 24375},
        {'low': 120001, 'high': 180000, 'amount': 5550},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 2700, 'rate': 2},
      'medicareLevySurcharge': {'amount': 0, 'rate': 0},
      'input': {'country': 'au', 'year': 2023, 'income': 135000, 'privateHealth': true}
    });
  });

  it('medicare levy surcharge bracket 2', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 140000, false)).toEqual({
      'taxDue': 41417,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 24375},
        {'low': 120001, 'high': 180000, 'amount': 7400},
        {'low': 180001, 'high': Infinity, 'amount': 0},
      ],
      'medicareLevyBase': {'amount': 2800, 'rate': 2},
      'medicareLevySurcharge': {'amount': 1750, 'rate': 1.25},
      'input': {'country': 'au', 'year': 2023, 'income': 140000, 'privateHealth': false}
    });
  });

  it('tax bracket 5', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 195000, true)).toEqual({
      'taxDue': 62317,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 24375},
        {'low': 120001, 'high': 180000, 'amount': 22200},
        {'low': 180001, 'high': Infinity, 'amount': 6750},
      ],
      'medicareLevyBase': {'amount': 3900, 'rate': 2},
      'medicareLevySurcharge': {'amount': 0, 'rate': 0},
      'input': {'country': 'au', 'year': 2023, 'income': 195000, 'privateHealth': true}
    });
  });

  it('medicare levy surcharge bracket 3', () => {
    const comp = new TaxFormComponent();
    expect(comp.getTaxInfo('au', 2023, 195000, false)).toEqual({
      'taxDue': 65242,
      'taxBrackets': [
        {'low': 0, 'high': 18200, 'amount': 0},
        {'low': 18201, 'high': 45000, 'amount': 5092},
        {'low': 45001, 'high': 120000, 'amount': 24375},
        {'low': 120001, 'high': 180000, 'amount': 22200},
        {'low': 180001, 'high': Infinity, 'amount': 6750},
      ],
      'medicareLevyBase': {'amount': 3900, 'rate': 2},
      'medicareLevySurcharge': {'amount': 2925, 'rate': 1.5},
      'input': {'country': 'au', 'year': 2023, 'income': 195000, 'privateHealth': false}
    });
  });

});
