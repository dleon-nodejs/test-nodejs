export type PurchaseUnitDto = {
  id: number;
  name: string;
  description?: string;
  variations?: string[];
  status: boolean;
};
export type PurchaseUnitCreateDto = Omit<PurchaseUnitDto, 'id' | 'status'>;

export type PurchaseUnitStatus = Pick<PurchaseUnitDto, 'status'>;

export type PurchaseUnitComplementDto = Pick<PurchaseUnitDto, 'id' | 'name'>;
