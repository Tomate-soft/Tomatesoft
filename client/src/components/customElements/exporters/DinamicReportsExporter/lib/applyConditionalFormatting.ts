import * as XLSX from 'xlsx';

// Función para aplicar formato condicional a las celdas
export const applyConditionalFormatting = (worksheet, renamedData) => {
  // Estilo para valores faltantes (por ejemplo, "--")
  const missingValueStyle = {
    fill: { fgColor: { rgb: "FF0000" } }, // Rojo
    font: { bold: true, color: { rgb: "FFFFFF" } }, // Blanco y negrita
    alignment: { horizontal: "center", vertical: "center" },
  };

  // Estilo para tiempos largos (por ejemplo, más de 8 horas)
  const longTimeStyle = {
    fill: { fgColor: { rgb: "FFFF00" } }, // Amarillo
    font: { bold: true },
    alignment: { horizontal: "center", vertical: "center" },
  };

  // Recorre cada fila y celda de la hoja de cálculo para aplicar formato condicional
  for (let rowIndex = 0; rowIndex < renamedData.length; rowIndex++) {
    for (let colIndex = 0; colIndex < Object.keys(renamedData[0]).length; colIndex++) {
      const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
      const cellValue = renamedData[rowIndex][Object.keys(renamedData[0])[colIndex]];

      // Condición 1: Si la celda tiene un valor faltante "--", aplícale el estilo rojo
      if (cellValue === "--") {
        worksheet[cellAddress].s = missingValueStyle;
      }

      // Condición 2: Si la celda tiene un tiempo largo (mayor a 8 horas), aplícale el estilo amarillo
      // Asumimos que el valor de tiempo está en formato "h:mm" y lo convertimos a minutos para hacer la comparación
      if (typeof cellValue === "string" && cellValue.includes("h")) {
        const timeParts = cellValue.split("h");
        const hours = parseInt(timeParts[0].trim());
        if (hours > 8) {
          worksheet[cellAddress].s = longTimeStyle;
        }
      }
    }
  }
};
