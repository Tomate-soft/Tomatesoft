
export const formatProductsExporter = (productArray) => {
    return productArray.map(({ prices, ...rest }) => {
      const formattedPrices = prices.reduce((acc, { name, price }) => {
        acc[name] = price;
        return acc;
      }, {});
      return { ...rest, ...formattedPrices };
    });
  };
  

  export const flattenPricesExporter = (input) => {
    const { prices, ...rest } = input; // Extraemos la propiedad prices y el resto del objeto
    const pricesAsKeys = prices.reduce((acc, { name, price }) => {
      acc[name] = price; // Añadimos una nueva key con el valor del nombre
      return acc;
    }, {});
    return { ...rest, ...pricesAsKeys }; // Fusionamos el resto del objeto con el nuevo mapeo
  };
 