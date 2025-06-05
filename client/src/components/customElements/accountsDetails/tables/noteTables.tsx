import CustomTable from '../../customTable/customTable';
import { formatNotes } from './formatNotes';

interface Props {
  notesArray: any[];
  action: (args: any) => void;
}
const tableHeaders = [
  'Nota',
  'Abierta por',
  'Hora',
  'Productos',
  'Total',
  'Descuento',
  'Estado',
  'Cancelado por',
  'Detalles',
];

export default function DetailsNoteTables({ notesArray, action }: Props) {
  const data = formatNotes(notesArray);
  return (
    <CustomTable
      title="Notas de la cuenta"
      headers={tableHeaders}
      content={data}
      detail={action}
    />
  );
}
