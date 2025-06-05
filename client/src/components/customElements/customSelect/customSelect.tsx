import { useState } from 'react';
import arrow from '@/assets/public/arrow.svg';
import styles from './customSelect.module.css';
import { PaymentsTypesOptions } from '@/types/paymentsTypes';
import { formatPayMethods } from '@/utils/formatPayMethod';
interface Prop {
  width?: string;
  initialValue: string;
  dropDownName: string | number;
  componentId: string | number;
  setDropDownName: (args: string | number) => void;
  action?: () => void;
  element: any;
}

export default function CustomSelect({
  initialValue,
  width,
  dropDownName,
  componentId,
  setDropDownName,
  action,
  element,
}: Prop) {
  const [value, setValue] = useState(initialValue);
  const [toggleStatus, setToggleStatus] = useState(false);

  const style = {
    minWidth: width,
  };

  return (
    <div className={styles.containerInput} style={style}>
      <div className={styles.categoriesSelect}>
        <div
          className={styles.customSelect}
          onClick={() => {
            if (dropDownName === componentId) {
              setToggleStatus(!toggleStatus);
              return;
            }
            setToggleStatus(true);
            setDropDownName(componentId);
          }}
        >
          <div className={styles.selectTrigger}>
            <span>{formatPayMethods(element.paymentType)}</span>
            <img src={arrow} alt="" className={styles.arrowSelect} />
          </div>
          <div
            className={
              toggleStatus && dropDownName === componentId
                ? styles.options
                : styles.hidden
            }
          >
            {Object.values(PaymentsTypesOptions).map((pay, index) => {
              const method = formatPayMethods(pay);
              return (
                <div
                  key={index}
                  className={styles.option}
                  onClick={() => {
                    if (
                      action &&
                      method !== formatPayMethods(element.paymentType)
                    ) {
                      action();
                    }
                    setToggleStatus(false);
                    setDropDownName(componentId);
                    element.paymentType = pay;
                  }}
                >
                  {method}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
