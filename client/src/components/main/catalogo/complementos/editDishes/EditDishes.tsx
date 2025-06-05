import CloseButton from '@/components/customElements/CloseButton';
import styles from './editDishes.module.css';
import { useState } from 'react';
import SaveButton from '@/components/customElements/SaveButton';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';
import { formatPriceName } from '../../productosYPrecios/editProducts/lib';
import { useDishesStore } from '@/zstore/dishes';

interface Props {
  isOpen: any;
  onClose: any;
  dish: any;
}

export default function EditDishes({ onClose,  dish }: Props) {
  const [prices, setPrices] = useState(() =>
    dish.prices.map((price: any) => ({
      name: price.name,
      price: price.price,
    })),
  );

  const  updateDishes  = useDishesStore((state) => state.updateDishes);
  const  isLoadingUpdateDishes  = useDishesStore((state) => state.isLoading);
  const  errorUpdateDishes  = useDishesStore((state) => state.error);

  const handlePriceChange = (index: number, value: string) => {
    const updatedPrices = prices.map((price, i) =>
      i === index ? { ...price, price: parseInt(value) } : price,
    );
    setPrices(updatedPrices);
  };
  const confirmChanges = useModal(CONFIRM_CHANGES);
  
  return (
    <main className={styles.screen}>
      <div>
        <CloseButton onClose={onClose} />
        <h3>Editar complemento</h3>
        <div>
          <h3>General</h3>
          <span>{dish?.dishesName}</span>
        </div>
        <div>
          <h3>Precios de venta</h3>
          <div className={styles.pricesContainer}>
            {prices.map((price: string, index: number) => (
              <div className={styles.priceInput} key={price.name}>
                <span>{formatPriceName(price.name)}</span>
                <input
                  type="text"
                  placeholder={`$${parseFloat(price.price).toFixed(2)}`}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                />
                <label className={styles.switch}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <footer>
          <SaveButton
            action={() => {
              updateDishes(dish._id, {
                ...dish,
                prices: prices,
              });
              confirmChanges.openModal();
            }}
          />
        </footer>
        {confirmChanges.isOpen &&
          confirmChanges.modalName === CONFIRM_CHANGES && (
            <ConfirmChangesModal
              isOpen={confirmChanges.isOpen}
              onClose={confirmChanges.closeModal}
              loading={isLoadingUpdateDishes}
              errors={errorUpdateDishes}
              actionType={() => {
                onClose();
              }}
            >
              Cambios guardados
            </ConfirmChangesModal>
          )}
      </div>
    </main>
  );
}