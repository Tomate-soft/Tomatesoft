export   function groupProductsByName(products) {
    return products?.reduce((acc, product) => {
      if (!acc[product.productName]) {
        acc[product.productName] = [];
      }
      acc[product.productName].push(product);
      return acc;
    }, {});
  }