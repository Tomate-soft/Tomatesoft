

enum GraficsOptions {
    INITIAL,
    PRODUCTS_SELLS_TREEMAP,
    OTHER_OPTIONS
}

export const dashboardGrafics = {
    [GraficsOptions.PRODUCTS_SELLS_TREEMAP]: {
        title: 'Ventas por producto',
        description: 'Este gráfico muestra las ventas de los productos de la tienda.',
        value: GraficsOptions.PRODUCTS_SELLS_TREEMAP,

    },
    [GraficsOptions.OTHER_OPTIONS]: {
        title: 'Otras opciones',
        description: 'Este gráfico muestra las ventas generales.',
        value: GraficsOptions.OTHER_OPTIONS,
    }
};
