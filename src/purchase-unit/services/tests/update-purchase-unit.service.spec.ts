describe('@TODO', () => {
  it('@todo', () => {
    expect(1).toBe(1);
  });
});

// import createHttpError from 'http-errors';
// import {
//   updateResultMock,
//   updateWithoutDescriptionMock,
//   updateWithoutVariationsMock,
//   updateVariationMock,
//   updateFindByIdMock,
//   updatePurchaseUnitMock,
//   updateFindByNameMock,
// } from '@fixtures/purchase-unit/update.fixture';
// import { updatePurchaseUnit } from './update-purchase-unit.service';
// import * as updateRepositoryMock from '@repositories/purchase-unit/update.repository';
// import * as purchaseUnitRepository from '@repositories/purchase-unit/purchase-unit.repository';
// import { ERR_PURCHASE_UNIT_DUPLICATE, ERR_PURCHASE_UNIT_NOT_EXISTS, ERR_PURCHASE_UNIT_VARIATION_DUPLICATE } from '@errors/purchase-unit.error';

// describe('Suite Purchase Unit Service', () => {
//   const updateMock = jest.spyOn(updateRepositoryMock, 'update');
//   const findByNameMock = jest.spyOn(purchaseUnitRepository, 'findByName');
//   const findById = jest.spyOn(purchaseUnitRepository, 'findById');
//   const findByVariationMock = jest.spyOn(purchaseUnitRepository, 'findByVariation');
//   const idPurchase = 2;

//   beforeEach(() => {
//     updateMock.mockClear();
//     findByNameMock.mockClear();
//     findById.mockClear();
//     findByVariationMock.mockClear();
//   });

//   describe('tests updatePurchaseUnit', () => {
//     describe('success', () => {
//       it('should update a purchase unit and variation done', async () => {
//         findById.mockResolvedValue(updateFindByIdMock);
//         findByNameMock.mockResolvedValue([]);
//         findByVariationMock.mockResolvedValue([]);
//         updateMock.mockResolvedValue();
//         await updatePurchaseUnit(updateResultMock, idPurchase);
//         expect(updateMock).toBeCalledTimes(1);
//       });

//       it('should update a purchase unit without variation', async () => {
//         findById.mockResolvedValue(updateFindByIdMock);
//         findByNameMock.mockResolvedValue([]);
//         findByVariationMock.mockResolvedValue([]);
//         updateMock.mockResolvedValue();
//         await updatePurchaseUnit(updateWithoutVariationsMock, idPurchase);
//         expect(updateMock).toBeCalledTimes(1);
//       });

//       it('should update a purchase unit without description', async () => {
//         findById.mockResolvedValue(updateFindByIdMock);
//         findByNameMock.mockResolvedValue([]);
//         findByVariationMock.mockResolvedValue([]);
//         updateMock.mockResolvedValue();
//         await updatePurchaseUnit(updateWithoutDescriptionMock, idPurchase);
//         expect(updateMock).toBeCalledTimes(1);
//       });
//     });

//     describe('fails', () => {
//       it('should throw an error when update purchase unit id is not a valid number', async () => {
//         const idError = 'undefined';
//         const error = createHttpError(ERR_PURCHASE_UNIT_NOT_EXISTS);
//         await expect(async () => updatePurchaseUnit(updateResultMock, Number(idError))).rejects.toEqual(error);
//       });

//       it('should throw error when update purchase unit not exists', async () => {
//         findById.mockResolvedValue(null);
//         const error = createHttpError(ERR_PURCHASE_UNIT_NOT_EXISTS);
//         await expect(async () => updatePurchaseUnit(updateResultMock, idPurchase)).rejects.toEqual(error);
//       });

//       it('should throw an error when the purchase unit from already exists for another id', async () => {
//         findById.mockResolvedValue(updateFindByIdMock);
//         findByNameMock.mockResolvedValue(updateFindByNameMock);
//         const error = createHttpError(ERR_PURCHASE_UNIT_DUPLICATE);
//         await expect(async () => updatePurchaseUnit(updatePurchaseUnitMock, idPurchase)).rejects.toEqual(error);
//       });

//       it('should generate an error when the Purchase unit variation already exists for another variation', async () => {
//         findById.mockResolvedValue(updateFindByIdMock);
//         findByNameMock.mockResolvedValue([]);
//         findByVariationMock.mockResolvedValue(updateVariationMock);
//         const error = createHttpError(ERR_PURCHASE_UNIT_VARIATION_DUPLICATE);
//         await expect(async () => updatePurchaseUnit(updatePurchaseUnitMock, idPurchase)).rejects.toEqual(error);
//       });
//     });
//   });
// });
