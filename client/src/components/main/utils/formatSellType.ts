import { SellsTypeOptions } from '@/types/sellTypes.types';

export default function formatSellType(sellType: string) {
  if (
    sellType === SellsTypeOptions.RESTAURANT_ORDER ||
    sellType === 'n/A' ||
    sellType === 'ON_SITE_ORDER'
  ) {
    return 'Restaurante';
  } else if (sellType === SellsTypeOptions.RAPPI_ORDER) {
    return 'Rappi';
  } else if (sellType === SellsTypeOptions.PHONE_ORDER) {
    return 'Telefono';
  } else if (sellType === SellsTypeOptions.TOGO_ORDER) {
    return 'Para llevar';
  } else {
    return '--';
  }
}
