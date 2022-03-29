const categoryMock = jest.fn();
const buyerMock = jest.fn();
const purchaseUnitMock = jest.fn();
const productionPhaseMock = jest.fn();

jest.mock('../../../category/services/category.service.ts', () => {
  return {
    CategoryService: function () {
      return {
        listActive: categoryMock,
      };
    },
  };
});

jest.mock('../../../buyer/services/buyer.service.ts', () => {
  return {
    BuyerService: function () {
      return {
        listActive: buyerMock,
      };
    },
  };
});

jest.mock('../../../purchase-unit/services/purchase-unit.service.ts', () => {
  return {
    PurchaseUnitService: function () {
      return {
        listActive: purchaseUnitMock,
      };
    },
  };
});

jest.mock('../../../production-phase/services/production-phase.service.ts', () => {
  return {
    ProductionPhaseService: function () {
      return {
        listActive: productionPhaseMock,
      };
    },
  };
});

import {
  buyerComplementFixture,
  categoryComplementFixture,
  materialComplementsFixture,
  productionPhaseComplementFixture,
  purchaseUnitComplementFixture,
} from '@/material/fixtures/list-complements.fixture';
import { listMaterialComplements } from '../material-complement.service';

describe('Suite Material Complements Service', () => {
  describe('test listMaterialComplements', () => {
    describe('success', () => {
      it('should return a list of complements', async () => {
        categoryMock.mockResolvedValue(categoryComplementFixture);
        buyerMock.mockResolvedValue(buyerComplementFixture);
        purchaseUnitMock.mockResolvedValue(purchaseUnitComplementFixture);
        productionPhaseMock.mockResolvedValue(productionPhaseComplementFixture);
        const complements = await listMaterialComplements();
        expect(complements).toEqual(materialComplementsFixture);
      });
    });
  });
});
