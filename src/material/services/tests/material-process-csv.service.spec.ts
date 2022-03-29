const getOneByKeyMaterialMock = jest.fn();
const updateMaterialMock = jest.fn();
const createMaterialMock = jest.fn();
const getOneByKeyCategoryMock = jest.fn();
const getOneByKeyBuyerMock = jest.fn();
const getOneByKeyPurchaseUnitMock = jest.fn();
const getOneByKeyProductionPhaseMock = jest.fn();
const listCsvMaterialMock = jest.fn();

jest.mock('../material.service.ts', () => {
  return {
    MaterialService: function () {
      return {
        getOneByKey: getOneByKeyMaterialMock,
        update: updateMaterialMock,
        create: createMaterialMock,
        listCsv: listCsvMaterialMock,
      };
    },
  };
});

jest.mock('../../../buyer/services/buyer.service.ts', () => {
  return {
    BuyerService: function () {
      return {
        getOneByKey: getOneByKeyBuyerMock,
      };
    },
  };
});

jest.mock('../../../category/services/category.service.ts', () => {
  return {
    CategoryService: function () {
      return {
        getOneByKey: getOneByKeyCategoryMock,
      };
    },
  };
});

jest.mock('../../../purchase-unit/services/purchase-unit.service.ts', () => {
  return {
    PurchaseUnitService: function () {
      return {
        getOneByKey: getOneByKeyPurchaseUnitMock,
      };
    },
  };
});

jest.mock('../../../production-phase/services/production-phase.service.ts', () => {
  return {
    ProductionPhaseService: function () {
      return {
        getOneByKey: getOneByKeyProductionPhaseMock,
      };
    },
  };
});

import {
  categoryListMaterialFixture,
  createMaterialFileCsvFixture,
  formattedCsvStringFixture,
  materialListCsvFixture,
  materialListFormattedFixture,
  materialListPriceChangedCsvFixture,
  purchaseUnitListMaterialFixture,
  successErrorCategoryNotExistsLogFixture,
  successErrorPurchaseUnitNotExistsLogFixture,
  successLogFixture,
} from '@/material/fixtures/process-csv.fixture';
import { createFileFixture } from '@/shared/fixtures/utils/file/file.fixture';
import { MaterialProcessService } from '../material-process-csv.service';
// import * as csvUtil from '@/shared/utils/csv/csv.util';

describe('Suite Material Process Service', () => {
  // const dataToCSVMock = jest.spyOn(csvUtil, 'dataToCSV');

  beforeEach(() => {
    getOneByKeyMaterialMock.mockClear();
    updateMaterialMock.mockClear();
    createMaterialMock.mockClear();
    getOneByKeyCategoryMock.mockClear();
    getOneByKeyBuyerMock.mockClear();
    getOneByKeyPurchaseUnitMock.mockClear();
    getOneByKeyProductionPhaseMock.mockClear();
  });
  describe('test processCsvFile', () => {
    describe('success', () => {
      it('should process a valid csv and update items', async () => {
        const process = new MaterialProcessService();
        getOneByKeyCategoryMock.mockResolvedValueOnce(categoryListMaterialFixture[0]).mockResolvedValueOnce(categoryListMaterialFixture[1]);
        getOneByKeyPurchaseUnitMock
          .mockResolvedValueOnce(purchaseUnitListMaterialFixture[0])
          .mockResolvedValueOnce(purchaseUnitListMaterialFixture[1]);
        getOneByKeyMaterialMock.mockResolvedValueOnce(materialListFormattedFixture[0]).mockResolvedValueOnce(materialListFormattedFixture[1]);

        updateMaterialMock.mockResolvedValueOnce(undefined).mockResolvedValueOnce(undefined);

        const file = createMaterialFileCsvFixture();
        const logs = await process.processCsvFile(file);
        expect(logs).toEqual(successLogFixture);
      });

      it('should process a valid csv and update items changing the prices', async () => {
        const process = new MaterialProcessService();
        getOneByKeyCategoryMock.mockResolvedValueOnce(categoryListMaterialFixture[0]).mockResolvedValueOnce(categoryListMaterialFixture[1]);
        getOneByKeyPurchaseUnitMock
          .mockResolvedValueOnce(purchaseUnitListMaterialFixture[0])
          .mockResolvedValueOnce(purchaseUnitListMaterialFixture[1]);
        getOneByKeyMaterialMock
          .mockResolvedValueOnce(materialListPriceChangedCsvFixture[0])
          .mockResolvedValueOnce(materialListPriceChangedCsvFixture[1]);

        updateMaterialMock.mockResolvedValueOnce(undefined).mockResolvedValueOnce(undefined);

        const file = createMaterialFileCsvFixture();
        const logs = await process.processCsvFile(file);
        expect(logs).toEqual(successLogFixture);
      });

      it('should process a valid csv create and update items', async () => {
        const process = new MaterialProcessService();
        getOneByKeyCategoryMock.mockResolvedValueOnce(categoryListMaterialFixture[0]).mockResolvedValueOnce(categoryListMaterialFixture[1]);
        getOneByKeyPurchaseUnitMock
          .mockResolvedValueOnce(purchaseUnitListMaterialFixture[0])
          .mockResolvedValueOnce(purchaseUnitListMaterialFixture[1]);
        getOneByKeyMaterialMock.mockResolvedValueOnce(materialListFormattedFixture[0]).mockResolvedValueOnce(undefined);
        updateMaterialMock.mockResolvedValueOnce(undefined);
        createMaterialMock.mockResolvedValueOnce(undefined);

        const file = createMaterialFileCsvFixture();
        const logs = await process.processCsvFile(file);
        expect(logs).toEqual(successLogFixture);
      });

      it('should process a csv and log purchase unit not exists error', async () => {
        const process = new MaterialProcessService();
        getOneByKeyCategoryMock.mockResolvedValueOnce(categoryListMaterialFixture[0]).mockResolvedValueOnce(categoryListMaterialFixture[1]);
        getOneByKeyPurchaseUnitMock.mockResolvedValueOnce(undefined).mockResolvedValueOnce(purchaseUnitListMaterialFixture[1]);
        getOneByKeyMaterialMock.mockResolvedValueOnce(undefined);
        createMaterialMock.mockResolvedValueOnce(undefined);

        const file = createMaterialFileCsvFixture();
        const logs = await process.processCsvFile(file);
        expect(logs).toEqual(successErrorPurchaseUnitNotExistsLogFixture);
        expect(updateMaterialMock).not.toHaveBeenCalled();
      });

      it('should process a csv and log category not exists error', async () => {
        const process = new MaterialProcessService();
        getOneByKeyCategoryMock.mockResolvedValueOnce(undefined).mockResolvedValueOnce(categoryListMaterialFixture[1]);
        getOneByKeyPurchaseUnitMock
          .mockResolvedValueOnce(purchaseUnitListMaterialFixture[0])
          .mockResolvedValueOnce(purchaseUnitListMaterialFixture[1]);
        getOneByKeyMaterialMock.mockResolvedValueOnce(undefined);
        updateMaterialMock.mockResolvedValueOnce(undefined);
        createMaterialMock.mockResolvedValueOnce(undefined);

        const file = createMaterialFileCsvFixture();
        const logs = await process.processCsvFile(file);
        expect(logs).toEqual(successErrorCategoryNotExistsLogFixture);
        expect(updateMaterialMock).not.toHaveBeenCalled();
      });
    });
  });

  describe('test getCsvFile', () => {
    describe('success', () => {
      it('should successfully buffer csv', async () => {
        const process = new MaterialProcessService();
        listCsvMaterialMock.mockResolvedValue(materialListCsvFixture);

        const data = await process.getCsvFile();
        const file = createFileFixture({
          content: Buffer.from(formattedCsvStringFixture),
        });
        expect(listCsvMaterialMock).toHaveBeenCalled();
        expect(data).toEqual(file.content);
      });
    });
  });
});
