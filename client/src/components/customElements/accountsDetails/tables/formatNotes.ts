import { calculateBillTotal } from '@/utils/bussines/calculateTotals';
import { formatStatus } from '@/utils/formatStatus';
import { formatTempo } from '@/utils/tempoFormat';

export const formatNotes = (notesArray: any) => {
  console.log(notesArray);
  function setAmount(item: any) {
    if (item.setting === 'SET_PERCENT') {
      return `-$${item.totalDiscountQuantity}  - %${item.discountMount}`;
    }
    if (item.setting === 'SET_QUANTITY') {
      return `$${item.discountMount}`;
    }
    return '--';
  }
  const notesOutPut = notesArray.map((element) => {
    const formatedNote = {
      number: element.noteNumber,
      user: element.user,
      create: formatTempo(element.createdAt),
      products: element?.products,
      productsQuantity: element?.products.length,
      total: `$${ element?.discount ? calculateBillTotal(element?.products, element.discount) : calculateBillTotal(element?.products)}`,
      discount: '#TODO',
      //discount: setAmount(element.discount),
      status: formatStatus(element.status),
      discountFor: element?.discountFor ?? '--',
    };
    return formatedNote;
  });
  return notesOutPut;
};
