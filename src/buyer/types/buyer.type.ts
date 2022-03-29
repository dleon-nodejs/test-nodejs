export type BuyerDto = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  status: boolean;
  deletedAt?: Date;
};

export type BuyerCreateDto = Omit<BuyerDto, 'id' | 'status'>;

export type BuyerStatusDto = Pick<BuyerDto, 'status'>;

export type BuyerComplementDto = Pick<BuyerDto, 'id' | 'name' | 'email'>;
