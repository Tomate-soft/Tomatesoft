import styles from './perfiles.module.css';
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
import { getProfilesAction } from '../../../../redux/actions/usuarios/profilesActions/getProfiles';
import {
  CREATE_PROFILE,
  CONFIRM_CHANGES,
  CREATE_DEPARTAMENT,
  CONFIRM_SAVE_DEPARTAMENTS,
} from '../../../../configs/consts';
import { useModal } from '../../../../hooks/useModals';
import CreateProfile from './create/createProfile';
import ConfirmChangesModal from '../../../modals/confimChanges/confirmChanges';
import CreateDepartament from './create/createDepartament/createDepartament';
import { getDepartamentsAction } from '../../../../redux/actions/usuarios/departamentsActions/getDepartaments';
import EditProfile from './edit/editProfile';
import useProfileStore from '@/zstore/profile.store';
import { formatTempo } from '@/utils/tempoFormat';

enum ProcessProfile {
  INITIAL,
  EDIT
}

export default function Perfiles() {
  const dispatch = useDispatch();
 const profilesArray = useProfileStore((state) => state.profiles);
 const getProfiles = useProfileStore((state) => state.getProfiles);
  const { allDepartaments, errorDepartament, loadingDepartament } = useSelector(
    (state) => state.departaments,
  );
  const [process, setProcess ] = useState<ProcessProfile>(ProcessProfile.INITIAL)
  const createProfile = useModal(CREATE_PROFILE);
  const confirmChanges = useModal(CONFIRM_CHANGES);
  const createDepartament = useModal(CREATE_DEPARTAMENT);
  const confirmSaveDepartaments = useModal(CONFIRM_SAVE_DEPARTAMENTS);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const toggleStatus = (id, body) => {
    dispatch(discontinueMenusAction(id, body));
  };

  useEffect(() => {
    getProfiles();
    dispatch(getDepartamentsAction());
  }, []);
  return (
    <div className={styles.container}>
      {confirmSaveDepartaments.isOpen &&
      confirmSaveDepartaments.modalName === CONFIRM_SAVE_DEPARTAMENTS ? (
        <ConfirmChangesModal
          isOpen={confirmSaveDepartaments.isOpen}
          onClose={confirmSaveDepartaments.closeModal}
          errors={errorDepartament}
          loading={loadingDepartament}
          actionType={getDepartamentsAction}
        >
          Departamento creado exitosamente
        </ConfirmChangesModal>
      ) : null}
      {createDepartament.isOpen &&
      createDepartament.modalName === CREATE_DEPARTAMENT ? (
        <CreateDepartament
          isOpen={createDepartament.isOpen}
          onClose={createDepartament.closeModal}
          allDepartaments={allDepartaments}
          openModal={confirmSaveDepartaments.openModal}
          openModalProfile={confirmChanges.openModal}
        >
          Crear perfil
        </CreateDepartament>
      ) : null}
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
        <ConfirmChangesModal
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
          loading={loading}
          errors={error}
          conflict={conflict}
          route="/home/usuarios/profiles"
          closeModal={createProfile.closeModal}
          actionType={getProfilesAction}
        >
          Perfil guardado con exito
        </ConfirmChangesModal>
      ) : null}

      <section className={styles.head}>
        <h2>Perfiles</h2>
        <div>
          <button className={styles.btnHeadCreateDepartament}>
            <img src={createIcon} alt="create-icon" />
            <span onClick={createDepartament.openModal}>Crear</span>
          </button>
        </div>
      </section>
      <section className={styles.mainSection}>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchInputContainer}>
            <img
              src={searchIcon}
              alt="search-icon"
              className={styles.searchIcon}
            />
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Buscar de"
            />
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tHeadDepartament}>Departamento</th>
              <th className={styles.tHeadCode}>Clave del perfil</th>
              <th className={styles.tHeadProfile}>Perfil</th>
              <th className={styles.tHeadCreatedAt}>Ultima Actualizacion</th>
              <th className={styles.tHeadActions}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profilesArray?.map((element) => (
              <tr
                key={element._id}
                className={
                  element.status === 'disabled'
                    ? styles.rowDisabled
                    : styles.release
                }
              >
                <td className={styles.tableRows}>
                  {element.departament[0].departamentName}
                </td>
                <td className={styles.tableRows}>{element.code}</td>
                <td className={styles.tableRows}>{element.profileName}</td>
                <td className={styles.tableRows}>{formatTempo(element.createdAt)}</td>
                <td className={styles.buttonsContainer}>
                  {element.status === 'enable' ? (
                    <>
                      <button className={styles.actionButtonsFirst} onClick={()=>{ setSelectedProfile(element), setProcess(ProcessProfile.EDIT)}}>
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
                      <button className={styles.actionButtonsFirstEnabled} onClick={()=>{ setSelectedProfile(element), setProcess(ProcessProfile.EDIT)}}>
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
        {
          process === ProcessProfile.EDIT && <EditProfile onClose={()=> setProcess(ProcessProfile.INITIAL)} profile={selectedProfile}>Editar perfil</EditProfile>
        }
        <div className={styles.tableFooter}></div>
      </section>
    </div>
  );
}
