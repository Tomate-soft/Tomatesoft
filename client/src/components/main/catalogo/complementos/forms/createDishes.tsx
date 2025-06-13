import styles from './createDishes.module.css';
// Hooks
import { useState } from 'react';
//Icons
import arrow from './../../../../../assets/public/arrow.svg';
import arrowRigth from './../../../../../assets/public/arrowRigth.svg';
import { useDispatch } from 'react-redux';
import { createDishesAction } from '../../../../../redux/actions/catalogo/dishesActions/createDishes';
import CloseButton from '@/components/customElements/CloseButton';
import { set } from 'ref-napi';
import formatSellType from '@/components/main/utils/formatSellType';
interface Props {
  openModal: any;
  isOpen: any;
  onClose: any;
  children: any;
}
export default function CreateDishesModal({
  openModal,
  isOpen,
  onClose,
  children,
}: Props) {
  const dispatch = useDispatch();

  const [dishesName, setDishesName] = useState('');
  const [prices, setPrices] = useState([{
    name: "ON_SITE",
    price: 15,
  },
{
  name: "TOGO",
  price: 15,
},
{
  name: "PHONE",
  price: 15,
},
{
  name: "RAPPI",
  price: 15,
},
{
  name: "PRICE_LIST_FIVE",
  price: 15,
},
{
  name: "PRICE_LIST_SIX",
  price: 15,
},
{
  name: "PRICE_LIST_SEVEN",
  price: 15,
},
{
  name: "PRICE_LIST_EIGHT",
  price: 15,
},
{
  name: "PRICE_LIST_NINE",
  price: 15,
},
{
  name: "PRICE_LIST_TEN",
  price: 15,
},
]);
  

  return (
    <div className={styles.screen}>
      <section className={styles.modal}>
        <CloseButton onClose={onClose} />
        <h1 className={styles.tittle}>{children}</h1>
        <form action="" className={styles.form}> 
          <input
            type="text"
            className={styles.input}
            placeholder="Nombre del complemento"
            onChange={(e) => {
              setDishesName(e.target.value);
            }}
          />
          {
            prices.map((price, index) => (
              <div key={index} className={styles.priceContainer}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder={`Precio ${formatSellType(price.name)}`}
                  onChange={(e) => {
                    const newPrices = [...prices];
                    newPrices[index].price = parseFloat(e.target.value);
                    setPrices(newPrices);
                  }}
                />
              </div>
            ))
          }
        </form>
        <footer>
          <button
            className={styles.nextButton}
            onClick={() => {
              console.log({
                dishesName: dishesName,
                prices: prices,
              });
              dispatch(createDishesAction({
                dishesName: dishesName,
                prices: prices,
              })), openModal(), onClose();
            }}
          >
            Siguiente
            <img src={arrowRigth} alt="arrow-rigth" />
          </button>
        </footer>
      </section>
    </div>
  );
}
