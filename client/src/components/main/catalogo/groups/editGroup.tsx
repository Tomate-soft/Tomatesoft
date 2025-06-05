import RequestButton from '@/components/customElements/saveButton/savebutton';
import styles from './editGroup.module.css';
import CloseButton from '@/components/customElements/CloseButton';
import { useAdditions } from '@/hooks/useAdditions';
import { useEffect, useState } from 'react';
import OnOffCheckBox from '@/components/customElements/onOffCheckBox/onOffCheckBox';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';

interface Props {
  data: any;
  action: () => void;
}

export default function EditGroup({ data, action }: Props) {
  const { modifiers, dishes, updateGroup, isLoading, error } = useAdditions();
  const [modifiers_, setModifiers_] = useState([]);

  const [dishes_, setDishes_] = useState([]);

  const confirmChanges = useModal(CONFIRM_CHANGES);
  useEffect(() => {
    setModifiers_(data.modifiers.map((item) => item._id));
    setDishes_(data.dishes.map((item) => item._id));
  }, []);

  return (
    <div className={styles.screen}>
      <div>
        <CloseButton onClose={action} />
        <header>Editar grupo</header>
        <main>
          <div>
            <h3>General</h3>
            <input type="text" placeholder={`${data.groupName}`} />
          </div>
          <div>
            <div>
              <header>Complementos</header>
              <main>
                {dishes?.map((dishes, index) => (
                  <label htmlFor="">
                    <OnOffCheckBox
                      state={dishes_.includes(dishes._id)}
                      action={() => {
                        if (dishes_.includes(dishes._id)) {
                          setDishes_(
                            dishes_.filter((item) => item !== dishes._id),
                          );
                        } else {
                          setDishes_([...dishes_, dishes._id]);
                        }
                      }}
                    />
                    <span>{dishes?.dishesName}</span>
                  </label>
                ))}
              </main>
            </div>
            <div>
              <header>Modificadores</header>
              <main>
                {modifiers?.map((element, index) => (
                  <label htmlFor="">
                    <OnOffCheckBox
                      state={modifiers_.includes(element._id)}
                      action={() => {
                        if (modifiers_.includes(element._id)) {
                          setModifiers_(
                            modifiers_.filter((item) => item !== element._id),
                          );
                        } else {
                          setModifiers_([...modifiers_, element._id]);
                        }
                      }}
                    />
                    <span>{element?.modifierName}</span>
                  </label>
                ))}
              </main>
            </div>
          </div>
        </main>
        <footer>
          <RequestButton
            action={() => {
              updateGroup(data._id, {
                name: data.name,
                modifiers: modifiers_,
                dishes: dishes_,
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
            >
              Cambios guardados
            </ConfirmChangesModal>
          )}
      </div>
    </div>
  );
}
