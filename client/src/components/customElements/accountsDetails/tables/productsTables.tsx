import CustomTable from '../../customTable/customTable';
import { formatProducts } from './formatNoteProducts';

interface Props {
  productsArray: any[];
}
const tableHeaders = [
  'Envío',
  'Transferencia',
  'Producto',
  'Cantidad',
  'Precio',
  'Descuento',
  'Importe',
  'Cancelado por',
  'Terminal',
  'Hora',
];

export default function DetailsProductsTable({ productsArray }: Props) {
  const data = formatProducts(productsArray);
  return (
    <CustomTable title="Productos" headers={tableHeaders} content={data} />
  );
}
