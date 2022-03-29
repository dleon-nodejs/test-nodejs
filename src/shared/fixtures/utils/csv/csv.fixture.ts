export const formattedCsvFixture = `nome,observação
Teste 1,active
Teste 2,inactive`;

export const dataListFixture = [
  {
    name: 'Teste 1',
    description: 'active',
  },
  {
    name: 'Teste 2',
    description: 'inactive',
  },
];

export const dataListUpperCaseFixture = [
  {
    name: 'TESTE 1',
    description: 'ACTIVE',
  },
  {
    name: 'TESTE 2',
    description: 'INACTIVE',
  },
];

export const headersCsvFixture = {
  name: 'nome',
  description: 'observação',
};

export const rowToUppercaseFixture = (row) => {
  const newRow = {};
  for (const key of Object.keys(row)) {
    newRow[key] = row[key].toUpperCase();
  }
  return newRow;
};

export const dataToProcessFixture = [{ row: 1 }, { row: 2 }, { row: 3 }];

export const processCsvErrorWithMessageFixture = {
  message: 'Error message',
};

export const processCsvErrorWithErrorsFixture = {
  errors: ['Error 1', 'Error 2'],
};

export const dataProcessReportFixture = [
  {
    error: null,
    line: 1,
  },
  {
    error: 'Error message',
    line: 2,
  },
  {
    error: 'Error 1, Error 2',
    line: 3,
  },
];
