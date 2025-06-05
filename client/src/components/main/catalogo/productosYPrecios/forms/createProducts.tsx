import styles from './createProducts.module.css';
// Hooks
import { useEffect, useState } from 'react';
// Icons
import arrowRigth from './../../../../../assets/public/arrowRigth.svg';
import {  useSelector } from 'react-redux';
import arrow from '@/assets/public/arrow.svg';
import arrowLeft from '@/assets/public/arrowLeft.svg';
import { useSubcategoriesStore } from '@/zstore/subcategories.store';
import CloseButton from '@/components/customElements/CloseButton';
import { Product } from '../entities/types';
import SaveButton from '@/components/customElements/SaveButton';
import { useProductsStore } from '@/zstore/products.store';
import addIcon from '@/assets/public/createIcon.svg';
import { createProductsAndPrices } from './create/create';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import { formatPrice } from './create/formatPrice';

interface Props {
  openModal: () => void;
  isOpen: any;
  onClose: any;
  children: any;
}

export default function CreateProductsModal({
  openModal,
  isOpen,
  onClose,
  children,
}: Props) {
  enum ProcesStatus {
    FIRST_PROCESS = 'FIRST_PROCESS',
    SECOND_PROCESS = 'SECOND_PROCESS',
  }
  const [processStatus, setProcessStatus] = useState<ProcesStatus>(
    ProcesStatus.FIRST_PROCESS,
  );
  const [category, setCategory] = useState<any>();
  const [subcategory, setSubcategory] = useState<any>();
  const categoryList = useSelector((state: any) => state.categories.allCategories);

  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleSubCategory, setToggleSubCategory] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const getSubcategories = useSubcategoriesStore(
    (state) => state.getSubcategories,
  );

  const subCategoriesArray = useSubcategoriesStore(
    (state) => state.subCategoriesArray,
  );

  // Crear la variable managementSubCategories
  const managementSubCategories = subCategoriesArray.filter((subCategory) =>
    category?.subCategories?.some((element: any) => element._id === subCategory._id),
  );

  const createProductNuevo = useProductsStore((state) => state.createProductWithTable);
  const isLoading = useProductsStore((state) => state.isLoading);
  const error = useProductsStore((state) => state.error);

  const confirmChanges = useModal(CONFIRM_CHANGES);

  useEffect(() => {
    getSubcategories();
  }, [category]);

  return (
    <div className={styles.screen}>
      {processStatus === ProcesStatus.FIRST_PROCESS ? (
        <section className={styles.modal}>
          <CloseButton onClose={onClose} />
          <div className={styles.head}>
            <h2 className={styles.tittle}>{children}</h2>
            <p>Seleccione la categoría a la que se asignarán los productos.</p>
          </div>

          <div className={styles.containerSelects}>
            <div className={styles.containerInput}>
              <div className={styles.categoriesSelect}>
                <div
                  className={styles.customSelect}
                  onClick={() => {
                    setToggleCategory(!toggleCategory);
                    setToggleSubCategory(false);
                  }}
                >
                  <div className={styles.selectTrigger}>
                    <span>
                      {category?.categoryName ?? 'Seleccione una categoría'}
                    </span>
                    <img
                      src={arrow}
                      alt="arrow-icon"
                      className={styles.arrowSelect}
                    />
                  </div>
                  <div
                    className={toggleCategory ? styles.options : styles.hidden}
                  >
                    {categoryList.map((element: any, index: number) => (
                      <span
                        onClick={() => setCategory(element)}
                        className={styles.option}
                        key={index}
                      >
                        {element.categoryName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.containerInput}>
              <div className={styles.categoriesSelect}>
                <div
                  className={styles.customSelect}
                  onClick={() => {
                    setToggleSubCategory(!toggleSubCategory);
                    setToggleCategory(false);
                  }}
                >
                  <div className={styles.selectTrigger}>
                    <span>
                      {subcategory?.name ?? 'Seleccione una subcategoría'}
                    </span>
                    <img src={arrow} alt="" className={styles.arrowSelect} />
                  </div>
                  <div
                    className={
                      toggleSubCategory ? styles.options : styles.hidden
                    }
                  >
                    {managementSubCategories.map((element: any, index: number) => (
                      <span
                        onClick={() => setSubcategory(element)}
                        className={styles.option}
                        key={index}
                      >
                        {`${element.code} - ${element.name}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.nextButton}>
            <button
              disabled={!category || !subcategory}
              onClick={() => {
                setProcessStatus(ProcesStatus.SECOND_PROCESS);
                const product = createProductsAndPrices(products, subcategory?.name, '--');
                setProducts([...products, product]);
              }}
            >
              Siguiente
              <img src={arrowRigth} alt="arrow-rigth" />
            </button>
          </div>
        </section>
      ) : (
        <section className={styles.procesTwo}>
          <CloseButton onClose={onClose} />
          <header>
            <h3>{`Crear productos en ${subcategory?.name}`}</h3>
          </header>
          <div className={styles.tableContainer}>
            <div>
              <div className={styles.thead}>{''}</div>
              <div className={styles.thead}>Producto</div>
              {products[0]?.prices.map((price, index) => (
                <div className={styles.thead} key={index}>
                  {formatPrice(price.name)}
                </div>
              ))}
            </div>
            <div>
              {products.map((product, productIndex) => (
                <div className={styles.row} key={productIndex}>
                  <span>{productIndex + 1}</span>
                  <input
                    type="text"
                    value={product.productName}
                    onChange={(e) => {
                      const updatedProducts = [...products];
                      updatedProducts[productIndex].productName = e.target.value;
                      setProducts(updatedProducts);
                    }}
                    className={styles.inputEditable}
                  />
                  {product.prices.map((price, priceIndex) => (
                    <input
                      key={priceIndex}
                      type="number"
                      value={price.price.toFixed(2)}
                     maxLength={10}
                      onChange={(e) => {
                        const updatedProducts = [...products];
                        updatedProducts[productIndex].prices[priceIndex].price =
                          parseFloat(e.target.value) || 0;
                        setProducts(updatedProducts);
                      }}
                      className={styles.inputEditable}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <footer>
            <button
              onClick={() => {
                const product = createProductsAndPrices(products, subcategory?.name, '--');
                setProducts([...products, product]);
              }}
            >
              <img src={addIcon} alt="" />
              Agregar nuevo producto
            </button>
            <div>
              <button
                onClick={() => setProcessStatus(ProcesStatus.FIRST_PROCESS)}
              >
                <img src={arrowLeft} alt="arrow-left" />
                Regresar
              </button>
              <SaveButton action={() => {
                createProductNuevo(products)
               confirmChanges.openModal();
                
              }} />
            </div>
          </footer>
          {
            confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES && <ConfirmChangesModal isOpen={isOpen} onClose={onClose} loading={isLoading} errors={error} > Cambios guardados</ConfirmChangesModal>
          }
        </section>
      )}
    </div>
  );
}
