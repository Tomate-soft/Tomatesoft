import * as XLSX from 'xlsx';


export const addStylesToCells = (worksheet: XLSX.WorkSheet, renamedData: Record<string, unknown>[]) => {
    // Estilo para los encabezados (negrita, color de fondo, etc.)
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } }, // Blanco y negrita
      fill: { fgColor: { rgb: "4F81BD" } }, // Azul
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      }
    };
  
    // Estilo para las celdas de datos
    const dataStyle = {
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      }
    };
  
    // Establecer el estilo para las celdas del encabezado (primera fila)
    const headerRowIndex = 0; // Primer fila es el encabezado
    for (let colIndex = 0; colIndex < Object.keys(renamedData[0]).length; colIndex++) {
      const headerCellAddress = XLSX.utils.encode_cell({ r: headerRowIndex, c: colIndex });
      if (worksheet[headerCellAddress]) {
        worksheet[headerCellAddress].s = headerStyle;
      }
    }
  
    // Aplicar estilo a las celdas de datos (todas las filas debajo del encabezado)
    for (let rowIndex = 1; rowIndex < renamedData.length; rowIndex++) {
      for (let colIndex = 0; colIndex < Object.keys(renamedData[0]).length; colIndex++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
        if (worksheet[cellAddress]) {
          worksheet[cellAddress].s = dataStyle; 
        }
      }
    }
  };
  