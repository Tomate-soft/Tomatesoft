import CloseButton from '@/components/customElements/CloseButton';
import styles from './editProfile.module.css';
import RequestButton from '@/components/customElements/saveButton/savebutton';
import disquetIcon from '../../../../../assets/public/disquetIcon.svg';
import arrow from '../../../../../assets/public/arrow.svg';
import { useEffect, useState } from 'react';
import { getDepartamentsAction } from '@/redux/actions/usuarios/departamentsActions/getDepartaments';
import useDepartamentsStore from '@/zstore/departaments.store';
import useProfileStore from '@/zstore/profile.store';
import useRoleStore from '@/zstore/role.store';
import { formatRoleName } from '../create/createDepartament/formatRoleName';
import { CONFIRM_CHANGES } from '@/configs/consts';
import { useModal } from '@/hooks/useModals';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';

interface Props {
  onClose: ()=> void;
  children: string;
  profile: any;
}

export default function EditProfile({
  onClose,
  children,
  profile,
}: Props) {
    const [toggleStatus, setToggleStatus] = useState(false);
    const departaments = useDepartamentsStore((state) => state.departaments);
    const getDepartaments = useDepartamentsStore((state) => state.getDepartaments);
    const updateProfile = useProfileStore((state) => state.updateProfile);
    const isLoading = useProfileStore((state) => state.isloading);
    const error = useProfileStore((state) => state.error);
    const roles = useRoleStore((state) => state.roles);
    const getRoles = useRoleStore((state) => state.getRoles);
    const [selectedRol, setSelectedRol] = useState(null);
    const [selectedDepartament, setSelectedDepartament] = useState(null);
    const [ profileName, setProfileName ] = useState(profile?.profileName);
    const confirmChanges = useModal(CONFIRM_CHANGES);

    const sendData = {
      departament: [selectedDepartament],
      profileName: profileName,
      role: selectedRol?._id
    }
    const getProfiles = useProfileStore((state) => state.getProfiles);


    useEffect(() => {
        setSelectedRol(profile?.role ?? null);
        setSelectedDepartament(profile?.departament[0]?._id ?? null);
        getDepartaments();
        getRoles();
    }, []);

  return (
    <main className={styles.screen}>
      <div>
        <header>
        <CloseButton onClose={onClose} />
        <h2>{children}</h2>
        </header>
        <main>
            <div>
                <main>
                <div className={styles.containerInput}>
                    <div className={styles.categoriesSelect}>
                        <div className={styles.customSelect} onClick={()=>{setToggleStatus(!toggleStatus)}}>
                            <div className={styles.selectTrigger}>
                                <span>{formatRoleName(selectedRol?.value) ?? "Rol"} </span>
                                <img src={arrow} alt="" className={styles.arrowSelect} />
                            </div>
                            <div className={toggleStatus ? styles.options : styles.hidden}>
                                {
                                    roles?.map((element, index) => (
                                        <span className={styles.option} key={index} onClick={()=>{setToggleStatus(false), setSelectedRol(element)}}>
                                            {formatRoleName(element.value)}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <input type="text" value={profileName} onChange={(e)=>{setProfileName(e.target.value)}} />
                <div>
                {
                departaments?.map((element: any, index: any) => (
                    <div key={index} className={styles.departamentBox}>
                      <input
                        type="radio"
                        name="departament"
                        checked={selectedDepartament === element._id}
                        onClick={() => {
                          setSelectedDepartament(element._id);
                        }}
                      />
                      <input
                        type="text"
                        readOnly
                        value={element.departamentName}
                      />
                    </div>
                  ))}
                </div>
                </main>
                <footer>
                    <button onClick={()=> {
                      console.log(sendData);
                      confirmChanges.openModal();
                      updateProfile(profile._id, sendData);
                    }}>
                        <img src={disquetIcon} alt="delete-icon" />
                        <span>Guardar</span>
                    </button>
                </footer>
            </div>
        </main>
        {
          confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
            <ConfirmChangesModal
              isOpen={confirmChanges.isOpen}
              onClose={confirmChanges.closeModal}
              loading={isLoading}
              errors={error}
              closeModal={onClose}
            >
              Perfil guardado con exito
            </ConfirmChangesModal>
          ) : null
        }
      </div>
    </main>
  );
}