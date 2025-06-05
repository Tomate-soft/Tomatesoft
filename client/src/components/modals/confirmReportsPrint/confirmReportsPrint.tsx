import styles from './confirmReports.module.css';
import { useDispatch } from 'react-redux';
import checkIcon from '../../../assets/public/checkIcon.svg';
import errorIcon from '../../../assets/public/errorIcon.svg';
import { useNavigate } from 'react-router-dom';
import ProcessLoader from '@/components/loaders/processLoader/processLoader';

interface Props {
  loading: boolean;
  errors: Error | string | null;
  isOpen: boolean;
  onClose: () => void;
  children?: string;
  actionType?: () => void;
  route?: string;
  closeModal?: any;
  conflict?: any;
  isInteractive?: boolean;
}

export default function ConfirmReportsModal({
  loading,
  errors,
  isOpen,
  onClose,
  children,
  actionType,
  route,
  closeModal,
  conflict,
  isInteractive
}: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;
  if (!loading && !errors) {
    setTimeout(async () => {
      if (actionType) {
        dispatch(actionType());
      }
      onClose();
      if (route) {
        navigate(route);
      }
      if (closeModal) {
        closeModal();
      }
    }, 1500);
  } else if (!loading && errors) {
    setTimeout(async () => {
      if (actionType) {
        dispatch(actionType());
      }
      if (route) {
        navigate(route);
      }
      if (closeModal) {
        closeModal();
      }
      onClose();
    }, 1500);
  }
  return (
    <main className={styles.container}>

      <div className={styles.modal} style= {loading ? { backgroundColor: 'transparent' } : {}}>
      {loading ? (
        <ProcessLoader />
      ) : errors ? (
        <div>
          <img src={errorIcon} alt="check-icon" />
          <h1 className={styles.tittle}>No se pudo completar</h1>
        </div>
      ) : (
        <div>
          <div>
          <img src={checkIcon} alt="check-icon" />
         <div>
         {!isInteractive && <h1 style={{fontSize: "32px", fontWeight: "200"}} className={styles.tittle}>{children}</h1>}
          {
            isInteractive && (
                <>
                <p>{children}</p>
                <div>
                <button onClick={actionType}>
                  Reimprimir
                </button>
                <button onClick={onClose}>
                  Cerrar
                </button>
                </div>
                </>
            )
          }
         </div>
        </div>
      </div>
    )}
        
      </div>
    </main>
  );
}
