import { formatTempo } from '@/utils/tempoFormat';

export const formatProducts = (productsArray: any) => {
  const calculateTotal = (element: any) => {
    const price = {
      ...element,
      get totalPrice() {
        return (parseFloat(element.priceInSiteBill) * element.quantity).toFixed(
          2,
        );
      },
    };
    return price.totalPrice;
  };

  const productArray = productsArray.map((element) => {
    const formatedProduct = {
      send: '#TODO',
      transferHistory: '#TODO',
      product: element.productName,
      quantity: element.quantity,
      price: '$' + element.priceInSiteBill,
      discount: '#TODO', // Esto tiene  que ver en como se crean los descuentos de productos una ves que funcionen volver aca
      toTalprice: `$${calculateTotal(element)}`,
      cancelledFor: '#TODO',
      device: '#TODO',
      time: formatTempo(element.createdAt),
    };
    return formatedProduct;
  });
  return productArray;
};
