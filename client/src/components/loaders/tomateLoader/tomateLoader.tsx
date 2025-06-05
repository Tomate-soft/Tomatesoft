import styles from './tomateLoader.module.css';
import tomateLogo from '@/assets/public/tomateFavIcon.svg';

const TomateLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.dot}></div>
        <div className={styles.dot}>
          <img src={tomateLogo} style={{ width: '100%' }} />
        </div>
        <div className={styles.dot}></div>
      </div>
      <span> Cargando...</span>
    </div>
  );
};

export default TomateLoader;
