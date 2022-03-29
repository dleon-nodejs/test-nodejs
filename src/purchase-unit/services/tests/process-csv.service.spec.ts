describe('@TODO', () => {
  it('@todo', () => {
    expect(1).toBe(1);
  });
});

// import {
//   logsSuccessFixture,
//   logsSuccessErrorFixture,
//   purchaseUnitsMock,
//   logsErrorFixture,
//   cretateFileCsvFixture,
// } from '@fixtures/purchase-unit/process-csv.fixture';
// import * as purchaseUnitRepository from '@repositories/purchase-unit/purchase-unit.repository';
// import { processCsvPurchaseUnit } from './process-csv.service';
// import * as updateService from './update-purchase-unit.service';
// import * as createService from './create-purchase-unit.service';

// describe('Suite csv.util', () => {
//   const findByNameMock = jest.spyOn(purchaseUnitRepository, 'findByName');
//   const updatePurchaseUnit = jest.spyOn(updateService, 'updatePurchaseUnit');
//   const createPurchaseUnit = jest.spyOn(createService, 'createPurchaseUnit');

//   beforeEach(() => {
//     findByNameMock.mockClear();
//     updatePurchaseUnit.mockClear();
//     createPurchaseUnit.mockClear();
//   });

//   describe('tests dataToCSV', () => {
//     it('should process csv and returned logs with success and fails', async () => {
//       findByNameMock.mockResolvedValueOnce(purchaseUnitsMock).mockResolvedValueOnce(purchaseUnitsMock).mockResolvedValue([]);

//       const error = new Error('unknow error');
//       updatePurchaseUnit.mockResolvedValueOnce().mockRejectedValueOnce(error);
//       createPurchaseUnit.mockResolvedValueOnce();

//       const file = cretateFileCsvFixture();
//       const logs = await processCsvPurchaseUnit(file);
//       expect(logs).toEqual(logsSuccessErrorFixture);
//     });

//     it('should process csv and returned logs with success', async () => {
//       findByNameMock.mockResolvedValueOnce(purchaseUnitsMock).mockResolvedValueOnce(purchaseUnitsMock).mockResolvedValue([]);

//       updatePurchaseUnit.mockResolvedValueOnce().mockResolvedValueOnce();
//       createPurchaseUnit.mockResolvedValueOnce();

//       const file = cretateFileCsvFixture();
//       const logs = await processCsvPurchaseUnit(file);
//       expect(logs).toEqual(logsSuccessFixture);
//     });

//     it('should process csv and returned logs with fails', async () => {
//       findByNameMock.mockResolvedValueOnce(purchaseUnitsMock).mockResolvedValueOnce(purchaseUnitsMock).mockResolvedValueOnce([]);

//       const error = new Error('unknow error');
//       updatePurchaseUnit.mockRejectedValueOnce(error).mockRejectedValueOnce(error);
//       createPurchaseUnit.mockRejectedValueOnce(error);

//       const file = cretateFileCsvFixture();
//       const logs = await processCsvPurchaseUnit(file);
//       expect(logs).toEqual(logsErrorFixture);
//     });
//   });
// });
