import styles from './tables.module.css';

//icons
import searchIcon from '@/assets/public/searchIcon.svg';
import filterIcon from '@/assets/public/filterIcon.svg';
import { useState } from 'react';
import EditButton from '@/components/customElements/editButton/editButton';
import OnOffCheckBox from '@/components/customElements/onOffCheckBox/onOffCheckBox';
import { useModal } from '@/hooks/useModals';
import { EDIT_TRANSACTIONS_MODAL } from '@/lib/modals.lib';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';
import { usePaymentsStore } from '@/zstore/payments.store';
import InteractiveModal from '@/components/modals/InteractiveModal/InteractiveModal';
import { formatPayments } from '../main/historialDeVentas/historicoDePagos/utils/formatPayments';
import EditTransactions from '../main/historialDeVentas/historicoDePagos/transactions/editTransactions';
import { paymentsTableHeaders } from './constants';

interface Props {
  data: [];
}

export default function PaymentsMainTable({ data }: Props): JSX.Element {
  const updatePayment = usePaymentsStore((state) => state.updatePayment);
  const editTransactions = useModal(EDIT_TRANSACTIONS_MODAL);
  const [selectedPayment, setSelectedPayment] = useState();
  const confirmChanges = useModal(CONFIRM_CHANGES);

  const isLoading = usePaymentsStore((state) => state.isLoading);
  const errors = usePaymentsStore((state) => state.errors);
  const interactiveModal = useModal('INTERACTIVE_MODAL');

  const handlePayment = (payment) => {
    editTransactions.openModal();
    setSelectedPayment(payment);
    return;
  };

  return (
    <div className={styles.container}>
      <div>
        <section className={styles.head}>
          <h2>Historial de pagos</h2>
        </section>
        <section className={styles.mainSection}>
          <div className={styles.mainHead}>
            <div className={styles.mainHeadLeft}>
              <span>Mostrar</span>
              <select name="" id="" className={styles.showSelect}>
                <option value="all">Todos</option>
                <option value="option-one">Option 1</option>
                <option value="optio-two">Option 2</option>
              </select>
              <span>Cuentas</span>
            </div>
            <div className={styles.searchContainer}>
              <button className={styles.categoryButton}>
                <img src={filterIcon} alt="categories-button" />
                <span>Categorias</span>
              </button>
              <div className={styles.searchBarTable}>
                <img
                  src={searchIcon}
                  alt="search-icon"
                  className={styles.searchIcon}
                />
                <input
                  type="text"
                  className={styles.searchBarTableInput}
                  placeholder="Cuenta # Ejemplo-00"
                />
              </div>
            </div>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                {paymentsTableHeaders.map((element, index) => {
                  return <th key={index}>{element}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data?.map((element) => {
                const formatedPayment = formatPayments(element);
                return (
                  <tr key={formatedPayment?.payCode}>
                    <td>{formatedPayment?.payCode}</td>
                    <td>{formatedPayment?.account}</td>
                    <td>{formatedPayment?.note}</td>
                    <td>{formatedPayment?.total}</td>
                    <td>{formatedPayment?.tips}</td>
                    <td>{formatedPayment?.paid}</td>
                    <td>{formatedPayment?.method}</td>
                    <td>{formatedPayment?.cashier}</td>
                    <td>{formatedPayment?.date}</td>
                    <td>
                      <EditButton
                        action={() => {
                          handlePayment(element);
                        }}
                      />
                    </td>
                    <td>
                      <OnOffCheckBox
                        state={formatedPayment?.billing}
                        action={() => {
                          if (formatedPayment?.billing) return;
                          interactiveModal.openModal();
                          setSelectedPayment(element);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.tableFooter}></div>
        </section>
        {editTransactions.isOpen &&
          editTransactions.modalName === EDIT_TRANSACTIONS_MODAL && (
            <EditTransactions
              payment={selectedPayment}
              isOpen={editTransactions.isOpen}
              onClose={editTransactions.closeModal}
              openModal={confirmChanges.openModal}
            />
          )}
        {confirmChanges.isOpen &&
          confirmChanges.modalName === CONFIRM_CHANGES && (
            <ConfirmChangesModal
              isOpen={confirmChanges.isOpen}
              onClose={confirmChanges.closeModal}
              loading={isLoading}
              errors={errors}
              closeModal={editTransactions.closeModal}
            >
              Cambios guardados
            </ConfirmChangesModal>
          )}
        {interactiveModal.isOpen &&
          interactiveModal.modalName === 'INTERACTIVE_MODAL' && (
            <InteractiveModal
              isOpen={interactiveModal.isOpen}
              onClose={interactiveModal.closeModal}
              action={() => {
                interactiveModal.closeModal();
                updatePayment(selectedPayment?._id, {
                  billing: !selectedPayment?.billing,
                });
                confirmChanges.openModal();
              }}
            >
              El pago {selectedPayment?.paymentCode} se marcará como facturado,
              desea continuar?
            </InteractiveModal>
          )}
      </div>
    </div>
  );
}
