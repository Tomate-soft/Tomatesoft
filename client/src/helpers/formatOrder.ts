import formatSellType from '@/components/main/utils/formatSellType';
import { formatToCurrency } from '@/lib/formatToCurrency';
import { calculateBillTotal } from '@/utils/bussines/calculateTotals';
import { formatStatus } from '@/utils/formatStatus';
import { formatTempo } from '@/utils/tempoFormat';
import { calculateProductsQuantity } from './calculateProductsQuantity';

export const formatOrder = (order: any) => {
  const { discount } = order;
  const totalBill = !discount ?  calculateBillTotal(order.products) :  calculateBillTotal(order.products, discount);
  const totalWithNotes = order?.notes?.reduce((sum, note, index) => {
    const total = note?.discount 
        ? calculateBillTotal(note.products, note.discount) 
        : calculateBillTotal(note.products);

    // Convertir a número asegurando que no haya strings
    const numericSum = parseFloat(sum) || 0;
    const numericTotal = parseFloat(total) || 0;


    return numericSum + numericTotal;
}, 0) || 0;

  const formatedOrder = {
    code: order.code,
    type: formatSellType(order.sellType),
    waiter: order.user,
    total: `$${order?.notes?.length > 0 ? formatToCurrency(totalWithNotes) : formatToCurrency(totalBill)} `,
    status: formatStatus(order.status),
    create: formatTempo(order.createdAt),
    transfer:
      order?.transferHistory?.length > 0
        ? `${order.transferHistory.at(0)} ➔ ${order.tableNum}`
        : `${order.tableNum}`,
    name: order.billName ?? '--',
    diners: order?.diners,
    notes: order.notes?.length ? order.notes.length : '--',
    notesArray: order.notes,
    comments: order.comments?.length ? order.comments : '--',
    products: order.products?.length ? calculateProductsQuantity(order.products) : '--',
    productsDetails: order.products,
    discount: order.discount ?? false,
  };
  return formatedOrder;
};
