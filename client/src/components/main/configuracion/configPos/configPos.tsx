import { useState } from 'react';
import styles from './configPos.module.css';
import { IMPRESORAS, NOTIFICACIONES, POS_CONFIGS, TERMINALES } from './const';
import { useModal } from '@/hooks/useModals';
import NotificationsConfig from './notificationsConfig/notificationsConfig';
import { CAJA_CHICA } from '../const';
import CashFloatConfig from '../cashFLoatConfig/cashFLoatConfig';
import DevicesConfig from './Devices/DevicesConfig';
import PrintersConfig from './Printers/PrintersConfig';

export default function ConfigPos() {
  const [openModal, setOpenModal] = useState('');
  const $openModal = useModal(openModal);

  return (
    <div className={styles.container}>
      <h1>Configuracion</h1>
      <div>
        {POS_CONFIGS.map((item, index) => (
          <div
            className={styles.cardAdminConfig}
            key={index}
            onClick={() => {
              setOpenModal(item.type);
              $openModal.openModal();
            }}
          >
            <div className={styles.icon}>
              <img src={item.path} alt="icon" />
            </div>
            <h4>{item.name}</h4>
          </div>
        ))}
        {$openModal.isOpen && $openModal.modalName === NOTIFICACIONES ? (
          <NotificationsConfig
            isOpen={$openModal.isOpen}
            onClose={$openModal.closeModal}
          >
            Notificaciones
          </NotificationsConfig>
        ) : $openModal.isOpen && $openModal.modalName === CAJA_CHICA ? (
          <CashFloatConfig
            isOpen={$openModal.isOpen}
            onClose={$openModal.closeModal}
          >
            Caja chica
          </CashFloatConfig>
        ) : $openModal.isOpen && $openModal.modalName === TERMINALES ? (
          <DevicesConfig
            isOpen={$openModal.isOpen}
            onClose={$openModal.closeModal}
          >
            Terminales
          </DevicesConfig>
        )  : $openModal.isOpen && $openModal.modalName ===  IMPRESORAS ? (
          <PrintersConfig
            isOpen={$openModal.isOpen}
            onClose={$openModal.closeModal}
          >
            Impresoras
          </PrintersConfig>
        )  : null}
      </div>
    </div>
  );
}
