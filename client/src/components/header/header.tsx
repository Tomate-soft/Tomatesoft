import styles from './header.module.css';
import notification from '../../assets/header/notificacion.svg';
import logo from '../../assets/header/tomateLogo.svg';
import avatar from '../../assets/header/avatar.svg';
import TransparentSelect from '../customElements/TransparentSelect/TransparentSelect';
// hooks

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} className={styles.tomateLogo} alt="tomate-logo" />
      </div>
      <div className={styles.right}>
        <div className={styles.userContainer} >
          <img src={notification} className={styles.noti} alt="notificacion" />
         <TransparentSelect >
         </TransparentSelect> 
        </div>
        <div className={styles.perfil}>
          <img src={avatar} className={styles.avatar} alt="" />
        </div>
      </div>
    </header>
  );
}

