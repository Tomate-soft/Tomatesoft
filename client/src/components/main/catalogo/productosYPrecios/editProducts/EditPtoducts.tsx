import CloseButton from '@/components/customElements/CloseButton';
import styles from './EditProducts.module.css';
import { useEffect, useState } from 'react';
import arrow from '@/assets/public/arrow.svg';
import SaveButton from '@/components/customElements/SaveButton';
import { useAdditions } from '@/hooks/useAdditions';
import { useProductsStore } from '@/zstore/products.store';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';
import { formatPriceName } from './lib';

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
  openModal: () => void;
  product: any;
}

export default function EditProducts({ onClose, children, product }: Props) {
  const updateProducts = useProductsStore((state) => state.updateProducts);
  const setError = useProductsStore((state) => state.setError);
  const isLoading = useProductsStore((state) => state.isLoading);
  const error = useProductsStore((state) => state.error);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [prices, setPrices] = useState(() =>
    product.prices.map((price: any) => ({
      name: price.name,
      price: price.price,
    })),
  );
  const { groups } = useAdditions();
  const handlePriceChange = (index: number, value: string) => {
    const updatedPrices = prices.map((price, i) =>
      i === index ? { ...price, price: parseInt(value) } : price,
    );
    setPrices(updatedPrices);
  };
  const [selectGroup, setSelectGroup] = useState('');
  const confirmChanges = useModal(CONFIRM_CHANGES);
  useEffect(() => {
    
    setSelectGroup(product.group);
  }, [product]);
  
  return (
    <main className={styles.screen}>
      <div>
        <CloseButton onClose={onClose} />
        <h3>{children}</h3>
        <div>
          <h3>General</h3>
          <span>{product?.productName}</span>
          <div className={styles.containerInput}>
            <div className={styles.categoriesSelect}>
              <div
                className={styles.customSelect}
                onClick={() => {
                  setToggleStatus(!toggleStatus);
                }}
              >
                <div className={styles.selectTrigger}>
                  <span>
                    {selectGroup?.groupName
                      ? selectGroup?.groupName
                      : product.group?.groupName
                      ? product.group?.groupName
                      : 'Seleccionar grupo'}
                  </span>
                  <img src={arrow} alt="" className={styles.arrowSelect} />
                </div>
                <div className={toggleStatus ? styles.options : styles.hidden}>
                  {groups?.map((group, index) => (
                    <div
                      className={styles.option}
                      key={index}
                      onClick={() => setSelectGroup(group)}
                    >
                      {group?.groupName}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
          disabled={!selectGroup}
            action={() => {
              updateProducts(product._id, {
                ...product,
                group: selectGroup ?? product.group._id,
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
              loading={isLoading}
              errors={error}
              actionType={() => {
                setError();
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
