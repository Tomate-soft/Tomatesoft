import { settingPayMethods } from '@/utils/settingPayMethods';
import { formatTempo } from '@/utils/tempoFormat';

export function formatPayments(payment) {
  const calculateTips =  payment?.transactions?.reduce((acc, item) => {
    return acc + !item.tips ? 0 :  parseFloat(item.tips);
  }, 0);

  console.log("es aca");
  console.log(payment);

  const formatedPayment = {
    payCode: payment?.paymentCode ?? '--',
    account: payment?.check ?? '--',
    note: payment?.noteAccountId?.noteNumber ?? '--',
    total: `$${parseFloat(payment.paymentTotal).toFixed(2)}`,
    tips: `$${parseFloat(calculateTips).toFixed(2)}`,  
    paid: `$${parseFloat(payment.paymentTotal).toFixed(2)}`,
    method: settingPayMethods(payment.transactions).type,
    cashier: `${payment.cashier.name} ${payment.cashier.lastName}`,
    date: formatTempo(payment.createdAt),
    billing: payment.billing,
  };
  
  return formatedPayment;
}
