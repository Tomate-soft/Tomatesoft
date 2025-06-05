import { Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function addNotification(text: string) {
  toast.success(text, {
    position: 'bottom-right',
    autoClose: 450,
    hideProgressBar: false, // Mantenemos visible la barra de progreso, pero la ocultamos con CSS
    closeOnClick: true,
    pauseOnHover: true,
    closeButton: false,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Flip,
    style: {
      background: '#353639',
      color: 'white',
      boxShadow: '0px 0px 12px 0px #00000040',
      width: 'fit-content',
      whiteSpace: 'nowrap',
      bottom: '16px',
      right: '8vw',
      padding: '32px',
      borderRadius: '16px',
    },
    progressStyle: {
      backgroundColor: '#4caf50', // Estiliza la barra animada
      height: '8px', // Ajusta la altura
      borderRadius: '16px',
      margin: '8px',
      width: '360px', // Ajusta los bordes si es necesario
    },
  });
}
