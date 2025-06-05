import styles from './processLoader.module.css';


export default function ProcessLoader() {
    return (
        <>
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p>Procesando</p>
        </div>
        </>

    )
}
