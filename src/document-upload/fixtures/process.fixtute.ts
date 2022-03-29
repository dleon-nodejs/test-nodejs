import { S3EventRecord } from 'aws-lambda';

export const purchaseUnitRecordFixture = {
  s3: {
    bucket: {
      name: '',
    },
    object: {
      key: 'purchaseUnit/table.csv',
    },
  },
} as S3EventRecord;

export const createReportCallFixture = (props = {}) => ({
  fileName: 'table.csv',
  logs: [],
  ...props,
});

export const logsWithSuccessFixture = [
  {
    line: 1,
    error: null,
  },
  {
    line: 2,
    error: null,
  },
];

export const logsWithSuccessAndErrorFixture = [
  {
    line: 1,
    error: null,
  },
  {
    line: 2,
    error: 'Error',
  },
];

export const logsWithErrorFixture = [
  {
    line: 1,
    error: 'Error',
  },
  {
    line: 2,
    error: 'Error',
  },
];
