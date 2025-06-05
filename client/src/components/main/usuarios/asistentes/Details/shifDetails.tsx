import CloseButton from '@/components/customElements/CloseButton';
import styles from './shiftDetails.module.css';
import RequestButton from '@/components/customElements/saveButton/savebutton';
import clockIcon from '@/assets/public/clockIcon.svg';
import { useEffect, useState } from 'react';
import editIcon from '@/assets/public/editPencil.svg';
import { UseDailyRegisterStore } from '@/zstore/dailyRegister.store';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';

interface Props {
  onClose: () => void;
  content: any;
}

export default function ShiftDetails({ onClose, content }: Props) {
  const [edit, setEdit] = useState<boolean>(false);
  const [currentShift, setCurrentShift] = useState(content);
  const updateRegister = UseDailyRegisterStore((state) => state.updateRegister);
  const isLoading = UseDailyRegisterStore((state) => state.isLoading);
  const error = UseDailyRegisterStore((state) => state.error);
  const confirmChanges = useModal(CONFIRM_CHANGES);

  useEffect(() => {
    setCurrentShift(content);
  }, []);

  return (
    <main className={styles.screen}>
      <div>
        <CloseButton onClose={onClose} />
        <header>
          <h1>Detalle de turno</h1>
        </header>
        {edit ? (
          <main>
            <section>
              <div>
                <label>
                  Entrada
                  <div
                    style={{
                      boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    <input
                      type="time"
                      onChange={(e) => {
                        setCurrentShift({
                          ...currentShift,
                          startOfShift: e.target.value,
                        });
                      }}
                    />
                    <img src={clockIcon} alt="clock" />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Descanso
                  <div
                    style={{
                      boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    <input
                      type="time"
                      onChange={(e) => {
                        setCurrentShift({
                          ...currentShift,
                          startOfBreak: e.target.value,
                        });
                      }}
                    />
                    <img src={clockIcon} alt="clock" />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Regreso
                  <div
                    style={{
                      boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    <input
                      type="time"
                      onChange={(e) => {
                        setCurrentShift({
                          ...currentShift,
                          endOfBreak: e.target.value,
                        });
                      }}
                    />
                    <img src={clockIcon} alt="clock" />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Salida
                  <div
                    style={{
                      boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    <input
                      type="time"
                      onChange={(e) => {
                        setCurrentShift({
                          ...currentShift,
                          endOfShift: e.target.value,
                        });
                      }}
                    />
                    <img src={clockIcon} alt="clock" />
                  </div>
                </label>
              </div>
            </section>
          </main>
        ) : (
          <main style={{ opacity: '0.8' }}>
            <section>
              <div>
                <label htmlFor="">
                  Entrada
                  <div>
                    <input
                      type="time"
                      value={`${currentShift.startOfShift.split(':')[0]}:${
                        currentShift.startOfShift.split(':')[1]
                      }`}
                    />
                    <img src={clockIcon} alt="clock" />
                  </div>
                </label>
              </div>
              <div>
                <label htmlFor="">
                  Descanso
                  <div>
                    <input
                      type="time"
                      value={`${currentShift.startOfBreak.split(':')[0]}:${
                        currentShift.startOfBreak.split(':')[1]
                      }`}
                    />
                    <img src={clockIcon} alt="clock" />
                  </div>
                </label>
              </div>
              <div>
                <label htmlFor="">
                  Regreso
                  <div>
                    <input
                      type="time"
                      value={`${currentShift.endOfBreak.split(':')[0]}:${
                        currentShift.endOfBreak.split(':')[1]
                      }`}
                    />
                    <img src={clockIcon} alt="clock" />
                  </div>
                </label>
              </div>
              <div>
                <label>
                  Salida
                  <div>
                    <input
                      type="time"
                      value={`${currentShift.endOfShift.split(':')[0]}:${
                        currentShift.endOfShift.split(':')[1]
                      }`}
                    />
                    <img src={clockIcon} alt="clock" />
                  </div>
                </label>
              </div>
            </section>
          </main>
        )}
        <footer>
          <button onClick={() => setEdit(!edit)}>
            <img src={editIcon} alt="editar" /> Editar{' '}
          </button>
          <RequestButton
            isDisable={!edit}
            action={() => {
              updateRegister(content._id, currentShift);
              confirmChanges.openModal();
              console.log(currentShift, content._id);
            }}
          />
        </footer>
        {confirmChanges.isOpen && (
          <ConfirmChangesModal
            onClose={confirmChanges.closeModal}
            closeModal={onClose}
            isOpen={confirmChanges.isOpen}
            loading={isLoading}
            errors={error}
          />
        )}
      </div>
    </main>
  );
}
