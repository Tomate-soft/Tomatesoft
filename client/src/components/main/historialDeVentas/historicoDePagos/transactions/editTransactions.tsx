import CloseButton from '@/components/customElements/CloseButton';
import styles from './editTransactions.module.css';
import CustomSelect from '@/components/customElements/customSelect/customSelect';
import { formatPayMethods } from '@/utils/formatPayMethod';
import { useEffect, useState } from 'react';
import RequestButton from '@/components/customElements/saveButton/savebutton';
import { usePaymentsStore } from '@/zstore/payments.store';
interface Props {
  isOpen: any;
  onClose: any;
  payment: any;
  openModal: () => void;
}
export default function EditTransactions({
  isOpen,
  onClose,
  payment,
  openModal,
}: Props) {
  const [dropDownName, setDropDownName] = useState<string | number>('');
  const [transactions, setTransactions] = useState([...payment.transactions]);
  const updatePayment = usePaymentsStore((state) => state.updatePayment);

  useEffect(() => {
    if (isOpen) {
      setIsEdited(false);
    }
  }, [isOpen]);

  const handleCLick = (arg: string) => {
    alert(arg);
  };

  const [isEdited, setIsEdited] = useState(false);

  return (
    <main id="modal-container" className={styles.screen}>
      <div id="modal">
        <CloseButton
          onClose={() => {
            onClose();
            setIsEdited(false);
          }}
        />
        <header>
          <h2>Edicion de métodos de pago</h2>
        </header>
        <section>
          {transactions.map((transaction, index) => {
            return (
              <div key={index} className={styles.transactionContainer}>
                <span>{`Método ${index + 1}`}</span>
                <span>{`$${parseFloat(transaction.payQuantity).toFixed(
                  2,
                )}`}</span>
                <CustomSelect
                  element={transaction}
                  initialValue={formatPayMethods(transaction.paymentType)}
                  componentId={index}
                  dropDownName={dropDownName}
                  setDropDownName={setDropDownName}
                  width="220px"
                  action={() => {
                    if (!isEdited) {
                      setIsEdited(true);
                    }
                  }}
                />
                <span>{`Propina:   $${parseFloat(transaction.tips).toFixed(
                  2,
                )}`}</span>
              </div>
            );
          })}
        </section>
        <footer>
          <RequestButton
            isDisable={!isEdited}
            action={() => {
              updatePayment(payment._id, { transactions: transactions });
              openModal();
            }}
          />
        </footer>
      </div>
    </main>
  );
}
