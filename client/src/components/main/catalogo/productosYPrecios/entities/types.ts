interface IPrice {
  name: string;
  price: number;
}

interface IProduct {
  subcategory: string;
  productName: string;
  prices: IPrice[];
}

export class Product implements IProduct {
  subcategory: string;
  productName: string;
  prices: IPrice[];

  constructor(subcategory: string, productName: string, prices: IPrice[]) {
    this.subcategory = subcategory;
    this.productName = productName;
    this.prices = prices;
  }
}
