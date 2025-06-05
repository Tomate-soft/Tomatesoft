export const calculateProductsQuantity = (products: any) => {
    let quantity = 0;

    products.forEach((product: any) => {
        quantity += product.quantity;
    });

    return quantity;
  
};
  