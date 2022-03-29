const findByRepositoryMock = jest.fn();
const changePriceRepositoryMock = jest.fn();
const listMaterialPaginatedFilterMock = jest.fn();
const createMaterialRepositoryMock = jest.fn();
const updateMaterialRepositoryMock = jest.fn();
const getByIdCategoryMock = jest.fn();
const getByIdBuyerMock = jest.fn();
const getByIdPurchaseUnitMock = jest.fn();
const getByIdProductionPhaseMock = jest.fn();
const findAllWithRelationsMock = jest.fn();

jest.mock('./../../repositories/material.repository', () => {
  return {
    MaterialRepository: function () {
      return {
        findById: findByRepositoryMock,
        changePrice: changePriceRepositoryMock,
        findPaginated: listMaterialPaginatedFilterMock,
        create: createMaterialRepositoryMock,
        update: updateMaterialRepositoryMock,
        findAllWithRelations: findAllWithRelationsMock,
      };
    },
  };
});

jest.mock('../../../buyer/services/buyer.service.ts', () => {
  return {
    BuyerService: function () {
      return {
        getById: getByIdBuyerMock,
      };
    },
  };
});

jest.mock('../../../category/services/category.service.ts', () => {
  return {
    CategoryService: function () {
      return {
        getById: getByIdCategoryMock,
      };
    },
  };
});

jest.mock('../../../purchase-unit/services/purchase-unit.service.ts', () => {
  return {
    PurchaseUnitService: function () {
      return {
        getById: getByIdPurchaseUnitMock,
      };
    },
  };
});

jest.mock('../../../production-phase/services/production-phase.service.ts', () => {
  return {
    ProductionPhaseService: function () {
      return {
        getById: getByIdProductionPhaseMock,
      };
    },
  };
});

import { ERR_BUYER_INACTIVE } from '@/buyer/config/buyer.config';
import { ERR_CATEGORY_INACTIVE } from '@/category/config/category.config';
import { materialListCsvFixture } from '@/material/fixtures/process-csv.fixture';
import {
  materailListPaginatedFixture,
  materialParamsDtoFixture,
  materialListFilterFixture,
  materialParamsEmailFixture,
  materialParamsNameFixture,
  materialParamsCodeFixture,
  materialParamsPagesAboveFixture,
  materailListPageAboveFixture,
  materailListPaginatedAboveFixture,
} from '@/material/fixtures/list-material.fixture';
import {
  buyerMaterialFixture,
  buyerMaterialInactiveFixture,
  categoryMaterialFixture,
  categoryMaterialInactiveFixture,
  materialRegisterId,
  materialRegisterItemFixture,
  materialRegisterInvalidId,
  materialRegisterWithoutBuyerItemFixture,
  purchaseUnitMaterialFixture,
  purchaseUnitMaterialInactiveFixture,
  productionPhaseMaterialFixture,
  materialRegisterItemCsvFixture,
  productionPhaseMaterialInactiveFixture,
  materialCsvFixture,
} from '@/material/fixtures/material.fixture';
import {
  invalidMaterialIdFixture,
  materialFormattedItemFixture,
  materialIdFixture,
  materialItemFixture,
  materialPriceFixture,
} from '@/material/fixtures/process-csv.fixture';
import { MaterialService } from '@/material/services/material.service';
import { ERR_PRODUCTION_PHASE_INACTIVE } from '@/production-phase/config/production-phase.error';
import { ERR_PURCHASE_UNIT_INACTIVE } from '@/purchase-unit/config/purchase-unit.config';
import { ERR_INVALID_ID } from '@/shared/errors/app.error';
import createHttpError from 'http-errors';

describe('Suite Material Service', () => {
  beforeEach(() => {
    findByRepositoryMock.mockClear();
    changePriceRepositoryMock.mockClear();
    listMaterialPaginatedFilterMock.mockClear();
    createMaterialRepositoryMock.mockClear();
    updateMaterialRepositoryMock.mockClear();
    getByIdCategoryMock.mockClear();
    getByIdBuyerMock.mockClear();
    getByIdPurchaseUnitMock.mockClear();
    getByIdProductionPhaseMock.mockClear();
    findAllWithRelationsMock.mockClear();
  });
  it('should defined service ', () => {
    const service = new MaterialService();
    expect(service).toBeDefined();
  });
  describe('test changePrice', () => {
    describe('success', () => {
      it('should call changePrice from repository', async () => {
        const service = new MaterialService();
        expect(service).toBeDefined();

        await service.changePrice(materialIdFixture, materialPriceFixture);
        changePriceRepositoryMock.mockResolvedValue(undefined);
        expect(changePriceRepositoryMock).toHaveBeenCalledTimes(1);
      });
    });
    describe('fails', () => {
      it('should throw ERR_INVALID_ID if id is invalid', async () => {
        const error = createHttpError(ERR_INVALID_ID);
        const service = new MaterialService();
        changePriceRepositoryMock.mockRejectedValue(error);
        expect(service).toBeDefined();
        await expect(async () => service.changePrice(invalidMaterialIdFixture, materialPriceFixture)).rejects.toEqual(error);
        expect(changePriceRepositoryMock).not.toHaveBeenCalled();
      });
    });
  });

  describe('test getById', () => {
    describe('success', () => {
      it('should called adapter method ', async () => {
        const service = new MaterialService();
        expect(service).toBeDefined();

        findByRepositoryMock.mockResolvedValue(materialItemFixture);
        const result = await service.getById(1);
        expect(result).toEqual(materialFormattedItemFixture);
      });
    });
  });

  describe('test findPaginatedParams', () => {
    describe('success', () => {
      it('should called list material paginated and full filter ', async () => {
        const service = new MaterialService();
        expect(service).toBeDefined();

        listMaterialPaginatedFilterMock.mockResolvedValue([materialListFilterFixture, 1]);
        const result = await service.findPaginatedParams(materialParamsDtoFixture);
        expect(result).toEqual(materailListPaginatedFixture);
      });

      it('should called the paged material list and email only filter ', async () => {
        const service = new MaterialService();
        expect(service).toBeDefined();

        listMaterialPaginatedFilterMock.mockResolvedValue([materialListFilterFixture, 1]);
        const result = await service.findPaginatedParams(materialParamsEmailFixture);
        expect(result).toEqual(materailListPaginatedFixture);
      });

      it('should called the paged material list and name only filter ', async () => {
        const service = new MaterialService();
        expect(service).toBeDefined();

        listMaterialPaginatedFilterMock.mockResolvedValue([materialListFilterFixture, 1]);
        const result = await service.findPaginatedParams(materialParamsNameFixture);
        expect(result).toEqual(materailListPaginatedFixture);
      });

      it('should called the paged material list and codigo only filter ', async () => {
        const service = new MaterialService();
        expect(service).toBeDefined();

        listMaterialPaginatedFilterMock.mockResolvedValue([materialListFilterFixture, 1]);
        const result = await service.findPaginatedParams(materialParamsCodeFixture);
        expect(result).toEqual(materailListPaginatedFixture);
      });

      it('should called the material list with the pages above the returned', async () => {
        const service = new MaterialService();
        expect(service).toBeDefined();

        listMaterialPaginatedFilterMock.mockResolvedValue([materailListPageAboveFixture, 1]);
        const result = await service.findPaginatedParams(materialParamsPagesAboveFixture);
        expect(result).toEqual(materailListPaginatedAboveFixture);
      });
    });
  });

  describe('test update', () => {
    describe('success', () => {
      it('should update an existent material via csv upload', async () => {
        const service = new MaterialService();

        getByIdCategoryMock.mockResolvedValue(categoryMaterialFixture);
        getByIdBuyerMock.mockResolvedValue(buyerMaterialFixture);
        getByIdPurchaseUnitMock.mockResolvedValue(purchaseUnitMaterialFixture);
        getByIdProductionPhaseMock.mockResolvedValue(productionPhaseMaterialFixture);

        await service.update(materialRegisterItemCsvFixture, materialRegisterId);
        updateMaterialRepositoryMock.mockResolvedValue(undefined);
        expect(updateMaterialRepositoryMock).toHaveBeenCalledTimes(1);
      });
    });
    describe('fails', () => {
      it('should throw ERR_INVALID_ID if id is invalid', async () => {
        const service = new MaterialService();
        const error = createHttpError(ERR_INVALID_ID);
        await expect(async () => service.update(materialRegisterItemFixture, materialRegisterInvalidId)).rejects.toEqual(error);
      });
    });
  });
  describe('test validateComponents', () => {
    describe('success', () => {
      it('should successfully validate all components and create new material', async () => {
        const service = new MaterialService();

        getByIdCategoryMock.mockResolvedValue(categoryMaterialFixture);
        getByIdBuyerMock.mockResolvedValue(buyerMaterialFixture);
        getByIdPurchaseUnitMock.mockResolvedValue(purchaseUnitMaterialFixture);
        getByIdProductionPhaseMock.mockResolvedValue(productionPhaseMaterialFixture);
        getByIdProductionPhaseMock.mockResolvedValue(productionPhaseMaterialFixture);

        await service.create(materialRegisterItemFixture);
        createMaterialRepositoryMock.mockResolvedValue(undefined);
        expect(createMaterialRepositoryMock).toHaveBeenCalledTimes(1);
      });

      it('should successfully validate category and purchase unit and create a new material', async () => {
        const service = new MaterialService();

        getByIdCategoryMock.mockResolvedValue(categoryMaterialFixture);
        getByIdBuyerMock.mockResolvedValue(undefined);
        getByIdPurchaseUnitMock.mockResolvedValue(purchaseUnitMaterialFixture);
        getByIdProductionPhaseMock.mockResolvedValue(productionPhaseMaterialFixture);

        await service.create(materialRegisterWithoutBuyerItemFixture);
        createMaterialRepositoryMock.mockResolvedValue(undefined);
        expect(createMaterialRepositoryMock).toHaveBeenCalledTimes(1);
      });

      it('should successfully validate all components and update an existent material', async () => {
        const service = new MaterialService();

        getByIdCategoryMock.mockResolvedValue(categoryMaterialFixture);
        getByIdBuyerMock.mockResolvedValue(buyerMaterialFixture);
        getByIdPurchaseUnitMock.mockResolvedValue(purchaseUnitMaterialFixture);
        getByIdProductionPhaseMock.mockResolvedValue(productionPhaseMaterialFixture);

        await service.update(materialRegisterItemFixture, materialRegisterId);
        updateMaterialRepositoryMock.mockResolvedValue(undefined);
        expect(updateMaterialRepositoryMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('fails', () => {
      it('should throw ERR_CATEGORY_INACTIVE', async () => {
        const service = new MaterialService();

        const error = createHttpError(ERR_CATEGORY_INACTIVE);

        getByIdCategoryMock.mockResolvedValue(categoryMaterialInactiveFixture);
        getByIdBuyerMock.mockResolvedValue(buyerMaterialFixture);
        getByIdPurchaseUnitMock.mockResolvedValue(purchaseUnitMaterialFixture);
        getByIdProductionPhaseMock.mockResolvedValue(productionPhaseMaterialFixture);

        await expect(async () => service.create(materialRegisterItemFixture)).rejects.toEqual(error);
      });

      it('should throw ERR_BUYER_INACTIVE', async () => {
        const service = new MaterialService();

        const error = createHttpError(ERR_BUYER_INACTIVE);

        getByIdCategoryMock.mockResolvedValue(categoryMaterialFixture);
        getByIdBuyerMock.mockResolvedValue(buyerMaterialInactiveFixture);
        getByIdPurchaseUnitMock.mockResolvedValue(purchaseUnitMaterialFixture);
        getByIdProductionPhaseMock.mockResolvedValue(productionPhaseMaterialFixture);

        await expect(async () => service.create(materialRegisterItemFixture)).rejects.toEqual(error);
      });

      it('should throw ERR_PURCHASE_UNIT_INACTIVE', async () => {
        const service = new MaterialService();

        const error = createHttpError(ERR_PURCHASE_UNIT_INACTIVE);

        getByIdCategoryMock.mockResolvedValue(categoryMaterialFixture);
        getByIdBuyerMock.mockResolvedValue(buyerMaterialFixture);
        getByIdPurchaseUnitMock.mockResolvedValue(purchaseUnitMaterialInactiveFixture);
        getByIdProductionPhaseMock.mockResolvedValue(productionPhaseMaterialFixture);
        await expect(async () => service.create(materialRegisterItemFixture)).rejects.toEqual(error);
      });

      it('should throw ERR_PRODUCTION_PHASE_INACTIVE', async () => {
        const service = new MaterialService();

        const error = createHttpError(ERR_PRODUCTION_PHASE_INACTIVE);

        getByIdCategoryMock.mockResolvedValue(categoryMaterialFixture);
        getByIdBuyerMock.mockResolvedValue(buyerMaterialFixture);
        getByIdPurchaseUnitMock.mockResolvedValue(purchaseUnitMaterialFixture);
        getByIdProductionPhaseMock.mockResolvedValue(productionPhaseMaterialInactiveFixture);

        await expect(async () => service.create(materialRegisterItemFixture)).rejects.toEqual(error);
      });
    });
  });

  describe('test listCsv', () => {
    describe('success', () => {
      it('should called list material csv ', async () => {
        const service = new MaterialService();
        expect(service).toBeDefined();
        findAllWithRelationsMock.mockResolvedValue(materialCsvFixture);
        const result = await service.listCsv();
        expect(result).toEqual(materialListCsvFixture);
      });
    });
  });
});
