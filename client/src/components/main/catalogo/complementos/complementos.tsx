import styles from './complementos.module.css';

// hooks
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../../hooks/useModals';

// icons
import exportIcon from '../../../../assets/public/exportIcon.svg';
import importIcon from '../../../../assets/public/importIcon.svg';
import createIcon from '../../../../assets/public/createIcon.svg';
import update from '../../../../assets/categorias/updateIcon.svg';
import deleteIcon from '../../../../assets/categorias/bloquedIcon.svg';
import enabledIcon from '../../../../assets/public/enabledIcon.svg';
import filterIcon from '../../../../assets/public/filterIcon.svg';
import searchIcon from '../../../../assets/public/searchIcon.svg';

// Actions
import {
  getDishesAction,
  searchDishesAction,
} from '../../../../redux/actions/catalogo/dishesActions/getDishes';
import { discontinueDishesAction } from '../../../../redux/actions/catalogo/dishesActions/discontinueDishes';

// Components
import UploadFiles from '../../../forms/uploadFile/uploadFile';
import CreateDishesModal from './forms/createDishes';
import { exportToExcel } from '../../../../utils/exporter';
import ConfirmChangesModal from '../../../modals/confimChanges/confirmChanges';
import EditDishes from './editDishes/EditDishes';
import  useDishesStore  from '@/zstore/dishes';

export default function Complementos() {
  const { loading } = useSelector((state) => state.dishes);
  const { error } = useSelector((state) => state.dishes);


  // MODALS
  const confirmChanges = useModal('confirmChanges');
  const uploadPayment = useModal('uploadPayment');
  const savePayments = useModal('savePayments');
  const createDishes = useModal('createDishes');
  const editDishes = useModal('editDishes');

  const dispatch = useDispatch();
  const { allDishes } = useSelector((state) => state.dishes);

  const toggleStatus = (id, body) => {
    dispatch(discontinueDishesAction(id, body));
  };

  // Events
  const handleChange = (event) => {
    event.preventDefault();
    const searchValue = event.target.value;
    if (searchValue.length < 1) {
      dispatch(getDishesAction());
    }
    dispatch(searchDishesAction(searchValue));
  };

  const [selectedDish, setSelectedDish] = useState({});

  useEffect(() => {
    dispatch(getDishesAction());
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.head}>
        <h2>Complementos</h2>
        <div>
          <button
            className={styles.btnHead}
            onClick={() => {
              exportToExcel(allDishes);
            }}
          >
            <img src={exportIcon} alt="export-icon" />
            Exportar complementos
          </button>
          <button className={styles.btnHead} onClick={uploadPayment.openModal}>
            <img src={importIcon} alt="import-icon" />
            Importar complementos
          </button>
          <button
            className={styles.btnHeadCreate}
            onClick={createDishes.openModal}
          >
            <img src={createIcon} alt="create-icon" />
            <span>Crear complemento</span>
          </button>
          {uploadPayment.isOpen &&
          uploadPayment.modalName === 'uploadPayment' ? (
            <UploadFiles
              openModal={savePayments.openModal}
              isOpen={uploadPayment.isOpen}
              onClose={uploadPayment.closeModal}
              actionType={createDishes}
            >
              Cargar plantilla de complementos
            </UploadFiles>
          ) : null}
          {createDishes.isOpen && createDishes.modalName === 'createDishes' ? (
            <CreateDishesModal
              isOpen={createDishes.isOpen}
              onClose={createDishes.closeModal}
              openModal={confirmChanges.openModal}
            >
              Crear complemento
            </CreateDishesModal>
          ) : null}
          {confirmChanges.isOpen &&
          confirmChanges.modalName === 'confirmChanges' ? (
            <ConfirmChangesModal
              loading={loading}
              errors={error}
              isOpen={confirmChanges.isOpen}
              onClose={confirmChanges.closeModal}
              actionType={getDishesAction}
            >
              Cambios guardados
            </ConfirmChangesModal>
          ) : null}
          {
            editDishes.isOpen && editDishes.modalName === 'editDishes' ? <EditDishes dish={selectedDish} onClose={editDishes.closeModal} isOpen={editDishes.isOpen}  /> : null
          }
        </div>
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
            <span>Complementos</span>
          </div>
          <div className={styles.searchContainer}>
            <button className={styles.categoryButton}>
              <img src={filterIcon} alt="categories-button" />
              <span>Categorias</span>
            </button>
            <button className={styles.sellTypeButton}>
              <img src={filterIcon} alt="sell-types" />
              <span>Tipo de venta</span>
            </button>
            <button className={styles.stateButton}>
              <img src={filterIcon} alt="state" />
              <span>Estado</span>
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
                placeholder="Ejemplo de complemento"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.tHeadCategoria}>Categoria</th>
              <th className={styles.tHeadClave}>Clave</th>
              <th className={styles.tHeadComplemento}>Complemento</th>
              <th className={styles.tHeadVenta}>Restaurante</th>
              <th className={styles.tHeadActions}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allDishes?.map((element, index) => (
              <tr
                key={index}
                className={
                  element.status === 'disabled'
                    ? styles.rowDisabled
                    : styles.release
                }
              >
                <td className={styles.tableRows}>{element.category}</td>
                <td className={styles.tableRows}>{element.code}</td>
                <td className={styles.tableRows}>{element.dishesName}</td>
                <td className={styles.tableRows}>{element.priceToGo}</td>
                <td className={styles.buttonsContainer}>
                  {element.status === 'enabled' ? (
                    <>
                      <button className={styles.actionButtonsFirst} onClick={()=> {
                        setSelectedDish(element);
                        editDishes.openModal();
                      }}>
                        <img src={update} alt="update-icon" />
                      </button>
                      <button
                        className={styles.actionButtonsSecond}
                        onClick={() => {
                          toggleStatus(element._id, element.status);
                        }}
                      >
                        <img src={deleteIcon} alt="delete-icon" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className={styles.actionButtonsFirstEnabled}>
                        <img src={update} alt="update-icon" />
                      </button>
                      <button
                        className={styles.actionButtonsSecond}
                        onClick={() => {
                          toggleStatus(element._id, element.status);
                        }}
                      >
                        <img src={enabledIcon} alt="enabled-icon" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tableFooter}></div>
      </section>
    </div>
  );
}
