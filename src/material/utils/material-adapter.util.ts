import { Material } from '@/material/entities/material.entity';
import { MaterialDto } from '@/material/types/material.type';

export function materialAdapter(material: Material): MaterialDto {
  const formattedMaterial: MaterialDto = {
    id: material.id,
    code: material.code,
    name: material.name,
    purchaseUnitId: material.purchaseUnitId,
    productionPhaseId: material.productionPhaseId,
    categoryId: material.categoryId,
    leadTimeDay: material.leadTimeDay,
    buyerId: material.buyerId,
    price: material.price,
    priceService: material.priceService,
    status: material.status,
    datePrice: material.datePrice,
    deletedAt: material.deletedAt,
    verifiable: material.verifiable,
  };

  return formattedMaterial;
}
