import { useEffect, useState } from 'react';
import styles from './TransparentSelect.module.css';
import arrow from '../../../assets/header/arrow.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  LOGOUT_USER, logOutUser } from '@/redux/actions/auth';

interface Props {
  logOut: () => void;
 
}

export default function TransparentSelect({
  children,
}: Props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggleStatus, setToggleStatus] = useState(false);
    const { loginUsers } = useSelector((state) => state.auth);

 
  return (
    <div className={styles.containerInput}>
          <div className={styles.categoriesSelect}>
            <div className={styles.customSelect} onClick={()=>{setToggleStatus(!toggleStatus)}}>
              <div className={styles.selectTrigger}>
                <span>{`${loginUsers[0].payload.name} ${loginUsers[0].payload.lastName.split(' ')[0]}`}</span>
                <img src={arrow} alt="" className={styles.arrowSelect} />
              </div>
              <div className={toggleStatus ? styles.options : styles.hidden}>
                <span className={styles.option} onClick={()=> {
                    dispatch(logOutUser());
                    navigate('/login');
                }}>Cerrar session</span>
              </div>
            </div>
          </div>
        </div>
  );
}