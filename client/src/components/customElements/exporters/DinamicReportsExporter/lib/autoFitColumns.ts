export const autoFitColumns = (worksheet, renamedData, HEADER_MAPPING) => {
        const columnWidths = Object.keys(renamedData[0]).map((key, index, array) => {
            const headerText = HEADER_MAPPING[key] || key; // Usa el header renombrado o la clave original
    
            // Calcular el largo del contenido más largo de la columna
            const maxContentLength = renamedData.reduce((max, row) => {
                const cellValue = row[key] ? row[key].toString() : ""; // Convierte a string
                return Math.max(max, cellValue.length); // Encuentra el valor más largo
            }, headerText.length); // Comienza con el tamaño del header
    
            const columnWidth = Math.max(headerText.length, maxContentLength) + 6; // Asegura espacio extra
    
            return { wch: columnWidth }; // Ajustar el ancho de la columna
        });
    
        worksheet["!cols"] = columnWidths; // Aplicar el ajuste
    };