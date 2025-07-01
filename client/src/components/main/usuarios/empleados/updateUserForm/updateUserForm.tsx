import CloseButton from '@/components/customElements/CloseButton';
import styles from './updateUserForm.module.css';
import { useEffect, useState } from 'react';
import EmployeeAvatar from '@/components/customElements/avatar/employeeAvatar/employeeAvatar';
import InputBox from '@/components/inputBox/inputBox';
import disquetIcon from '@/assets/public/disquetIcon.svg';
import useProfileStore from '@/zstore/profile.store';
import { useUsersStore } from '@/zstore/users.store';
import { CONFIRM_CHANGES } from '@/configs/consts';
import { useModal } from '@/hooks/useModals';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';

interface Props {
  onClose: () => void;
  employee: any;
}

export default function UpdateUserForm({ onClose, employee }: Props) : JSX.Element {

    const [employeeData, setEmployeeData] = useState(employee);
    const { name, lastName, employeeNumber, active, role, shift } = employeeData;
    const profiles = useProfileStore((state) => state.profiles);
    const getProfiles = useProfileStore((state) => state.getProfiles);
    const updateUser = useUsersStore((state) => state.updateUser);
    const isLoadingUpdateUser = useUsersStore((state) => state.isLoading);
    const errorsUpdateUser = useUsersStore((state) => state.errors);
    const confirmChanges = useModal(CONFIRM_CHANGES);

    useEffect(() => {
        console.log(employeeData);
        getProfiles();
    }, []);
   
  return (
    <main className={styles.screen}>
      <div> 
        <header>
            <CloseButton onClose={onClose} />
            <EmployeeAvatar name={employee.name} color={employee.color} />
            <h3>{employee.name}</h3>
        </header>
        <main>
            <InputBox label="Nombre" value={name} onChange={(value) => setEmployeeData({ ...employeeData, name: value })} />
            <InputBox label="Apellido" value={lastName} onChange={(value) => setEmployeeData({ ...employeeData, lastName: value })} />
            <InputBox label="Código" value={employeeNumber} onChange={(value) => setEmployeeData({ ...employeeData, employeeNumber: value })} />
            <InputBox label="Perfil" value={role} onChange={(value) => {
              setEmployeeData({ ...employeeData, role: value });
            }} options={profiles} keys="profileName" />
            <InputBox label="Turno" value={shift} onChange={(value) => setEmployeeData({ ...employeeData, shift: value })} />
            {/* <InputBox label="Fecha de ingreso" value={entryDate} onChange={(value) => setEmployeeData({ ...employeeData, entryDate: value })} /> */}
        </main>
        <footer>
            <button onClick={() => {
              const data = { name, lastName, employeeNumber, active, role: role._id, shift};
                updateUser(employee._id, data);
                confirmChanges.openModal();
            }}><img src={disquetIcon} alt="disquet-icon"  />Guardar</button>
        </footer>
        {
        confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
          <ConfirmChangesModal
            loading={isLoadingUpdateUser}
            errors={errorsUpdateUser}
            isOpen={confirmChanges.isOpen}
            onClose={confirmChanges.closeModal}
            // actionType={updateUser}
            closeModal={confirmChanges.closeModal}
          >
            Actualización exitosa
          </ConfirmChangesModal>
        ) : null
      }
      </div>
    </main>
  );
} 