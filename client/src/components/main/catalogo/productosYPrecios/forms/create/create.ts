import { Product } from "../../entities/types";

export const createProductsAndPrices = (args, subcategory, name ) => {
    const product = new Product(subcategory, name, [
        {
          name: 'ON_SITE',
          price: 10,
        },
        {
          name: 'TOGO',
          price: 20,
        },
        {
          name: 'RAPPI',
          price: 30,
        },
        {
          name: 'PHONE',
          price: 40,
        },
        {
          name: 'PRICE_LIST_FIVE',
          price: 50,
        },
        {
          name: 'PRICE_LIST_SIX',
          price: 60,
        },
        {
          name: 'PRICE_LIST_SEVEN',
          price: 70,
        },
        {
          name: 'PRICE_LIST_EIGHT',
          price: 80,
        },
        {
          name: 'PRICE_LIST_NINE',
          price: 90,
        },
        {
          name: 'PRICE_LIST_TEN',
          price: 100,
        },
      ]);

      return product;

}