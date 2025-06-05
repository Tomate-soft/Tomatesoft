import { useState } from 'react';
import styles from './limitSelect.module.css';
import arrow from '@/assets/public/arrow.svg';

export default function LimitSelect() {
  const [toggleStatus, setToggleStatus] = useState(false);
  const [value, setValue] = useState<string | number>('Todos');

  const LIMITS = [
    { value: 0, label: 'Todos' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 40, label: '40' },
    { value: 50, label: '50' },
    { value: 100, label: '60' },
  ];

  return (
    <div className={styles.containerInput}>
      <div className={styles.categoriesSelect}>
        <div
          className={styles.customSelect}
          onClick={() => {
            setToggleStatus(!toggleStatus);
          }}
        >
          <div className={styles.selectTrigger}>
            <span> {value} </span>
            <img src={arrow} alt="" className={styles.arrowSelect} />
          </div>
          <div className={toggleStatus ? styles.options : styles.hidden}>
            {LIMITS.map((element, index) => {
              return (
                <span
                  className={styles.option}
                  key={index}
                  onClick={() => {
                    setToggleStatus(false);
                    setValue(element.value);
                  }}
                >
                  {element.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
