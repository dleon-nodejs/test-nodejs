import {
  ERR_PROVIDER_DUPLICATE,
  ERR_PROVIDER_NOT_EXISTS,
  ERR_CODE_ERP_DUPLICATE,
  ERR_BRANCH_DUPLICATE,
  ERR_PRODUCT_DUPLICATE,
} from '@/provider/config/provider.config';
import { EntityCatch } from '@/shared/decorators/entity-catch.decorator';
import { BaseService } from '@/shared/services/base.service';
import { throwError } from '@/shared/utils/throw-error.util';
import { DecorateAll } from 'decorate-all';
import { ComplementType } from '../config/provider-complement.enum';
import { Complements } from '../config/provider.enum';
import { Provider } from '../entities/provider.entity';
import { ProviderRepository } from '../repositories/provider.repository';
import { ProviderCreateDto, ProviderDto, ProviderPaginatedDto, ProviderPaginatedData, ProviderParamsDto } from '../types/provider.type';

@DecorateAll(
  EntityCatch({
    notExists: ERR_PROVIDER_NOT_EXISTS,
    duplicate: ERR_PROVIDER_DUPLICATE,
  }),
  { deep: true, exclude: ['adapter'] }
)
export class ProviderService extends BaseService<Provider, ProviderDto, ProviderCreateDto> {
  protected repository = new ProviderRepository();

  public adapter(provider: Provider): ProviderDto {
    return {
      id: provider.id,
      name: provider.name,
      document: provider.document,
      foreignDocument: provider.foreignDocument,
      brands: provider.complements?.filter((item) => item.type === ComplementType.brand).map((item) => item.name) || [],
      products: provider.complements?.filter((item) => item.type === ComplementType.product).map((item) => item.name) || [],
      leadTimeDay: provider.leadTimeDay,
      shipping: provider.shipping,
      contact: provider.contact,
      phone: provider.phone,
      email: provider.email,
      region: provider.region,
      paymentMethod: provider.paymentMethod,
      paymentTerm: provider.paymentTerm,
      ipi: provider.ipi,
      icms: provider.icms,
      status: provider.status,
      bank: provider.bank,
      branch: provider.branch,
      account: provider.account,
    };
  }

  public async create(params: ProviderCreateDto): Promise<void> {
    await this.findByCodErp(params);

    const brands = await this.normalizeComplements(params.brands, Complements.brand);
    const products = await this.normalizeComplements(params.products, Complements.product);

    await this.repository.create({
      ...params,
      brands,
      products,
    });
  }

  private async findByCodErp(item): Promise<void> {
    const itemCodErp = await this.repository.getByCodErp(item.codeErp);

    if (itemCodErp.length) {
      throwError(ERR_CODE_ERP_DUPLICATE);
    }
  }

  private async normalizeComplements(complements: string[] = [], type?: number): Promise<string[]> {
    let arrayComplement = [...complements];

    arrayComplement = arrayComplement.map((items) => items.toLowerCase().trim()).filter((item) => item);
    arrayComplement = [...new Set(arrayComplement)];

    const existsProviderComplement = await this.repository.findByComplements(arrayComplement, type);

    if (existsProviderComplement.length && type === Complements.brand) {
      throwError(ERR_BRANCH_DUPLICATE);
    }

    if (existsProviderComplement.length && type === Complements.product) {
      throwError(ERR_PRODUCT_DUPLICATE);
    }
    return arrayComplement;
  }

  public async findPaginatedParams(paramsProvider: ProviderParamsDto): Promise<ProviderPaginatedDto> {
    const [providers, total] = await new ProviderRepository().findPaginated(paramsProvider);
    const resultDataProvider: ProviderPaginatedDto = {
      limit: paramsProvider.limit,
      page: paramsProvider.page,
      totalItems: total,
      data: providers.map(function (item: Provider): ProviderPaginatedData {
        return {
          id: item.id,
          codeErp: item.codeErp,
          name: item.name,
          document: item.document,
          foreignDocument: item.foreignDocument,
        };
      }),
    };
    return resultDataProvider;
  }
}
