import { COURTESY_APPLY_BILL, SET_PERCENT } from '@/utils/bussines/constants';
import styles from './footerDetail.module.css';
import { calculateDiscount } from '@/utils/bussines/calculateDiscount';
import { calculateBillTotal } from '@/utils/bussines/calculateTotals';

interface Props {
  account: any;
  discount: any;
}

export const FooterDetails = ({ account, discount }: Props) => {
  console.log(account.discount);
  
  return (
    <footer className={styles.footerDetails}>
      <section>
        <div>
          <span>Cuenta</span>
          <strong>{account.code}</strong>
        </div>
      </section>
      <ul>
        <li>
          {account.discount && (
            <>
              <span>Descuento</span>
              { account.discount.discountType === COURTESY_APPLY_BILL ? <strong>${ calculateBillTotal(account.productsDetails)}{ `(%100)`}</strong> : <strong>${calculateBillTotal(account.productsDetails) - calculateBillTotal(account.productsDetails, account.discount)}{ `${account.discount.setting === SET_PERCENT ? ` ( %${account.discount.discountMount} )` : ''}`}</strong> }
            </>
          )}
        </li>
        <li>
          <span>Total</span>
          <strong>{account.total ?? '$0.00'}</strong>
        </li>
      </ul>
    </footer>
  );
};
