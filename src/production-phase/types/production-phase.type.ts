export type ProductionPhaseDto = {
  id: number;
  name: string;
  description?: string;
  status: boolean;
  deletedAt?: Date;
};

export type ProductionPhaseCreateDto = Omit<ProductionPhaseDto, 'id' | 'status'>;

export type ProductionPhaseStatusDto = Pick<ProductionPhaseDto, 'status'>;

export type ProductionPhaseComplementDto = Pick<ProductionPhaseDto, 'id' | 'name'>;
