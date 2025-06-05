import * as XLSX from 'xlsx';
import { flattenArray} from './lib/flattenObjects';
import { applyConditionalFormatting } from './lib/applyConditionalFormatting';
import { autoFitColumns } from './lib/autoFitColumns';

type TExporterConfig = {
    sheetName: string;
    reportName: string;
  }

export const exportToExcel = async (dataArray: Record<string, unknown>[], HEADER_MAPPING: Record<string, string>, config: TExporterConfig) => {

    const flatData = flattenArray(dataArray);
    const workbook = XLSX.utils.book_new();
    
    const renamedData = flatData.map(row => {
        let newRow = {};
        Object.keys(row).forEach((key) => {
            newRow[HEADER_MAPPING[key] || key] = row[key]; // Usa el nuevo nombre o deja el original
        });
        return newRow;
});
    const worksheet = XLSX.utils.json_to_sheet(renamedData);

    // 1️⃣ Ajustar automáticamente el ancho de las columnas
    autoFitColumns(worksheet, renamedData, HEADER_MAPPING);

     // 2️⃣ Aplicar formato condicional
    applyConditionalFormatting(worksheet, renamedData);

      // Aplicar estilos a las celdas
     // addStylesToCells(worksheet);

    XLSX.utils.book_append_sheet(workbook, worksheet, `${config.sheetName}`);
    XLSX.writeFile(workbook, `${config.reportName}.xlsx`);

    };
