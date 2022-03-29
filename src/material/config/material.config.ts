export const ROLE_MATERIAL_MANAGER = 'factory-material-manage';
export const ROLE_MATERIAL_CHANGE_PRICE = 'factory-material-change-price';

export const MATERIAL_CSV_FIELDS = {
  code: 'mp_original',
  name: 'nome_mp',
  purchaseUnit: 'UNID_COMPRA',
  category: 'categoria',
  leadTimeDay: 'leadtime (dia)',
  buyer: 'Comprador email',
  price: 'PRECO_NOMINAL',
  priceService: 'SERVICO/unid_compra',
  productionPhase: 'Fase_produção',
  verifiable: 'verificavel',
};
export const ERR_MATERIAL_DUPLICATE = {
  code: 409,
  message: 'ERR_MATERIAL_DUPLICATE',
};

export const ERR_MATERIAL_NOT_EXISTS = {
  code: 404,
  message: 'ERR_MATERIAL_NOT_EXISTS',
};
