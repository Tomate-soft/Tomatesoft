enum Prices {
  ONSITE = 'ON_SITE',
  TOGO = 'TOGO',
  RAPPI = 'RAPPI',
  PHONE = 'PHONE',
  PRICE_LIST_FIVE = 'PRICE_LIST_FIVE',
  PRICE_LIST_SIX = 'PRICE_LIST_SIX',
  PRICE_LIST_SEVEN = 'PRICE_LIST_SEVEN',
  PRICE_LIST_EIGHT = 'PRICE_LIST_EIGHT',
  PRICE_LIST_NINE = 'PRICE_LIST_NINE',
  PRICE_LIST_TEN = 'PRICE_LIST_TEN',
}

export const formatPriceName = (name: string) => {
  return name === Prices.ONSITE
    ? 'Restaurante'
    : name === Prices.TOGO
    ? 'Para llevar'
    : name === Prices.RAPPI
    ? 'Rappi'
    : name === Prices.PHONE
    ? 'Teléfonico'
    : name === Prices.PRICE_LIST_FIVE
    ? 'Precio 5'
    : name === Prices.PRICE_LIST_SIX
    ? 'Precio 6'
    : name === Prices.PRICE_LIST_SEVEN
    ? 'Precio 7'
    : name === Prices.PRICE_LIST_EIGHT
    ? 'Precio 8'
    : name === Prices.PRICE_LIST_NINE
    ? 'Precio 9'
    : name === Prices.PRICE_LIST_TEN
    ? 'Precio 10'
    : '';
};
