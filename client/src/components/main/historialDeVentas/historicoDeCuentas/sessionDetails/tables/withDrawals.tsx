import CustomTable from '@/components/customElements/customTable/customTable';
import { formatWithdrawals } from './formatWithDrawals';

interface Props {
  withdrawals: any[];
}

export const DetailsWithDrawalsTable = ({ withdrawals }: Props) => {
  const headers = [
    'Folio de retiro',
    'Importe',
    'Autorizado por',
    'Fecha de retiro',
  ];

  const data = formatWithdrawals(withdrawals);

  return <CustomTable title="Retiros" headers={headers} content={data} />;
};
