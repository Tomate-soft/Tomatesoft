export const formatWithdrawals = (withdrawals: any[]) => {
  const data = withdrawals.map((element) => {
    /*
    const formatedWithdrawal = {
      folio: '{}',
      amount: `$${parseFloat(element.amount).toFixed(2)}`,
      authorizedBy: element.authorizedBy,
      date: element.date,
    };
    */
    const formatedWithdrawal = {
      folio: '12',
      amount: `123`,
      authorizedBy: '1234',
      date: '12345',
    };
    return formatedWithdrawal;
  });
  return data;
};
