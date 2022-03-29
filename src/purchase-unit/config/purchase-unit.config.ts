export const PURCHASE_UNIT_CSV_FIELDS = {
  name: 'nome',
  variations: 'variação',
  description: 'observação',
};

export const ROLE_PURCHASE_UNIT_MANAGE = 'factory-unit-manage';

export const ERR_PURCHASE_UNIT_DUPLICATE = {
  code: 409,
  message: 'ERR_PURCHASE_UNIT_DUPLICATE',
};

export const ERR_PURCHASE_UNIT_VARIATION_DUPLICATE = {
  code: 409,
  message: 'ERR_PURCHASE_UNIT_VARIATION_DUPLICATE',
};

export const ERR_PURCHASE_UNIT_NOT_EXISTS = {
  code: 404,
  message: 'ERR_PURCHASE_UNIT_NOT_EXISTS',
};

export const ERR_PURCHASE_UNIT_INACTIVE = {
  code: 400,
  message: 'ERR_PURCHASE_UNIT_INACTIVE',
};
