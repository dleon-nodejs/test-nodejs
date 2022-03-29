import { Buyer } from '@/buyer/entities/buyer.entity';
import { createFileFixture } from '@/shared/fixtures/utils/file/file.fixture';

const formattedCsvStringFixture = `nome,email,telefone
João,joao@email.com,11988885555
Maria,maria@email.com,11999992222
José,jose@email.com,11988886666`;

export const createBuyerFileCsvFixture = (props = {}) =>
  createFileFixture({
    content: Buffer.from(formattedCsvStringFixture),
    filename: 'buyer.csv',
    ...props,
  });

export const buyerListMock: Buyer[] = [
  {
    id: 1,
    name: 'João',
    email: 'joao@email.com',
    phone: '11988885555',
    status: true,
    createdAt: new Date(8, 11, 2021),
    updatedAt: new Date(8, 11, 2021),
  } as Buyer,
  {
    id: 2,
    name: 'Maria',
    email: 'maria@email.com',
    phone: '11999992222',
    status: true,
    createdAt: new Date(8, 11, 2021),
    updatedAt: new Date(8, 11, 2021),
  } as Buyer,
  {
    id: 3,
    name: 'José',
    email: 'jose@email.com',
    status: true,
    phone: '11988886666',
    createdAt: new Date(8, 11, 2021),
    updatedAt: new Date(8, 11, 2021),
  } as Buyer,
];

export const logsSuccessErrorFixture = [
  {
    error: null,
    line: 1,
  },
  {
    error: null,
    line: 2,
  },
  {
    error: 'unknown error',
    line: 3,
  },
];

export const logsErrorFixture = [
  {
    error: 'unknown error',
    line: 1,
  },
  {
    error: 'unknown error',
    line: 2,
  },
  {
    error: 'unknown error',
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
