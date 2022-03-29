import { createFileFixture } from 'src/shared/fixtures/utils/file/file.fixture';
import { PurchaseUnit } from '../entities/purchase-unit.entity';

const formattedCsvStringFixture = `nome,variação,observarção
m²,"m2,metro quadrado",Metro quadrado
m³,,
kg,"Kg,quilo",Quilo`;

export const cretateFileCsvFixture = (props = {}) =>
  createFileFixture({
    content: Buffer.from(formattedCsvStringFixture),
    filename: 'purchase.csv',
    ...props,
  });

export const purchaseUnitsMock: PurchaseUnit[] = [
  {
    id: 1,
    name: 'm2',
    description: 'Metro quadrado',
  } as PurchaseUnit,
  {
    id: 2,
    name: 'm3',
    description: '',
  } as PurchaseUnit,
  {
    id: 3,
    name: 'kg',
    description: 'Quilo',
  } as PurchaseUnit,
];

export const logsSuccessErrorFixture = [
  {
    error: null,
    line: 1,
  },
  {
    error: 'unknow error',
    line: 2,
  },
  {
    error: null,
    line: 3,
  },
];

export const logsErrorFixture = [
  {
    error: 'unknow error',
    line: 1,
  },
  {
    error: 'unknow error',
    line: 2,
  },
  {
    error: 'unknow error',
    line: 3,
  },
];

export const logsSuccessFixture = [
  {
    error: null,
    line: 1,
  },
  {
    error: null,
    line: 2,
  },
  {
    error: null,
    line: 3,
  },
];
