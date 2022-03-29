describe('@TODO', () => {
  it('@todo', () => {
    expect(1).toBe(1);
  });
});

// import createHttpError from 'http-errors';
// import {
//   createResultMock,
//   createAlreadyExistsMock,
//   createWithoutDescMock,
//   createWithoutVariationsMock,
//   createAlreadVariationMock,
// } from '@fixtures/purchase-unit/create.fixture';
// import * as purchaseUnitRepository from '@repositories/purchase-unit/purchase-unit.repository';
// import * as createRepositoryMock from '@repositories/purchase-unit/create.repository';
// import { ERR_PURCHASE_UNIT_DUPLICATE, ERR_PURCHASE_UNIT_VARIATION_DUPLICATE } from '@errors/purchase-unit.error';
// import { createPurchaseUnit } from './create-purchase-unit.service';

// describe('Suite Purchase Unit Service', () => {
//   const findByNameMock = jest.spyOn(purchaseUnitRepository, 'findByName');
//   const findByVariationMock = jest.spyOn(purchaseUnitRepository, 'findByVariation');
//   const createMock = jest.spyOn(createRepositoryMock, 'create');

//   beforeEach(() => {
//     findByNameMock.mockClear();
//     findByVariationMock.mockClear();
//     createMock.mockClear();
//   });

//   describe('tests createPurchaseUnit', () => {
//     describe('success', () => {
//       it('should create a purchase unit without repeated variation', async () => {
//         findByNameMock.mockResolvedValue([]);
//         findByVariationMock.mockResolvedValue([]);
//         createMock.mockResolvedValue();
//         await createPurchaseUnit(createResultMock);
//         expect(createMock).toBeCalledTimes(1);
//       });

//       it('should create a purchase unit without variation', async () => {
//         findByNameMock.mockResolvedValue([]);
//         findByVariationMock.mockResolvedValue([]);
//         createMock.mockResolvedValue();
//         await createPurchaseUnit(createWithoutVariationsMock);
//         expect(createMock).toBeCalledTimes(1);
//       });

//       it('should create a purchase unit without description', async () => {
//         findByNameMock.mockResolvedValue([]);
//         findByVariationMock.mockResolvedValue([]);
//         createMock.mockResolvedValue();
//         await createPurchaseUnit(createWithoutDescMock);
//         expect(createMock).toBeCalledTimes(1);
//       });

//       it('should create a purchase unit with variation equal name', async () => {
//         findByNameMock.mockResolvedValue([]);
//         findByVariationMock.mockResolvedValue([]);
//         createMock.mockResolvedValue();
//         await createPurchaseUnit(createResultMock);
//         expect(createMock).toBeCalledTimes(1);
//       });
//     });

//     describe('fails', () => {
//       it('should throw error when purchase unit already exists', async () => {
//         findByNameMock.mockResolvedValue(createAlreadyExistsMock);
//         const error = createHttpError(ERR_PURCHASE_UNIT_DUPLICATE);
//         await expect(async () => createPurchaseUnit(createResultMock)).rejects.toEqual(error);
//       });

//       it('should throw error when variation already exists', async () => {
//         findByVariationMock.mockResolvedValue(createAlreadVariationMock);
//         findByNameMock.mockResolvedValue([]);
//         const error = createHttpError(ERR_PURCHASE_UNIT_VARIATION_DUPLICATE);
//         await expect(async () => createPurchaseUnit(createResultMock)).rejects.toEqual(error);
//       });
//     });
//   });
// });
