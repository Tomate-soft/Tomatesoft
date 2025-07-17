import styles from './empleados.module.css';
// Hook
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// icons
import createIcon from '../../../../assets/public/createIcon.svg';
import update from '../../../../assets/public/updateIcon.svg';
import deleteIcon from '../../../../assets/public/bloquedIcon.svg';
import enabledIcon from '../../../../assets/public/enabledIcon.svg';
import searchIcon from '../../../../assets/categorias/searchIcon.svg';

// Actions
import { discontinueMenusAction } from '../../../../redux/actions/catalogo/menusYRecipes/discontinueMenus';
import { useModal } from '../../../../hooks/useModals';
import Register from './regiter/register';
import ConfirmChangesModal from '../../../modals/confimChanges/confirmChanges';
import { getDepartamentsAction } from '../../../../redux/actions/usuarios/departamentsActions/getDepartaments';
import { getUsersAction } from '../../../../redux/actions/auth';
import { SearchBar } from '@/components/customElements/searchBar/SearchBar';
import UpdateUserForm from './updateUserForm/updateUserForm';

enum ModalOptions {
  INITIAL_STATE = "INITIAL_STATE",
  UPDATE_USER_STATE = "UPDATE_USER_STATE"
}

export default function Empleados() {
  const [modalState, setModalState] = useState(ModalOptions.INITIAL_STATE);
  const [ selectedEmployee, setSelectedEmployee ] = useState({});
  const [filteredUsers, setFilteredUsers] = useState<string>("");
  const [employee, setEmployee] = useState({});
  const register = useModal('register');
  const confirmChanges = useModal('confirmChanges');
  const dispatch = useDispatch();
  const { isLoadingRegister, errorsRegister } = useSelector(
    (state) => state.auth,
  );
  const { allUsers } = useSelector((state) => state.auth);

  const toggleStatus = (id, body) => {
    dispatch(discontinueMenusAction(id, body));
  };

  const handleChange = (args: any) => {
    setEmployee(args);
  };

  const filterUsers = allUsers?.filter((user: any) => { 
    return user.name.toLowerCase().includes(filteredUsers.toLowerCase()) ||
           user.lastName.toLowerCase().includes(filteredUsers.toLowerCase()) ||
            user.employeeNumber.toString().includes(filteredUsers.toLowerCase());
  }
  );
  useEffect(() => {
    dispatch(getUsersAction());
  }, []);
  return (
    <div className={styles.container}>
      {register.isOpen && register.modalName === 'register' ? (
        <Register
          openModal={confirmChanges.openModal}
          currentEmployee={employee}
          setEmployee={handleChange}
          onClose={register.closeModal}
          isOpen={register.isOpen}
        >
          Registrar
        </Register>
      ) : null}
      {confirmChanges.isOpen &&
      confirmChanges.modalName === 'confirmChanges' ? (
        <ConfirmChangesModal
          loading={isLoadingRegister}
          errors={errorsRegister}
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
          actionType={getUsersAction}
          closeModal={register.closeModal}
        >
          Registro del usuario exitoso
        </ConfirmChangesModal>
      ) : null }
      <section className={styles.head}>
        <h2>Empleados</h2>
        <div>
          <button
            className={styles.btnHeadCreate}
            onClick={() => {
              register.openModal();
            }}
          >
            <img src={createIcon} alt="create-icon" />
            <span>Registro</span>
          </button>
        </div>
      </section>
      <section className={styles.mainSection}>
        <div>
          <SearchBar width='600px' onSearch={(value: string) => {
            setFilteredUsers(value);
          }} onClear={filteredUsers.length > 0} value={filteredUsers} placeholder="Buscar por nombre, apellido o código"  />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tHeadCode}>Código</th>
              <th className={styles.tHeadName}>Nombre completo</th>
              <th className={styles.tHeadStatus}>Estatus</th>
              <th className={styles.tHeadProfile}>Perfil</th>
              <th className={styles.tHeadShift}>Turno</th>
              <th className={styles.tHeadCreatedAt}>Fecha de ingreso</th>
              <th className={styles.tHeadActions}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(filteredUsers.length > 0 ? filterUsers : allUsers)?.map(
              (element: any) =>
                !element.employeeNumber.toString().startsWith('10') && (
                  <tr
                    key={element._id}
                    className={
                      element.status === 'disabled'
                        ? styles.rowDisabled
                        : styles.release
                    }
                  >
                    <td className={styles.tableRows}>
                      {element.employeeNumber}
                    </td>
                    <td className={styles.tableRows}>
                      {element.name
                        .toUpperCase()
                        .concat(` ${element.lastName.toUpperCase()}`)}
                    </td>
                    <td className={styles.tableRows}>
                      {element.active ? 'activo' : 'No activo'}
                    </td>
                    <td className={styles.tableRows}>
                      {element.role?.role?.name}
                    </td>
                    <td className={styles.tableRows}>{element.shift}</td>
                    <td className={styles.tableRows}>{element.entryDate}</td>
                    <td className={styles.buttonsContainer}>
                      {element.status === 'enabled' ? (
                        <>
                          <button className={styles.actionButtonsFirst}>
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
                          <button className={styles.actionButtonsFirstEnabled} onClick={() => {
                            setSelectedEmployee(element);
                            setModalState(ModalOptions.UPDATE_USER_STATE);
                          }}>
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
                ),
            )}
          </tbody>
        </table>
        <div className={styles.tableFooter}></div>
      </section>
      {
        modalState === ModalOptions.UPDATE_USER_STATE && <UpdateUserForm onClose={() => setModalState(ModalOptions.INITIAL_STATE)} employee={selectedEmployee} />
      }
    </div>
  );
}
