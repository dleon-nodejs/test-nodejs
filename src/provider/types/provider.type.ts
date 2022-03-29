export type ProviderDto = {
  id: number;
  name: string;
  brands?: string[];
  products?: string[];
  status?: boolean;
  codeErp?: string;
  document?: string;
  foreignDocument?: boolean;
  leadTimeDay?: number;
  type?: number;
  shipping?: number;
  contact?: string;
  phone?: string;
  email?: string;
  region?: string;
  paymentTerm?: string;
  paymentMethod?: string;
  ipi?: number;
  icms?: number;
  bank?: string;
  account?: string;
  branch?: string;
};

export type ProviderPaginatedDto = {
  page: number;
  limit: number;
  totalItems: number;
  data: ProviderPaginatedData[];
};

export type ProviderParamsDto = {
  page: number;
  limit: number;
  document?: string;
  name?: string;
  codeErp?: string;
  produto?: string;
};

export type ProviderCreateDto = Omit<ProviderDto, 'id' | 'status'>;

export type ProviderPaginatedData = Omit<ProviderDto, 'status'>;

export type ProviderStatus = Pick<ProviderDto, 'status'>;
